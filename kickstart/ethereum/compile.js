const path = require("path");
const solc = require("solc");
const fs = require("fs-extra"); // improved version of the fs module

const buildPath = path.resolve(__dirname, "build"); // buildPath is a reference to the build directory, __dirname is the current directory (ethereum)
fs.removeSync(buildPath); // removes the folder build and everything in it

const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol"); // path to the Campaign.sol file
const source = fs.readFileSync(campaignPath, "utf8"); // reads the file Campaign.sol
const output = solc.compile(source, 1).contracts; // output contains two objects: the output from compiling both the Campaign and the CampaignFactory contracts

fs.ensureDirSync(buildPath); // we are creating the build folder

for (let contract in output) {
  // output contains the Campaign and the CampaignFactory contracts
  const contractName = contract.replace(":", ""); // Remove the colon because it causes issues in WIndows
  fs.outputJsonSync(
    // outputJsonSync creates a json file
    path.resolve(buildPath, contractName + ".json"), // path of the JSON
    output[contract] // content of the JSON
  );
}
