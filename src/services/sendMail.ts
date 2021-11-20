import axios from 'axios';

interface IMailData {
  email: string;
  mailTo: string;
  subject: string;
  variables: {
    [key: string]: number | string;
  };
}

interface ISendMailData {
  templateName: string;
  mailData: IMailData[];
}

const lambda = axios.create({
  baseURL: process.env.REACT_APP_LAMBDA_URL,
});

async function sendMail(data: ISendMailData): Promise<void> {
  await lambda.post('/send_emails', data, {
    headers: {
      'Content-Type': 'application/json',
      secret: process.env.REACT_APP_LAMBDA_SECRET,
    },
  });
}

export { sendMail };
