# crowdfunding
The folder `ethereum` contains the smart contracts `Campaign` and `CampaignFactory`

## Project set up
1. `cd kickstart`

2. Download the dependencies: `npm install`

3. Deploy the Factory contract: `node ethereum/deploy.js` and copy the address. 

4. Create a `.env.local` file in the root of the `kickstart` folder. 
    - Add your `PRIVATE_KEY`, `INFURA_URL` and `NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS` in the file:
        ```
        PRIVATE_KEY=your_private_key
        INFURA_URL=your_infura_api_key
        NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS=your_factory_contract_address
        ```
5. Run the front-end application with `npm run dev`

## Smart Contract commands
-  Compile the smart contracts `node ethereum/compile.js`

-  Run the tests on the smart contracts: `npm run test`

