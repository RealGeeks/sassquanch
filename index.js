import { cli, deps } from './src';

if (process.mainModule) {
  const { outputPath, packagePath } = cli.parseOpts(); // eslint-disable-line

  const packageInfo = deps.readPackage(packagePath);
  const styleDeps = deps.getStyleDependencies(packageInfo);
  const resolvedDeps = deps.resolveStyleDependencies(styleDeps, packagePath);

  console.dir(resolvedDeps, outputPath);
}
else {
  console.log('required as a module');
}
