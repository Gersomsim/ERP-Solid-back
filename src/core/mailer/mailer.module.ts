import { envs } from '@core/config/envs.config';
import { MailerModule as HandlebarsMailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailerTokenProvider } from './services/mail.token';
import { TemplateRendererService } from './services/template-render.service';

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
  providers: [MailerTokenProvider, TemplateRendererService],
  exports: [MailerTokenProvider],
})
export class MailerModule {}
