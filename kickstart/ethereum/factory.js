import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    '0x233e180e515B892A4124aADcd9831c50F2313d73'
); 

export default instance;