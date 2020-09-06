import client from 'services/client';

export default async () => {
  if (!process.env.SENDER_ACCOUNT_NAME) throw new Error('Lack of enviroment variables data');

  const [senderAccountData] = await client.database.getAccounts([process.env.SENDER_ACCOUNT_NAME]);

  return senderAccountData;
};
