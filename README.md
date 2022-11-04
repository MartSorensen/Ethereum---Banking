# Ethereum - Banking
Simple banking smart contract - deployed on local Ethereum network, using Truffle and Ganache


## Truffle installation

```
npm install truffle -g
```

## Ganache
For using a local Ganache blockchain, which the project is currently defined to do in the truffle-config.js file

```
npm install ganache --global
```
Then use the following command to create 10 adresses

```
ganache
```

### Running the test script

```
truffle test
```
![image](https://user-images.githubusercontent.com/55383942/199965191-b9477121-796a-43a7-b597-4951a35ebca3.png)

### Deploying the banking contract

```
truffle migrate
```

### Entering the truffle console

```
truffle console
```
Now the functions of the smart contract can be called as shown in the following images.

#### Getting deployed instance and accounts
```
let instance = await Banking.deployed()
let accounts = await web3.eth.getAccounts()
```
#### Inital balance account 1
```
let initialBalance = await instance.getBalance(accounts[0])
initalBalance.toNumber()
```
![image1](https://user-images.githubusercontent.com/55383942/199963533-995a01cc-b66e-4674-afd1-77f44cc5e0ed.PNG)

#### Depositing into account 1
```
instance.deposit(accounts[0], 50)
let balanceAfterDeposit = await instance.getBalance(accounts[0])
balanceAfterDeposit.toNumber()
```
![image2](https://user-images.githubusercontent.com/55383942/199963546-6559a289-5b28-48fd-a5d5-68b6279f578b.PNG)

#### Withdraw from account 1
```
instance.withdraw(accounts[0], 500)
let balanceAfterWithdraw = await instance.getBalance(accounts[0])
balanceAfterWithdraw.toNumber()
```
![image3](https://user-images.githubusercontent.com/55383942/199963584-333386bb-6ab3-4348-9455-b5a68fdc20de.PNG)

