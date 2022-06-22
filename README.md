# SampleWallet

## 概要

[AMM](https://github.com/peisuke/AutomatedMarketMaker)を併用してアプリ内ウォレットでトークンのミント・交換・送付を行う。

## 準備

- AMMおよび2種類のトークンをデプロイ
  - 注意：トークンのうち片方（下記MyCoin側）はユーザがmintできるようにしておく
  - 上記AMM内のサンプルのトークンであれば、`onlyOwner`を消しておけば良い
- AMMに流動性を追加する
  - 追加方法はAMMのサンプル参照
  
## ウォレットの動かし方

- 以下の.envファイルに、ノードのアドレス、トークンのアドレス、AMMのアドレスを設定
```
HTTP_PROVIDER=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
ADDRESS_FAKEJPYC=0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
ADDRESS_MYCOIN=0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
ADDRESS_AMM=0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

- Expo環境で以下を実行
```
$ yarn install
$ yarn start
```
