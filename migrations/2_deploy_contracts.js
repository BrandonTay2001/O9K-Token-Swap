const Token = artifacts.require("Token");
const TokenSwap = artifacts.require("TokenSwap");

module.exports = async function(deployer) {
    // deploys the 'Token' contract
    await deployer.deploy(Token);
    const token = await Token.deployed();

    // deploys the 'TokenSwap' contract
    await deployer.deploy(TokenSwap, token.address);
    const tokenSwap = await TokenSwap.deployed();

    // Transferring all the tokens to TokenSwap
    await token.transfer(tokenSwap.address, '9000000000000000000000');
};
