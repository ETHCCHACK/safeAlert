import {PrivyClient} from '@privy-io/privy-node';

const PRIVY_API_KEY = 'lBDJpmLUcACj353vU7y73_aAMc4MulIEhNPxHyoYPM0=';
const PRIVY_API_SECRET = 'cTUCAJagH1vjJFcrNgy7TVpSK0WEPj6aBP-LcCgAb1M=';

const client = new PrivyClient(PRIVY_API_KEY, PRIVY_API_SECRET);
type alertMessage={
signer:string
subject:string,
description:string,
documentlink:string
}
async function createMessage(message:alertMessage):Promise<void>{
  const result = await client.put(message.signer, [
    {field: 'subject', value: message.subject},
    {field:"description",value:message.description},
    {field:"documentlink",value:message.documentlink}
  ]);
}

let msg : alertMessage = {
  signer:'0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B',
  subject:"deprecated code ",
  description:"description",
  documentlink:"link"
}
async function main() {
  await createMessage(msg)
 const getresult = await client.get(msg.signer, 'description');
console.log(getresult!.text())
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});