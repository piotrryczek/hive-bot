import Koa from 'koa';
import Router from '@koa/router';

import logger from 'services/logger';
import { errorHandler } from 'middlewares';

import postingAndVotingJob from 'crons/postingAndVotingJob';
import claimingRewardsJob from 'crons/claimingRewardsJob';

import postingAndVoting from 'services/postingAndVoting';
import claimingRewards from 'services/claimingRewards';

const router = new Router();

router.get('/startAll', async (ctx) => {
  logger.log({
    level: 'info',
    message: '/startAll',
  });

  postingAndVotingJob.start();
  claimingRewardsJob.start();

  ctx.body = {
    status: 'Ok',
  };
});

router.get('/stopAll', async (ctx) => {
  logger.log({
    level: 'info',
    message: '/stopAll',
  });

  postingAndVotingJob.stop();
  claimingRewardsJob.stop();

  ctx.body = {
    status: 'Ok',
  };
});

router.get('/postAndVote', async (ctx) => {
  logger.log({
    level: 'info',
    message: '/postAndVote',
  });

  await postingAndVoting();

  ctx.body = {
    status: 'Ok',
  };
});

router.get('/claimRewards', async (ctx) => {
  logger.log({
    level: 'info',
    message: '/claimRewards',
  });

  await claimingRewards();

  ctx.body = {
    status: 'Ok',
  };
});

router.get('/status', async (ctx) => {
  logger.log({
    level: 'info',
    message: '/status',
  });

  ctx.body = {
    status: {
      postingAndVotingJob: {
        running: postingAndVotingJob.running,
        nextTick: postingAndVotingJob.nextDate(),
      },
      claimingRewardJob: {
        running: claimingRewardsJob.running,
        nextTick: claimingRewardsJob.nextDate(),
      },
    },
  };
});

const app = new Koa();
app.use(errorHandler);
app.use(router.routes());

app.on('error', (error) => {
  console.log(error);
  logger.log({
    level: 'error',
    message: error,
  });
});

export default app;
