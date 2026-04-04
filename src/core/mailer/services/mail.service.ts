import { envs } from '@core/config/envs.config';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TemplateRendererService } from './template-render.service';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly templateRenderService: TemplateRendererService,
  ) {
    this.templateRenderService.clearCache();
  }
  private data() {
    return {
      url: envs.app.url,
      logo: 'https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7056/illustration_png-03.png',
      emailContact: envs.mail.from,
    };
  }

  async sendMail(
    to: string,
    subject: string,
    data: any,
    template: string,
  ): Promise<void> {
    const context = {
      info: this.data(),
      data,
    };
    const html = await this.templateRenderService.renderTemplate(
      template,
      context,
    );

    try {
      await this.mailerService.sendMail({
        to,
        subject,
        text: html,
        html,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to send email');
    }
  }
}
