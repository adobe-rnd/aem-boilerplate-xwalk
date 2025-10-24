/**
 * Common utilities for tools and scripts
 */

/**
 * Creates an animated spinner for long-running operations
 * @param {string} message - The message to display with the spinner
 * @returns {Object} - Object with stop method to end the spinner
 */
export const createSpinner = (message) => {
  const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  let frameIndex = 0;

  const spinner = setInterval(() => {
    process.stdout.write(`\r${frames[frameIndex]} ${message}`);
    frameIndex = (frameIndex + 1) % frames.length;
  }, 100);

  return {
    stop: (finalMessage) => {
      clearInterval(spinner);
      process.stdout.write(`\r${finalMessage}\n`);
    },
  };
};

/**
 * Console utilities with colors and emojis
 */
export const logger = {
  success: (message) => console.log(`✅ ${message}`),
  error: (message) => console.error(`❌ ${message}`),
  warning: (message) => console.warn(`⚠️ ${message}`),
  info: (message) => console.log(`ℹ️ ${message}`),
  debug: (message) => console.log(`�� ${message}`),
};
