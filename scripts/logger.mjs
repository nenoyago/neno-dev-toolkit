import { createConsola } from 'consola';

/**
 * Plain output for CI, non-TTY, or NO_COLOR (https://no-color.org/).
 * Avoids spinners/boxes that look broken in GitLab/GitHub log viewers.
 */
function isPlainReporter() {
  const ci = process.env.CI;
  if (ci === 'true' || ci === '1') {
    return true;
  }
  if (ci && ci !== '0' && ci !== 'false') {
    return true;
  }
  if (Object.hasOwn(process.env, 'NO_COLOR')) {
    return true;
  }
  if (!process.stdout.isTTY) {
    return true;
  }
  return false;
}

const plain = isPlainReporter();

/**
 * Shared Consola instance. Use `.withTag('name')` in each script entrypoint.
 *
 * @see https://github.com/unjs/consola
 */
export const logger = createConsola({
  fancy: !plain,
  formatOptions: {
    colors: !plain,
    date: false
  }
});
