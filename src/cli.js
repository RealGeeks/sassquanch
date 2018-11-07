import program from 'commander';
import { accessSync } from 'fs';
import { join } from 'path';

const fileExists = (filePath) => {
  try {
    accessSync(filePath);
    return true;
  }
  catch (e) {
    return false;
  }
};

/**
 * Accepts an array of error message lines and will print these as an error and
 * terminate this process.
 *
 * @param {String} errMsgs - As many new error message lines as necessary are
 * accepted as parameters. All parameters passed are concatenated together and
 * printed as one error message with newlines.
 */
export const DIE = (...errMsgs) => {
  const err = errMsgs.reduce((finalErr, message) => `${finalErr}\n${message}`);
  console.error(err);
  process.exit(1);
};

const CLI = program
  .version('0.1.0')
  .usage('[options] <output-path>')
  .option(
    '-p, --package-path <path>',
    'Path to your package.json or a json file with your styleDependencies',
  );

/**
 * Parses any input arguments and returns the commander program with the
 * arguments attached.
 *
 * @returns {Object} A commander program.
 */
export const parseOpts = () => {
  CLI.parse(process.argv);

  const packagePath = CLI.packagePath || join(__dirname, 'package.json');
  const packageExists = fileExists(packagePath);

  if (!packageExists) {
    DIE(
      `Could not find a package.json at file path: ${packagePath}`,
      'Please ensure the file path is correct',
    );
  }

  const outputPath = CLI.outputPath || join(__dirname, 'sassquanch.scss');

  if (!outputPath) {
    DIE('Please provide a valid output path');
  }

  return {
    outputPath,
    packagePath,
  };
};
