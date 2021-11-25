import nodemailer from 'nodemailer';
import { isAuth } from '../../../helpers/api/auth-helper';
import errorHandler from '../../../helpers/api/error-handler';
import {
  contentEmailContact,
  contentEmailSuccessPaidOrder,
  contentPasswordChange,
} from '../../../components/ContentEmails';

const handler = async (req, res) => {
  const idUser = isAuth(req);
  console.log(idUser, ' email api is auth');
  console.log(req.body, ' email req.body');
  const { data, purpose } = req.body;
  try {
    if (req.method === 'POST') {
      let contentEmail;
      let subjectEmail;
      switch (purpose) {
        case 'contact':
          contentEmail = contentEmailContact(data);
          subjectEmail = 'Contact email';
          break;
        case 'forgetPassword':
          contentEmail = contentPasswordChange(data);
          subjectEmail = 'Change password';
          break;
        case 'successOrder':
          contentEmail = contentEmailSuccessPaidOrder(data);
          subjectEmail = 'Transaction confirmation';
          break;
        default:
          contentEmail = contentEmailContact(data);
          break;
      }
      const output = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en-GB">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Demystifying Email Design</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400&family=Roboto:wght@300&display=swap"
          rel="stylesheet"
        />
        <style type="text/css">
            a[x-apple-data-detectors] {color: inherit !important;}
        </style>
    </head>
    <body style="margin: 0; padding: 0;">
       ${contentEmail}
    </body>
    </html>
        `;

      let transporter = nodemailer.createTransport({
        host: process.env.HOST_EMAIL,
        port: process.env.PORT_PROVIDER_EMAIL,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.PASSWORD_USER,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      if (idUser) {
        transporter.sendMail(
          {
            from: `Shoopy shop <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_SENDTO,
            subject: subjectEmail,
            html: output,
          },
          (error, info) => {
            if (error) {
              errorHandler(error, res);
            }

            info.success = 'Email has been sent';
            return res.status(200).json({ msgSuccess: info.success });
          }
        );
      } else {
        transporter.sendMail(
          {
            from: `Shoopy shop <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_SENDTO,
            subject: subjectEmail,
            html: output,
          },
          (error, info) => {
            if (error) {
              errorHandler(error, res);
            }

            info.success = 'Email has been sent';
            return res.status(200).json({ msgSuccess: info.success });
          }
        );
      }
    }
  } catch (error) {
    errorHandler(error, res);
  }
};

export default handler;
