import client from './client';

export default async () => {
  if (!process.env.SENDER_ACCOUNT_NAME) return false;

  const [senderAccountData] = await client.database.getAccounts([process.env.SENDER_ACCOUNT_NAME]);

  return senderAccountData;
};
