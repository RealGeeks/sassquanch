import { parseOpts } from './src';

if (process.mainModule) {
  const { outputPath, packagePath } = parseOpts();
  console.log(`${outputPath}, ${packagePath}`);
}
else {
  console.log('required as a module');
}
