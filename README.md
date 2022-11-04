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

### Deploying the banking contract

```
truffle migrate
```
