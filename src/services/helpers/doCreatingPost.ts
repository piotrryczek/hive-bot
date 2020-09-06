import logger from 'services/logger';
import createPost from './createPost';

export default async () => {
  if (
    !process.env.RECEIVER_ACCOUNT_NAME
    || !process.env.RECEIVER_ACCOUNT_KEY
    || !process.env.RECEIVER_SECOND_ACCOUNT_NAME
    || !process.env.RECEIVER_SECOND_ACCOUNT_KEY
    || !process.env.SENDER_ACCOUNT_NAME
    || !process.env.SENDER_ACCOUNT_KEY
  ) throw new Error('Lack of enviromental variables data');

  const accountsToTry = [
    {
      name: process.env.RECEIVER_ACCOUNT_NAME,
      key: process.env.RECEIVER_ACCOUNT_KEY,
    },
    {
      name: process.env.RECEIVER_SECOND_ACCOUNT_NAME,
      key: process.env.RECEIVER_SECOND_ACCOUNT_KEY,
    },
    // {
    //   name: process.env.SENDER_ACCOUNT_NAME,
    //   key: process.env.SENDER_ACCOUNT_KEY,
    // },
  ];

  for await (const account of accountsToTry) {
    try {
      const permlink = await createPost(account.name, account.key);

      return {
        permlink,
        author: account.name,
      };
    } catch (error) {
      logger.log({
        level: 'error',
        message: error,
      });
    }
  }

  throw new Error('Unsuccessful creating post');
};
