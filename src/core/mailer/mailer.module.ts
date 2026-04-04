import { envs } from '@core/config/envs.config';
import { MailerModule as HandlebarsMailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    HandlebarsMailerModule.forRoot({
      transport: {
        host: envs.mail.host,
        port: envs.mail.port,

        auth: {
          user: envs.mail.user,
          pass: envs.mail.password,
        },
      },
      defaults: {
        from: `"${envs.app.name}" <${envs.mail.from}>`,
      },
    }),
  ],
})
export class MailerModule {}
