import { HTTP_PROVIDER } from "@env"
import Web3 from 'web3';
const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(HTTP_PROVIDER));

export default web3;
