import getAccountData from './getAccountData';

export default async () => {
  const senderAccountData = await getAccountData();

  console.log(senderAccountData);
};
