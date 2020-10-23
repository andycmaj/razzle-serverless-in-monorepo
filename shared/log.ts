import chalk from 'chalk';

const logWithTimestamp = (...args: any[]) =>
  console.log(`[${new Date().toISOString()}]`, ...args);

export const debug = (eventName: string, data: any = {}, ...args: any[]) => {
  logWithTimestamp(
    chalk.cyanBright(eventName),
    JSON.stringify(data, null, 2),
    JSON.stringify(args, null, 2)
  );
};

export const info = (eventName: string, data: any = {}) => {
  logWithTimestamp(chalk.cyanBright(eventName), JSON.stringify(data, null, 2));
};

export function warn(eventName: string, error: Error, data?: any): void;
// eslint-disable-next-line @typescript-eslint/ban-types
export function warn(eventName: string, data?: {}): void;
export function warn(
  eventName: string,
  errorOrData: Error | any,
  data: any = null
) {
  logWithTimestamp(
    chalk.yellowBright(eventName),
    errorOrData,
    JSON.stringify(data, null, 2)
  );
}

export function error(eventName: string, error: Error, data?: any): void;
// eslint-disable-next-line @typescript-eslint/ban-types
export function error(eventName: string, data?: {}): void;
export function error(
  eventName: string,
  errorOrData: Error | any,
  data: any = null
) {
  logWithTimestamp(
    chalk.redBright(eventName),
    errorOrData,
    JSON.stringify(data, null, 2)
  );
}
