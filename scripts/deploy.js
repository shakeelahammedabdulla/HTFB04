// const hre = require("hardhat");

// async function main() {
//   const Upload = await hre.ethers.getContractFactory("Upload");
//   const upload = await Upload.deploy();

//   await upload.deployed();

//   console.log("Library deployed to:", upload.address);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });


/////////////////////////////////////////////////////////////////////////////////////

const { ethers } = require("hardhat");

async function main() {
  try {
    const Upload = await ethers.getContractFactory("Upload");
    const upload = await Upload.deploy();

    console.log("Smart contract deployed successfully!");
    console.log("Library deployed to:", upload.address);
  } catch (error) {
    console.error("Error deploying contract:", error);
    process.exitCode = 1;
  }
}

main();


