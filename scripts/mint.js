require("dotenv").config();

const fs = require('fs');
const BigNumber = require('bignumber.js');
const Web3 = require('web3');
const utils = require('./utils');

HTTP_PROVIDER=process.env.HTTP_PROVIDER
ADDRESS_FAKEJPYC=process.env.ADDRESS_FAKEJPYC
ADDRESS_MYCOIN=process.env.ADDRESS_MYCOIN
OWNER_ADDRESS=process.env.OWNER_ADDRESS
PRIVATE_KEY=process.env.PRIVATE_KEY

var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(HTTP_PROVIDER));

const ERC20ABI = JSON.parse(fs.readFileSync('./scripts/ERC20ABI.json', 'utf8'));
const contractFakeJPYC = new web3.eth.Contract(ERC20ABI.abi, ADDRESS_FAKEJPYC);
const contractMyCoin = new web3.eth.Contract(ERC20ABI.abi, ADDRESS_MYCOIN);

async function mint(contract, contractAddress, amount) {
  const fromAddress = OWNER_ADDRESS;
  
  const openBigValueHex = await utils.ether_to_wei(contract, amount);
  const data = contractMyCoin.methods.mint(fromAddress, openBigValueHex).encodeABI();
  const result = await utils.sendMessage(web3, fromAddress, PRIVATE_KEY, contractAddress, data, 50000);
}

async function balance(contract, contractAddress) {
  const waiBalance = await contract.methods.balanceOf(OWNER_ADDRESS).call();
  const etherBalance = await utils.wei_to_ether(contract, waiBalance);
  return etherBalance;
}

async function main(contract1, address1, amount1, contract2, address2, amount2) {
  await mint(contract1, address1, amount1)
  await mint(contract2, address2, amount2)

  const balance1 = await balance(contract1, address1)
  const symbol1 = await contract1.methods.symbol().call();
  const balance2 = await balance(contract2, address2)
  const symbol2 = await contract2.methods.symbol().call();

  console.log(balance1, symbol1)
  console.log(balance2, symbol2);
}

main(
  contractFakeJPYC, ADDRESS_FAKEJPYC, 100000,
  contractMyCoin, ADDRESS_MYCOIN, 100000
).then(() => {});
