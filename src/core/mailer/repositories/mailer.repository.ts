export interface IMailerRepository {
  sendMail(
    to: string,
    subject: string,
    data: any,
    template: string,
  ): Promise<void>;
}
