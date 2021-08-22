// Edited from the official ERC-20 standard token template

pragma solidity ^0.5.0;

contract Token {
    mapping(address => uint) public userBalance;
    mapping(address => mapping(address => uint)) public allowance;
    uint public totalSupply = 9000 * 10 ** 18;
    string public name = "Over Nine Thousand";
    string public ticker = "O9K";
    uint public decimals = 18;
    
    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
    
    constructor() public {
        userBalance[msg.sender] = totalSupply;
    }
    
    function balanceOf(address userAddress) public view returns(uint) {
        return userBalance[userAddress];
    }
    
    function transfer(address to, uint value) public returns (bool) {
        require(balanceOf(msg.sender) >= value, 'Error: Balance too low!');
        userBalance[to] += value;
        userBalance[msg.sender] -= value;
        emit Transfer(msg.sender, to, value);
        return true;
    }
    
    function transferFrom(address from, address to, uint value) public returns(bool) {
        require(balanceOf(from) >= value, 'Error: Balance too low!');
        require(allowance[from][msg.sender] >= value, 'Error: Allowance too low!');
        userBalance[to] += value;
        userBalance[from] -= value;
        emit Transfer(from, to, value);
        return true;
    }
    
    function approve(address spender, uint value) public returns(bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }
    
}