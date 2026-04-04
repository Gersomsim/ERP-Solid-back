import { Provider } from '@nestjs/common';
import { MailService } from './mail.service';

export const MailToken = 'MAIL_SERVICE';

export const MailerTokenProvider: Provider = {
  provide: MailToken,
  useClass: MailService,
};
