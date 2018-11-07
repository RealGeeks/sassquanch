import { cli, deps } from './src';

if (process.mainModule) {
  const opts = cli.parseOpts(); // eslint-disable-line

  const packageInfo = deps.readPackage(opts);
  const styleDeps = deps.getStyleDependencies(packageInfo);
  const resolvedDeps = deps.resolveStyleDependencies(styleDeps, opts);

  deps.loadDependencies(resolvedDeps).then(data => deps.stitchDependencies(data, opts));
}
else {
  console.log('required as a module');
}
