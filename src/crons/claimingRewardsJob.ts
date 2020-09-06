import { CronJob } from 'cron';

import logger from 'services/logger';
import claimingRewards from 'services/claimingRewards';
import { claimingRewardsInterval } from 'config';

export default new CronJob(claimingRewardsInterval, () => { // Every day
  logger.log({
    level: 'info',
    message: 'CronJob for: claimingRewardJob',
  });

  claimingRewards();
}, null, true, 'Europe/Warsaw');
