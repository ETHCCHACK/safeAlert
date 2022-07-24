import { ethers } from "hardhat";

async function main() {
  
let account= await ethers.getSigners();

const Lock = await ethers.getContractFactory("safeAlert",account[0]);

const lock = Lock.attach("0xea086059D5eC0135f670E9E8fC95fb25F7c27a15");
// for(let u=6;u<11;u++){
//     const tx = await account[5].sendTransaction({
//         to: account[u].address,
//         value: ethers.utils.parseEther("1.0")
//     }).then((x:any)=>x.wait());
//     console.log("one transfer done")
// }


// await lock.connect(account[6]).mint("test1")
// console.log()
// await lock.connect(account[7]).mint("testé")
// await lock.connect(account[8]).mint("test4")
// await lock.connect(account[9]).mint("test5")
// await lock.connect(account[10]).mint("test6")
// await lock.connect(account[11]).mint("test")

await lock.connect(account[0]).validate([6,7,8,9,10,11],[0,1,2,0,1,2])
console.log( lock.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
