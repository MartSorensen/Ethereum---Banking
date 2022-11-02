const Banking = artifacts.require("Banking");

contract('Banking', (accounts) => {
  it('should initially have 1000 coins in the first account', async () => {
    const bankingInstance = await Banking.deployed();
    const balance = await bankingInstance.getBalance.call(accounts[0]);

    // Checks of the balance from the constructor is 1000
    assert.equal(balance.valueOf(), 1000, "1000 wasn't in the first account");
  });
  // 
  it('should deposit a specified amount into the specified account', async () => {
    const bankingInstance = await Banking.deployed();
    
    const account = accounts[0];
    const startingBalance = (await bankingInstance.getBalance.call(account)).toNumber();
    const amount = 20;
    
    // Deposits 20 coins into the account
    await bankingInstance.deposit(account, amount);
    const endingBalance = (await bankingInstance.getBalance.call(account)).toNumber();

    assert.equal(endingBalance, startingBalance + amount, "Amount wasn't correctly deposited");
  })
  it('should withdraw a specified amount the specified account', async () => {
    const bankingInstance = await Banking.deployed();
    
    const account = accounts[0];
    const startingBalance = (await bankingInstance.getBalance.call(account)).toNumber();
    const amount = 20;
    
    // Deposits 20 coins into the account
    await bankingInstance.withdraw(account, amount);
    const endingBalance = (await bankingInstance.getBalance.call(account)).toNumber();

    assert.equal(endingBalance, startingBalance - amount, "Amount wasn't correctly withdrawn");
  })
  it('should call a function that depends on a linked library', async () => {
    const bankingInstance = await Banking.deployed();

    const account = accounts[0];
    const bankingBalance = (await bankingInstance.getBalance.call(account)).toNumber();
    const bankingBalanceConverted = (await bankingInstance.getBalanceConverted.call(account)).toNumber();

    assert.equal(bankingBalanceConverted, 2 * bankingBalance, 'Library function returned unexpected function, linkage may be broken');
  });
  it('should send coin correctly', async () => {
    const bankingInstance = await Banking.deployed();

    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    // Get initial balances of first and second account.
    const accountOneStartingBalance = (await bankingInstance.getBalance.call(accountOne)).toNumber();
    const accountTwoStartingBalance = (await bankingInstance.getBalance.call(accountTwo)).toNumber();

    // Make transaction from first account to second.
    const amount = 10;
    await bankingInstance.sendAmount(accountTwo, amount, { from: accountOne });

    // Get balances of first and second account after the transactions.
    const accountOneEndingBalance = (await bankingInstance.getBalance.call(accountOne)).toNumber();
    const accountTwoEndingBalance = (await bankingInstance.getBalance.call(accountTwo)).toNumber();

    assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
  });
});
