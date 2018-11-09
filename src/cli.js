import program from 'commander';
import { resolve, dirname } from 'path';
import { fileExists, DIE } from './util';

import * as Package from '../package.json';

export const CLI = program
  .name('sassquanch')
  .version(Package.version)
  .usage('[options] <output-path>')
  .option(
    '-f, --package-file-path <path>',
    'Path to your package.json or a json file with your styleDependencies',
  )
  .option('-m, --modules-path <path>', 'Path to your `node_modules` folder');

/**
 * Parses any input arguments and returns the commander program with the
 * arguments attached.
 *
 * @returns {Object} A commander program.
 */
export const parseOpts = () => {
  CLI.parse(process.argv);

  const packagePath = CLI.packageFilePath ? resolve(CLI.packageFilePath) : resolve('package.json');
  const packageExists = fileExists(packagePath);

  if (!packageExists) {
    DIE(
      `Could not find a package.json at file path: ${packagePath}`,
      'Please ensure the file path is correct',
    );
  }

  const modulesPath = CLI.modulesPath
    ? resolve(CLI.modulesPath, 'node_modules')
    : resolve(dirname(packagePath), 'node_modules');

  const givenOutputPath = CLI.args && CLI.args.length > 0;
  const outputPath = givenOutputPath ? resolve(CLI.args[0]) : resolve('deps.scss');

  if (!outputPath) {
    DIE('Please provide a valid output path');
  }

  return {
    outputPath,
    packagePath,
    modulesPath,
  };
};
