import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import handlebars from "handlebars";
import { EmailTemplate } from "@/components/templates/EmailTemplate";

export async function POST(request: NextRequest) {
  try {
    const response = await request.json();
    console.log("Response", response);
    const { emailToSend, userName, emailFrom, fileName, fileSize, shortUrl } =
      response;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: emailFrom,
      to: emailToSend,
      subject: `${userName} Share file with You`,
      html: compileWelcomeTemplate(
        userName,
        emailFrom,
        fileName,
        fileSize,
        shortUrl
      ),
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email Sent Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}

export function compileWelcomeTemplate(
  userName: string,
  emailFrom: string,
  fileName: string,
  fileSize: number,
  shortUrl: string
) {
  const template = handlebars.compile(EmailTemplate);
  const htmlBody = template({
    SenderName: userName,
    EmailFrom: emailFrom,
    Filename: fileName,
    Filesize: fileSize,
    Url: shortUrl,
  });
  return htmlBody;
}
