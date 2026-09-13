import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { transporter } from 'src/common/nodemailer/init.nodemailer';
import nodemailer from 'nodemailer';
import { SMTP_USER } from 'src/common/constants/app.constants';

@Injectable()
export class EmailService {
  async create(createEmailDto: CreateEmailDto) {
    try {
      console.log(createEmailDto);
      const email = createEmailDto.Users.email;
      const fullName = createEmailDto.Users.fullName;
      const foodName = createEmailDto.Foods.name;

      const info = await transporter.sendMail({
        from: SMTP_USER, // sender address
        to: SMTP_USER, // list of recipients, lưu ý: thay đổi thành email người nhận thực tế khi triển khai
        subject: 'Notification Orders', // subject line
        text: `Hello ${fullName}, your order for ${foodName} has been received.`, // plain text body
        html: `
  <div style="
    font-family: Arial, Helvetica, sans-serif;
    max-width: 600px;
    margin: 0 auto;
    padding: 24px;
    background-color: #f5f5f5;
  ">
    <div style="
      background-color: #ffffff;
      padding: 32px;
      border-radius: 8px;
    ">
      <h2 style="
        margin: 0 0 20px;
        color: #333333;
      ">
        Order Notification
      </h2>

      <p style="
        font-size: 16px;
        color: #555555;
        line-height: 1.6;
      ">
        Hello <strong>${fullName}</strong>,
      </p>

      <p style="
        font-size: 16px;
        color: #555555;
        line-height: 1.6;
      ">
        Your order for
        <strong>${foodName}</strong>
        has been received successfully.
      </p>

      <div style="
        margin: 24px 0;
        padding: 16px;
        background-color: #f8f8f8;
        border-radius: 6px;
      ">
        <p style="
          margin: 0;
          font-size: 14px;
          color: #777777;
        ">
          Order item
        </p>

        <p style="
          margin: 8px 0 0;
          font-size: 18px;
          font-weight: bold;
          color: #333333;
        ">
          ${foodName}
        </p>
      </div>

      <p style="
        font-size: 16px;
        color: #555555;
        line-height: 1.6;
      ">
        Thank you for your order.
      </p>

      <hr style="
        border: none;
        border-top: 1px solid #eeeeee;
        margin: 30px 0;
      ">

      <p style="
        font-size: 12px;
        color: #999999;
        text-align: center;
      ">
        This is an automated email. Please do not reply to this message.
      </p>
    </div>
  </div>
`,
      });

      console.log('Message sent: %s', info.messageId);
      // Preview URL is only available when using an Ethereal test account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (err) {
      console.error('Error while sending mail:', err);
    }
  }

  findAll() {
    return `This action returns all email`;
  }

  findOne(id: number) {
    return `This action returns a #${id} email`;
  }

  update(id: number, updateEmailDto: UpdateEmailDto) {
    return `This action updates a #${id} email`;
  }

  remove(id: number) {
    return `This action removes a #${id} email`;
  }
}
