/* eslint-disable import/first */
import dotenv from 'dotenv';

dotenv.config();

import app from 'app';
import logger from 'services/logger';

app.listen(5000, () => {
  logger.log({
    level: 'info',
    message: 'App started',
  });
});
