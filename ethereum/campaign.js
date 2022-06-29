import web3 from "./web3";
import Campaign from './build/Campaign.json';

export default address => {
    return new web3.eth.Contract(JSON.parse(Campaign.interface),address);
};
// const instance=new web3.eth.Contract(
//     JSON.parse(Campaign.interface),
//     '0xEb872D2553B6B0AD4EFB384839405c4d873d7CE5'
// );

// export default instance;
