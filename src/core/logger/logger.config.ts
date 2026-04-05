import { envs } from '@core/config/envs.config';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';

const isProduction = envs.app.env === 'production';

export const loggerConfig = {
  level: isProduction ? 'warn' : 'debug',
  transports: [
    new winston.transports.Console({
      format: isProduction
        ? winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          )
        : winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('ERP_SOLID_API', {
              prettyPrint: true,
            }),
          ),
    }),
  ],
};
