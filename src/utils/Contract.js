import { ADDRESS_FAKEJPYC } from "@env"
import { ADDRESS_MYCOIN } from "@env"
import { ADDRESS_AMM } from "@env"
import { BigNumber } from "bignumber.js";

import web3 from "./Web3";
import ERC20ABI from "./ERC20ABI";
import AMMABI from "./AMMABI";

export const consractAddressFakeJPYC = ADDRESS_FAKEJPYC;
export const consractAddressMyCoin = ADDRESS_MYCOIN;
export const consractAddressAMM = ADDRESS_AMM;

export const contractFakeJPYC = new web3.eth.Contract(ERC20ABI, consractAddressFakeJPYC);
export const contractMyCoin = new web3.eth.Contract(ERC20ABI, consractAddressMyCoin);
export const contractAMM = new web3.eth.Contract(AMMABI, consractAddressAMM);

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

async function sendMessage(fromAddress, privateKey, toAddress, data) {
  const count = await web3.eth.getTransactionCount(fromAddress);
  const gas = await web3.eth.estimateGas({from: fromAddress});
  const gasPrice = await web3.eth.getGasPrice();
  const rawTransaction = {
      "from": fromAddress,
      "to": toAddress,
      "value": "0x00",
      "gasPrice": web3.utils.toHex(gasPrice),
      "gas": web3.utils.toHex(gas + 50000),
      "nonce": "0x" + count.toString(16),
      "data": data
    };
  const signedTx = await web3.eth.accounts.signTransaction(rawTransaction, privateKey);
  const result = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  return result;
}

async function approve(fromAddress, privateKey, tokenContract, tokenAddress, value) {
  const data = tokenContract.methods.approve(consractAddressAMM, value).encodeABI();
  const result = await sendMessage(fromAddress, privateKey, tokenAddress, data);
  console.log(result);
}

async function swap(fromAddress, privateKey, address1, address2, value1) {
  const data = contractAMM.methods.swap(address1, address2, value1, fromAddress).encodeABI();
  const result = await sendMessage(fromAddress, privateKey, consractAddressAMM, data);
  console.log(result);
}

export async function mintToken(fromAddress, privateKey, amount) {
  const openBigValueHex = await ether_to_wei(contractMyCoin, amount);

  const data = contractMyCoin.methods.mint(fromAddress, openBigValueHex).encodeABI();
  const result = await sendMessage(fromAddress, privateKey, consractAddressMyCoin, data);
  console.log(result);
}

export async function transferEther(fromAddress, privateKey, amount, toAddress) {
  let gasPrice = await web3.eth.getGasPrice();
  let gasLimit = 3000000;
  let newAmount = 1000000000000000000 * Number(amount)

  let count = await web3.eth.getTransactionCount(fromAddress);

  let rawTransaction = {
      "from": fromAddress,
      "to": toAddress,
      "value": web3.utils.toHex(newAmount),
      "gasPrice": web3.utils.toHex(gasPrice),
      "gasLimit": web3.utils.toHex(gasLimit),
      "nonce": "0x" + count.toString(16)
    };
 
  const signedTx = await web3.eth.accounts.signTransaction(rawTransaction, privateKey);
  
  // Send signed transaction to Ethereum blockchain
  let result = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log(result);
}

export async function transferERC20(token, fromAddress, privateKey, amount, toAddress) {
  if (token === "JPYC") {
    const openBigValueHex = await ether_to_wei(contractFakeJPYC, amount)
    let data = contractFakeJPYC.methods.transfer(toAddress, openBigValueHex).encodeABI();
    await sendMessage(fromAddress, privateKey, consractAddressFakeJPYC, data);
  } else {
    throw 'token must be JPYC';
  }
}

export async function ComputeAmount(token1, token2, amount1) {
  var contract1, address1;
  var contract2, address2;
  
  if (amount1 <= 0) {
    throw 'amount1 must be more zero.';
  }
  const symbol = await contractMyCoin.methods.symbol().call();

  if (token1 == 'JPYC' && token2 == symbol) {
    contract1 = contractFakeJPYC;
    address1 = consractAddressFakeJPYC;

    contract2 = contractMyCoin;
    address2 = consractAddressMyCoin;
  } else if (token1 == symbol && token2 == 'JPYC') {
    contract1 = contractMyCoin;
    address1 = consractAddressMyCoin;

    contract2 = contractFakeJPYC;
    address2 = consractAddressFakeJPYC;
  } else {
    throw 'both tokens must be different.';
  }

  const amountWei1 = await ether_to_wei(contract1, amount1);
  const amountWei2 = await contractAMM.methods.getAmountOut(amountWei1, address1, address2).call();
  const amount2 = await wei_to_ether(contract2, amountWei2);

  return amount2
}

export async function ApproveToken(fromAddress, privateKey, token1, amount1) {
  var contract1, address1;
  var contract2, address2;
  
  if (amount1 <= 0) {
    throw 'amount1 must be more zero.';
  }
  const symbol = await contractMyCoin.methods.symbol().call();
 
  if (token1 == 'JPYC') {
    contract1 = contractFakeJPYC;
    address1 = consractAddressFakeJPYC;
  } else if (token1 == symbol) {
    contract1 = contractMyCoin;
    address1 = consractAddressMyCoin;
  } else {
    throw 'both tokens must be different.';
  }

  const amountWei1 = await ether_to_wei(contract1, amount1);
  await approve(fromAddress, privateKey, contract1, address1, amountWei1);
}

export async function SwapTokens(fromAddress, privateKey, token1, token2, amount1, amount2) {
  var contract1, address1;
  var contract2, address2;

  if (amount1 <= 0 || amount2 <= 0) {
    throw 'amounts must be more zero.';
  }
  const symbol = await contractMyCoin.methods.symbol().call();

  if (token1 == 'JPYC' && token2 == symbol) {
    contract1 = contractFakeJPYC;
    address1 = consractAddressFakeJPYC;
    contract2 = contractMyCoin;
    address2 = consractAddressMyCoin;
  } else if (token1 == symbol && token2 == 'JPYC') {
    contract1 = contractMyCoin;
    address1 = consractAddressMyCoin;
    contract2 = contractFakeJPYC;
    address2 = consractAddressFakeJPYC;
  } else {
    throw 'both tokens must be different.';
  }

  const amountWei1 = await ether_to_wei(contract1, amount1);
  await swap(fromAddress, privateKey, address1, address2, amountWei1);
}
