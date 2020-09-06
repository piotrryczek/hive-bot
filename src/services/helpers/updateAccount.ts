// const updateAccount = async (data, newPassword) => {
//   if (!newPassword) return;
//   const client = new Client(['https://api.hive.blog', 'https://api.hivekings.com', 'https://anyx.io', 'https://api.openhive.network']);

//   try {
//     // await client.broadcast.updateAccount(data, PrivateKey.from('test'));
//     console.log('Poprawnie');
//   } catch (error) {
//     console.log(error);
//   }
// }
// // console.log(process.env.RECEIVER_ACCOUNT_KEY);

// if (accountName && accountKey) {
//   const newPassword = 'abc';
//   // const newPassword = 'def';

//   const ownerKey = PrivateKey.fromLogin(accountName, newPassword, 'owner');
//   const owner = {
//     privateKey: ownerKey,
//     publicKey: ownerKey.createPublic(),
//   };

//   const activeKey = PrivateKey.fromLogin(accountName, newPassword, 'active');
//   const active = {
//     privateKey: activeKey,
//     publicKey: activeKey.createPublic(),
//   };

//   const postingKey = PrivateKey.fromLogin(accountName, newPassword, 'posting');
//   const posting = {
//     privateKey: postingKey,
//     publicKey: postingKey.createPublic(),
//   };

//   const memoKey = PrivateKey.fromLogin(accountName, newPassword, 'owner');
//   const memo = {
//     privateKey: memoKey,
//     publicKey: memoKey.createPublic(),
//   };

//   const data = {
//     account: accountName,
//     owner: {
//       weight_threshold: 1,
//       account_auths: [],
//       key_auths: [
//         [owner.publicKey, 1],
//       ],
//     },
//     active: {
//       weight_threshold: 1,
//       account_auths: [],
//       key_auths: [
//         [active.publicKey, 1],
//       ],
//     },
//     posting: {
//       weight_threshold: 1,
//       account_auths: [],
//       key_auths: [
//         [posting.publicKey, 1],
//       ],
//     },
//     memo_key: memo.publicKey,
//     json_metadata: '',
//   };

//   console.log('owner', owner.privateKey.toString());
//   console.log('active', active.privateKey.toString());
//   console.log('posting', posting.privateKey.toString());

//   // updateAccount(data, newPassword);
// }
