import {
  PrivateKey,
  Asset,
} from '@hiveio/dhive';

import client from './client';
import getAccountData from './getAccountData';
import logger from './logger';

export default async () => {
  if (!process.env.SENDER_ACCOUNT_KEY || !process.env.SENDER_ACCOUNT_NAME) throw new Error('Lack of enviroment variables data');

  const senderAccountData = await getAccountData();

  if (!senderAccountData) throw new Error('Lack of sender account data');

  const {
    reward_sbd_balance,
    reward_steem_balance,
    reward_vesting_balance,
    reward_vesting_steem,
  } = senderAccountData;

  if (
    !reward_sbd_balance
    || !reward_steem_balance
    || !reward_vesting_balance
    || !reward_vesting_steem
  ) throw new Error('Lack of reward info in response');

  if (
    !parseFloat(reward_sbd_balance.toString())
    && !parseFloat(reward_steem_balance.toString())
    && !parseFloat(reward_vesting_balance.toString())
    && !parseFloat(reward_vesting_steem.toString())
  ) throw new Error('None of rewards is above 0');

  const operation = [
    'claim_reward_balance',
    {
      account: process.env.SENDER_ACCOUNT_NAME,
      reward_steem: Asset.from(reward_steem_balance),
      reward_sbd: Asset.from(reward_sbd_balance),
      reward_vests: Asset.from(reward_vesting_balance),
    },
  ];

  // @ts-ignore
  await client.broadcast.sendOperations([operation], PrivateKey.from(process.env.SENDER_ACCOUNT_KEY));

  console.log(`Success: Claim Reward: ${reward_vesting_balance}`);

  logger.log({
    level: 'info',
    message: `Claim reward: ${reward_vesting_balance}`,
  });

  return true;
};
