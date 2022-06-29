import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance=new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xEb872D2553B6B0AD4EFB384839405c4d873d7CE5'
);

export default instance;
