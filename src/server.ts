import dotenv from 'dotenv';
import { CronJob } from 'cron';

import createPost from './createPost';
import votePost from './votePost';
import getAccountData from './getAccountData';
import claimRewards from './claimRewards';

import logger from './logger';

logger.log({
  level: 'info',
  message: 'Bot started',
});

dotenv.config();

const postingAndVotingInterval = '0 0 * * * *'; // Every hour
const claimingRewardInterval = '0 0 0 * * *'; // Every Day

const doCreatingPost = async () => {
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
    {
      name: process.env.SENDER_ACCOUNT_NAME,
      key: process.env.SENDER_ACCOUNT_KEY,
    },
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

const startPostingAndVotingProcess = async () => {
  logger.log({
    level: 'info',
    message: 'startPostingAndVotingProcess',
  });

  try {
    const senderAccountData = await getAccountData();

    if (!senderAccountData) throw new Error('Lack of sender Account Data');

    const {
      voting_power,
    } = senderAccountData;

    if (voting_power < 8000) return false;

    const result = await doCreatingPost();

    const {
      permlink,
      author,
    } = result;

    await votePost(author, permlink);
  } catch (error) {
    console.log(error);
    logger.log({
      level: 'error',
      message: error,
    });
  }

  return true;
};

const startClaimingRewardProcess = async () => {
  logger.log({
    level: 'info',
    message: 'startClaimingRewardProcess',
  });

  try {
    await claimRewards();
  } catch (error) {
    console.log(error);
    logger.log({
      level: 'error',
      message: error,
    });
  }

  return true;
};

const postingAndVotingJob = new CronJob(postingAndVotingInterval, () => { // Every hour
  startPostingAndVotingProcess();
}, null, true, 'Europe/Warsaw');

const claimingRewardJob = new CronJob(claimingRewardInterval, () => { // Every day
  startClaimingRewardProcess();
}, null, true, 'Europe/Warsaw');

postingAndVotingJob.start();
claimingRewardJob.start();
