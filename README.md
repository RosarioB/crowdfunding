# crowdfunding
The folder `ethereum` contains the smart contracts `Campaign` and `CampaignFactory`

1. `cd kickstart`

2. Download the dependencies: `npm install`

3. Create a `.env` file in the root of the `kickstart` folder. 
    - Add your `PRIVATE_KEY` and `INFURA_URL` to the `.env` file
        ```
        PRIVATE_KEY=your_private_key
        INFURA_URL=https://infura.io/v3/your_infura_project_id
        ```

4. Compile the smart contracts `node ethereum/compile.js`

5. Run the tests on the smart contracts: `npm run test`

6. Deploy the contract: `node ethereum/deploy.js`