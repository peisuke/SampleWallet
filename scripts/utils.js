const Tx = require('ethereumjs-tx').Transaction
const BigNumber = require('bignumber.js');

async function ether_to_wei(contract, amount) {
  const decimals = await contract.methods.decimals().call();
  const openBigValue = BigNumber(amount).times(BigNumber(10).pow(decimals));
  const openBigValueHex = "0x" + openBigValue.toString(16);
  return openBigValueHex
}

async function wei_to_ether(contract, amount) {
  const decimals = await contract.methods.decimals().call();
  const etherBalance = BigNumber(amount.toString()).div(BigNumber(10).pow(decimals)).toString(10);
  return etherBalance;
}

async function sendMessage(web3, fromAddress, privateKey, toAddress, data, additinalGas) {
  const gas = await web3.eth.estimateGas({from: fromAddress});
  const gasPrice = await web3.eth.getGasPrice();
  const rawTransaction = {
      "from": fromAddress,
      "to": toAddress,
      "value": "0x00",
      "gasPrice": web3.utils.toHex(gasPrice),
      "gas": web3.utils.toHex(gas + additinalGas),
      "data": data
    };
  const signedTx = await web3.eth.accounts.signTransaction(rawTransaction, privateKey);
  const result = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  return result;
}

exports.ether_to_wei = ether_to_wei;
exports.wei_to_ether = wei_to_ether;
exports.sendMessage = sendMessage;
