const assert = require("assert");
const ganache = require("ganache");
const { Web3 } = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/CampaignFactory.json"); // importing the compiled JSON file of the contract CampaignFactory
const compiledCampaign = require("../ethereum/build/Campaign.json");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  
  factory = await new web3.eth.Contract(compiledFactory.abi) // We are deploying a new contract CampaignFactory
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: "2000000" });
  
  await factory.methods.createCampaign("100").send({
    // We are creating a new contract Campaign by calling the method createCampaign on the CampaignFactory contract.
    // we set 100 wei as the minimun contribution when we call createCampaign
    // we use send instead of call because we are sending a transaction since we are modifying the data.
    from: accounts[0],
    gas: "2000000",
  });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call(); // In this case we are not changing any data so we are using call. In fact we are calling a function and not sending a transaction.
  // [campaignAddress] is destructuring an array. We are passing to the variabile campaignAddress the first element of the array returned by await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract( // we are retrieving the Campaign contract deployed at the address campaignAddress
    compiledCampaign.abi,
    campaignAddress
  );
});

describe("Campaigns", () => {
  it("deploys a factory and a campaign", () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it("marks caller as the campaign manager", async () => {
    const manager = await campaign.methods.manager().call(); // we are calling the autocreated getter for the public variable manager. Since we are not modifying any data we invoke call instead of send.
    assert.equal(accounts[0], manager);
  });

  it("allows people to contribute money and marks them as approvers", async () => {
    await campaign.methods.contribute().send({
      value: "200", // amount of wei we are donating. It is greater than the minimum which is 100
      from: accounts[1],
    });
    const isContributor = campaign.methods.approvers(accounts[1]).call();
    assert.ok(isContributor);
  });

  it("requires a minimum contribution", async () => {
    try {
      await campaign.methods.contribute().send({
        value: "5",
        from: accounts[1],
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });
  
  it("allows a manager to make a payment request", async () => {
    await campaign.methods
      .createRequest("Buy batteries", '100', accounts[1])
      .send({
        from: accounts[0],
        gas: "1000000",
      }); // we are modifying the data in the contract so we need to invoke send
    /* This code is correct but it gives problem on Ganache 
    let request = await campaign.methods.getRequest(0).call(); // we are not modifying any data in the contract so we can invoke call
    assert.equal("Buy batteries", request);
    */
  });

  // This is an end to end test. We are testing everything that our campaign does from start to finish
  it("processes requests", async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei("10", "ether"),
    });

    await campaign.methods
      .createRequest("A", web3.utils.toWei("5", "ether"), accounts[1])
      .send({ from: accounts[0], gas: "1000000" });

    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    await campaign.methods
      .finalizeRequest(0)
      .send({ from: accounts[0], gas: "1000000" });

    let balance = await web3.eth.getBalance(accounts[1]); // at this time balance is a string in wei
    balance = web3.utils.fromWei(balance, "ether"); // converting wei into ether
    balance = parseFloat(balance); // converting string into a decimal

    assert(balance > 104); // the balance of each account is not resetted when passing from one test to the following one.
    // We cannot say balance === 105, as we would expect, because in one of the earlier test we paid the fees for a transaction.
  });
});
