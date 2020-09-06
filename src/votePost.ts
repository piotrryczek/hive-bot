import { PrivateKey } from '@hiveio/dhive';

import client from './client';
import logger from './logger';

export default async (author, permlink) => {
  if (!process.env.SENDER_ACCOUNT_NAME || !process.env.SENDER_ACCOUNT_KEY || !author) throw new Error('Lack of data for voting');

  console.log(`Try: Vote: ${author}: ${permlink}`);

  await client.broadcast.vote({
    voter: process.env.SENDER_ACCOUNT_NAME,
    author,
    permlink,
    weight: 10000,
  }, PrivateKey.from(process.env.SENDER_ACCOUNT_KEY));

  console.log(`Success: Vote: ${author}: ${permlink}`);

  logger.log({
    level: 'info',
    message: `Vote: ${author}: ${permlink}`,
  });

  return true;
};
