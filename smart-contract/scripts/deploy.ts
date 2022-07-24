import { ethers } from "hardhat";

async function main() {
  
let account= await ethers.getSigners();

let provider =  new ethers.providers.AlchemyProvider("maticmum","6UhsPRKR79e4fSzMo590glSbly-BYewd")
console.log(account[1].address,await account[0].getBalance())
const Lock = await ethers.getContractFactory("safeAlert",account[0]);

const lock = await Lock.deploy();





await lock.deployed();
await lock.connect(account[1]).mint("test1",account[6].address)
await lock.connect(account[2]).mint("testé",account[6].address)
await lock.connect(account[3]).mint("test4",account[6].address)
await lock.connect(account[4]).mint("test5",account[6].address)
await lock.connect(account[5]).mint("test6",account[6].address)


await lock.connect(account[0]).validateBatch([2,3,7],[0,1,2])
console.log( lock.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
