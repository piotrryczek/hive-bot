import { CronJob } from 'cron';

import logger from 'services/logger';
import postingAndVoting from 'services/postingAndVoting';
import { postingAndVotingInterval } from 'config';

export default new CronJob(postingAndVotingInterval, () => { // Every hour
  logger.log({
    level: 'info',
    message: 'CronJob for: postingAndVotingJob',
  });

  postingAndVoting();
}, null, true, 'Europe/Warsaw');
