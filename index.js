import { cli, deps } from './src';

if (process.mainModule) {
  const { outputPath, packagePath } = cli.parseOpts(); // eslint-disable-line

  const packageInfo = deps.readPackage(packagePath);
  const styleDeps = deps.getStyleDependencies(packageInfo);
  const resolvedDeps = deps.resolveStyleDependencies(styleDeps, packagePath);

  deps.loadDependencies(resolvedDeps).then(data => console.dir(data));
}
else {
  console.log('required as a module');
}
