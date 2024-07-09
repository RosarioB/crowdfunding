# crowdfunding
This application is a crowdfunding platform akin to [Kickstarter](https://www.kickstarter.com/?lang=en), featuring a frontend developed with React.js and Next.js, and a backend consisting of Solidity smart contracts deployed on the Ethereum blockchain. 

The platform allows a manager to initiate a new crowdfunding campaign to which anyone can contribute. Within a campaign, the manager may propose requests for funds, which the campaign’s contributors can then approve. Once a spending request receives approval from the majority of contributors, it can be finalized, enabling the funds to be disbursed to the designated recipient.

![alt text](https://github.com/RosarioB/crowdfunding/blob/main/github_images/root.png?raw=true)

![alt text](https://github.com/RosarioB/crowdfunding/blob/main/github_images/create_campaign.png?raw=true)

![alt text](https://github.com/RosarioB/crowdfunding/blob/main/github_images/campaign_show.png?raw=true)

![alt text](https://github.com/RosarioB/crowdfunding/blob/main/github_images/view_request.png?raw=true)

![alt text](https://github.com/RosarioB/crowdfunding/blob/main/github_images/add_request.png?raw=true)

- The folder `ethereum` contains the smart contracts `Campaign` and `CampaignFactory`
- The folders `components` and `pages` contain the front-end code.

## Project set up
1. `cd kickstart`

2. Download the dependencies: `npm install`

3. Compile the smart contracts `node ethereum/compile.js`

4. Deploy the Factory contract: `node ethereum/deploy.js` and copy the address. 

5. Create a `.env.local` file in the root of the `kickstart` with:

        ```
        PRIVATE_KEY=your_private_key
        INFURA_URL=your_infura_api_key
        NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS=your_factory_contract_address
        ```
6. Run the front-end application with `npm run dev`

## Smart Contract commands

-  Run the tests on the smart contracts: `npm run test`

