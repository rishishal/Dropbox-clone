export type FileType = {
  id: string;
  filename: string;
  fullName: string;
  timestamp: Date;
  downloadURL: string;
  type: string;
  size: number;
  shortUrl: string;
  userEmail: string;
};

export type SendEmailProps = {
  emailToSend: string | undefined;
  emailFrom: string | undefined;
  userName: string | undefined;
  fileName: string | undefined;
  fileSize: number | undefined;
  fileType: string | undefined;
  shortUrl: string | undefined;
};
