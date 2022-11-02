// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// These files are dynamically created at test time
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Banking.sol";

contract test_banking {

  function testInitialBalanceUsingDeployedContract() public {
    Banking bank = Banking(DeployedAddresses.Banking());

    uint expected = 1000;

    Assert.equal(bank.getBalance(tx.origin), expected, "Owner should have 1000 coins initially");
  }

  function testInitialBalanceWithNewBanking() public {
    Banking bank = new Banking();

    uint expected = 1000;

    Assert.equal(bank.getBalance(tx.origin), expected, "Owner should have 1000 coins initially");
  }

}
