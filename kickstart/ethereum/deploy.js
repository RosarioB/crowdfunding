require('dotenv').config({ path: '.env.local'});
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const { abi, evm } = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  process.env.PRIVATE_KEY,
  process.env.INFURA_URL
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);
  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ gas: '10000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
