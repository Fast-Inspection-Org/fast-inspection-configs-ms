import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AppService {
  constructor(private readonly mailService: MailerService) {}

  getHello(): string {
    return 'Hello World!';
  }

  sendMail() {
    const message = `Forgot your password? If you didn't forget your password, please ignore this email!`;

    this.mailService.sendMail({
      from: 'Dario Gonzalez <oirald666@gmail.com>',
      to: 'oirald666@gmail.com',
      subject: `How to Send Emails with Nodemailer`,
      text: message,
      html: "<b>Forgot your password? If you didn't forget your password, please ignore this email!</b>"
    });
  }

}
