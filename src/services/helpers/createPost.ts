import { PrivateKey } from '@hiveio/dhive';
import { v4 as uuidv4 } from 'uuid';

import client from 'services/client';
import logger from 'services/logger';

export default async (authorName, authorKey) => {
  const tags = ['trash'];
  const permlink = uuidv4();

  console.log(`Try: Comment: ${authorName} : ${permlink}`);

  await client.broadcast.comment({
    parent_author: '',
    parent_permlink: tags[0],
    author: authorName,
    permlink,
    title: 'Trash post',
    body: 'Trash content',
    json_metadata: '',
  }, PrivateKey.from(authorKey));

  console.log(`Success: Comment: ${authorName} : ${permlink}`);

  logger.log({
    level: 'info',
    message: `Comment: ${authorName}: ${permlink}`,
  });

  return permlink;
};
