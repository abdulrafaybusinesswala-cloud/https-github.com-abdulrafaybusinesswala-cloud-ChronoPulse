/**
 * Formats a time in milliseconds to a string format of MM:SS.ms
 * @param timeInMs Time in milliseconds
 * @returns Formatted string
 */
export const formatTime = (timeInMs: number): string => {
  const minutes = Math.floor(timeInMs / 60000);
  const seconds = Math.floor((timeInMs % 60000) / 1000);
  const milliseconds = Math.floor((timeInMs % 1000) / 10); // Displaying 2 digits for ms

  const pad = (num: number) => num.toString().padStart(2, '0');

  return `${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
};

/**
 * Splits milliseconds into separate components for custom styling
 */
export const getTimeComponents = (timeInMs: number) => {
  const minutes = Math.floor(timeInMs / 60000);
  const seconds = Math.floor((timeInMs % 60000) / 1000);
  const milliseconds = Math.floor((timeInMs % 1000) / 10);

  const pad = (num: number) => num.toString().padStart(2, '0');

  return {
    minutes: pad(minutes),
    seconds: pad(seconds),
    milliseconds: pad(milliseconds)
  };
};