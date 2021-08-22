pragma solidity ^0.5.0;

import "./Token.sol";

contract TokenSwap {
    string public name = "Token Swap!";
    Token public token;
    
    constructor(Token _token) public {
        token = _token;
    }

    // payable function type ensures that ether can be sent (payments can be made)
    function purchaseTokens() public payable {
        // requires that the contract caller has more ether than what they intend to swap
        require(msg.sender.balance >= msg.value);

        // requires that the 'TokenSwap' contract has more O9K than requested
        require(token.balanceOf(address(this)) >= (msg.value * 10));

        token.transfer(msg.sender, (msg.value * 10));   // 1 ether = 0.1 O9K
    }

    function sellTokens(uint tokensSold) public payable {
        // require that the O9K balance of the contract caller is larger than the sale amount
        require(token.balanceOf(msg.sender) >= tokensSold);

        // require that the Ether balance of the 'TokenSwap' contract is greater than requested amount
        require(address(this).balance >= (tokensSold / 10));

        // tokens need to be transferred to this smart contract
        token.transferFrom(msg.sender, address(this), tokensSold);

        // sending ether to the contract caller
        msg.sender.transfer(tokensSold / 10);
    }
}