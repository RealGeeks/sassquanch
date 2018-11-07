import program from 'commander';
import { resolve, dirname } from 'path';
import { fileExists, DIE } from './util';

export const CLI = program
  .name('sassquanch')
  .version('0.0.3')
  .usage('[options] <output-path>')
  .option(
    '-p, --package-path <path>',
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

  const packagePath = CLI.packagePath ? resolve(CLI.packagePath) : resolve('package.json');
  const packageExists = fileExists(packagePath);

  if (!packageExists) {
    DIE(
      `Could not find a package.json at file path: ${packagePath}`,
      'Please ensure the file path is correct',
    );
  }

  const modulesPath = CLI.modulesPath ? resolve(CLI.modulesPath) : dirname(packagePath);

  const givenOutputPath = CLI.args && CLI.args.length > 1;
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
