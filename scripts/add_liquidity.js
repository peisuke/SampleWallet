require("dotenv").config();

const fs = require('fs');
const BigNumber = require('bignumber.js');
const Web3 = require('web3');
const utils = require('./utils');

HTTP_PROVIDER=process.env.HTTP_PROVIDER
ADDRESS_FAKEJPYC=process.env.ADDRESS_FAKEJPYC
ADDRESS_MYCOIN=process.env.ADDRESS_MYCOIN
ADDRESS_AMM=process.env.ADDRESS_AMM
OWNER_ADDRESS=process.env.OWNER_ADDRESS
PRIVATE_KEY=process.env.PRIVATE_KEY

var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(HTTP_PROVIDER));

const ERC20ABI = JSON.parse(fs.readFileSync('./scripts/ERC20ABI.json', 'utf8'));
const AMMABI = JSON.parse(fs.readFileSync('./scripts/AMMABI.json', 'utf8'));

const contractFakeJPYC = new web3.eth.Contract(ERC20ABI.abi, ADDRESS_FAKEJPYC);
const contractMyCoin = new web3.eth.Contract(ERC20ABI.abi, ADDRESS_MYCOIN);
const contractAMM = new web3.eth.Contract(AMMABI.abi, ADDRESS_AMM);

async function approve(contract, contractAddress, AMMAddress, amount) {
  const fromAddress = OWNER_ADDRESS;
  const wei_amount = await utils.ether_to_wei(contract, amount);
  const data = contract.methods.approve(AMMAddress, wei_amount).encodeABI();
  const result = await utils.sendMessage(web3, fromAddress, PRIVATE_KEY, contractAddress, data, 50000);
}

async function allowance(contract, AMMAddress) {
  const waiBalance = await contract.methods.allowance(OWNER_ADDRESS, AMMAddress).call();
  const etherBalance = await utils.wei_to_ether(contract, waiBalance);
  return etherBalance;
}

async function privide(contractAMM, AMMAddress, contract1, amount1, contract2, amount2) {
  const fromAddress = OWNER_ADDRESS;
  const wei_amount1 = await utils.ether_to_wei(contract1, amount1);
  const wei_amount2 = await utils.ether_to_wei(contract2, amount2);

  const data = contractAMM.methods.provide(wei_amount1, wei_amount2, fromAddress).encodeABI();
  const result = await utils.sendMessage(web3, fromAddress, PRIVATE_KEY, AMMAddress, data, 500000);
}

async function main(contractAMM, AMMAddress, contract1, address1, amount1, contract2, address2, amount2) {
  await approve(contract1, address1, AMMAddress, amount1);
  await approve(contract2, address2, AMMAddress, amount2);

  const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

  var allowance1 = await allowance(contract1, AMMAddress);
  var allowance2 = await allowance(contract2, AMMAddress);
  
  while(allowance1 < amount1 || allowance2 < amount2) {
    await sleep(1000);
    allowance1 = await allowance(contract1, AMMAddress);
    allowance2 = await allowance(contract2, AMMAddress);
  }

  await privide(contractAMM, AMMAddress, contract1, amount1, contract2, amount2);
  
  const share = await contractAMM.methods.getShareOf(OWNER_ADDRESS).call();
  console.log(share);
}

main(contractAMM, ADDRESS_AMM,
  contractFakeJPYC, ADDRESS_FAKEJPYC, 10000,
  contractMyCoin, ADDRESS_MYCOIN, 20000).then(() => {
});
