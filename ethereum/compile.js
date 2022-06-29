const path = require("path");
const fs = require("fs-extra");//community made fs system  used here instead of local computer "fs" module
const solc = require("solc");


const buildPath=path.resolve(__dirname,'build');
fs.removeSync(buildPath);// improves extra function, able to remove all file in single cmd.


const campaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignPath, "utf8");

const output=solc.compile(source,1).contracts;
//output contains two separate objects campaign  complied code and campaign factory complied code 


fs.ensureDirSync(buildPath);// ensure the folder is there and if not , will create one for us .
// console.log( output);
for(let contract in output){
    fs.outputJSONSync(
        path.resolve(buildPath,contract.replace(':',"")+'.json'),
        output[contract]
    );
}
