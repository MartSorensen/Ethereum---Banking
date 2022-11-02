// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./ConvertLib.sol";

/* Banking contract
When a Banking object is created it starts with a balance of 1000.
Fuctions of the contract are:
	- Deposit a specified amount to the specified account.
	- Get balance of account.
	- Withdraws a specified amount from an account if it contains the amount.
	- Transfer amount from one account to another.
	- Converts balance using ConvertLib.sol
*/
contract Banking {

	//The mapping type maps addresses to unsigned integers
	mapping (address => uint) balances; 

	// Events are stored in the transaction’s log
	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	constructor() {
		balances[tx.origin] = 1000;	//Sets initial balance to 1000
	}
	
	// Deposit amount to address.
	function deposit(address addr, uint amount) public payable {
		balances[addr] += amount;
	}

	// Query the balance of a single account.
	function getBalance(address addr) public view returns(uint) {
		return balances[addr];
	}

	// Withdraw amount from an adress.
	function withdraw(address addr, uint amount) public returns(bool sufficient){
		if (balances[addr] < amount) return false;  // checks if the account contains the amount
		balances[addr] -= amount;
		return true;
	}

	// Transfers amount from the sender to an recieving address
	function sendAmount(address receiver, uint amount) public returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false; // checks if the account contains the amount
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		emit Transfer(msg.sender, receiver, amount); // Calls the defined Transfer event
		return true;
	}


	// Mostly for playing with a library difined in another file (mutiplies the address balance with an integer).
	function getBalanceConverted(address addr) public view returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}
}
