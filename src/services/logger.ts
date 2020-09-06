import { createLogger, format, transports } from 'winston';

export default createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.printf(({ timestamp, message }) => `${timestamp}: ${message}`),
  ),
  transports: [
    new transports.File({
      filename: `${process.cwd()}/error.log`,
      level: 'error',
    }),
    new transports.File({
      filename: `${process.cwd()}/info.log`,
      level: 'info',
    }),
  ],
});
