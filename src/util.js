import { accessSync } from 'fs';

export const fileExists = (filePath) => {
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
  process.exit(0);
};
