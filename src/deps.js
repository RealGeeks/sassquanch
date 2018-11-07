import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { DIE, fileExists } from './util';

const readFile = promisify(fs.readFile);

export const readPackage = filePath => JSON.parse(fs.readFileSync(filePath));
export const getStyleDependencies = (packageInfo) => {
  if (!packageInfo.styleDependencies) {
    return DIE(
      'No style dependencies found in your package.json file',
      'Please add a section to your package.json file titled `styleDependencies`',
    );
  }

  return packageInfo.styleDependencies;
};

const createDependencyResolver = nodeModulesDir => (dep) => {
  // attempt to resolve the path
  const resolvedPath = path.resolve(nodeModulesDir, dep.package, ...dep.path.split('/'));

  // confirm the dependency exists
  const depExists = fileExists(resolvedPath);

  if (!depExists) {
    DIE(
      `Could not resolve dependency in package ${dep.package}`,
      `Expected to find the dependency at path ${resolvedPath}`,
      'Please ensure that the dependency exists',
    );
  }

  return {
    ...dep,
    path: resolvedPath,
  };
};

export const resolveStyleDependencies = (styleDeps, packageFilePath) => {
  const nodeModulesDir = path.join(path.dirname(packageFilePath), 'node_modules');
  const resolveDependencyPath = createDependencyResolver(nodeModulesDir);

  // For each dep, we will resolve the listed style path
  return styleDeps.reduce(
    (resultDeps, currDep) => [...resultDeps, resolveDependencyPath(currDep)],
    [],
  );
};

export const loadDependencies = async resolvedDeps => Promise.all(resolvedDeps.map(dep => readFile(dep.path, { encoding: 'utf-8' })));
