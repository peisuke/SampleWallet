# SampleWallet

## 概要

[AMM](https://github.com/peisuke/AutomatedMarketMaker/tree/sample_wallet)を併用してアプリ内ウォレットでトークンのミント・交換・送付を行う。

## 準備

### AMMおよび2種類のトークンをデプロイ(ローカル)

```
$ git clone https://github.com/peisuke/AutomatedMarketMaker -b sample_wallet
$ cd AutomatedMarketMaker
$ npm install
$ npx hardhat node --hostname 0.0.0.0

# 別のターミナルを開く
$ npx hardhat compile
$ npx hardhat run scripts/deploy.js --network localhost
```

### 環境変数を設定

```
HTTP_PROVIDER=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
ADDRESS_FAKEJPYC=0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX (上記コントラクトデプロイ時に表示されるアドレスを入力)
ADDRESS_MYCOIN=0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
ADDRESS_AMM=0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
OWNER_ADDRESS=0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX (上記ノード立ち上げ時に表示される先頭のアドレスとキーを入力)
PRIVATE_KEY=0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### AMMに流動性を追加

```
$ git clone https://github.com/peisuke/SampleWallet.git
$ cd SampleWallet
$ npm install
$ node scripts/mint.js
$ node scripts/add_liquidity.js
```  

## ウォレットの動かし方

### Expo環境の構築

個人的には[このサイト](https://zenn.dev/kateapp/articles/eda4244b6276a0)の手順を利用

### Expo環境で以下を実行

```
$ yarn install
$ yarn start
```
