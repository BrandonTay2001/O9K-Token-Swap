const { assert } = require('chai');
const { Item } = require('react-bootstrap/lib/Breadcrumb');

const Token = artifacts.require('Token');
const TokenSwap = artifacts.require('TokenSwap');

// Testing file

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('TokenSwap', (accounts) => {

    let token, tokenSwap;

    // this code is run before the other functions
    before(async() => {
        token = await Token.new();
        tokenSwap = await TokenSwap.new(token.address);
        await token.transfer(tokenSwap.address, '8000000000000000000000');   // 8000 O9K
        // await token.transfer(accounts[1], '1000000000000000000000');    // 1000 O9K
    })

    // basic test for 'Token' contract deployment
    describe('Token deployment', async() => {
        it('has a name', async() => {
            const name = await token.name();
            assert.equal(name, 'Over Nine Thousand');
        })
    })

    describe('TokenSwap deployment', async() => {
        it('has tokens transferred', async() => {
            let balance = await token.balanceOf(tokenSwap.address);
            assert.equal(balance.toString(), '8000000000000000000000');    // 8000 O9K
        })
    })

    describe('Purchase tokens', async() => {
        it('purchase of tokens successful?', async() => {
            await tokenSwap.purchaseTokens({from : accounts[1], value : '1000000000000000000'});  // 1 ether
            let balanceOfCaller = await token.balanceOf(accounts[1]);
            assert.equal(balanceOfCaller.toString(), '10000000000000000000');   // 10 O9K

            let balance = await token.balanceOf(tokenSwap.address);
            assert.equal(balance.toString(), '7990000000000000000000'); // 7990 O9K
        })
    })

    describe('Sell tokens', async() => {
        before(async() => {
            // approving transaction before calling 'transferFrom'
            await token.approve(tokenSwap.address, '10000000000000000000', {from : accounts[1]});   // 10 O9K
        })

        it('sale of tokens successful?', async() => {
            await tokenSwap.sellTokens('10000000000000000000', {from : accounts[1]});  // 10 O9K
            let balanceOfSwap = await token.balanceOf(tokenSwap.address);
            assert.equal(balanceOfSwap.toString(), '8000000000000000000000');   // 8000 O9K (7990 + 10)

            let balance = await token.balanceOf(accounts[1]);
            assert.equal(balance.toString(), '0'); // 0 O9K
        })
    })
})