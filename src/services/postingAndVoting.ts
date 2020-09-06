import {
  getAccountData,
  doCreatingPost,
  votePost,
} from 'services/helpers';
import logger from 'services/logger';

export default async () => {
  logger.log({
    level: 'info',
    message: 'startPostingAndVotingProcess',
  });

  const senderAccountData = await getAccountData();

  if (!senderAccountData) throw new Error('Lack of sender Account Data');

  const {
    voting_power,
  } = senderAccountData;

  if (voting_power < 8000) throw new Error('Below 8000 of voting power');

  const result = await doCreatingPost();

  const {
    permlink,
    author,
  } = result;

  await votePost(author, permlink);

  return true;
};
