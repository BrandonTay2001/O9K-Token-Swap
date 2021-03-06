import React, { Component } from 'react';
import logo from '../logo.png';
import Web3 from 'web3';
import Token from '../abis/Token.json';
import TokenSwap from '../abis/TokenSwap.json';
import './App.css';
import Interface from './Interface.js';
import BuyForm from './BuyForm.js';

class App extends Component {

  // Modified from: https://betterprogramming.pub/how-to-connect-a-react-app-to-the-blockchain-fa9dbd0bbd69
  async componentWillMount() {
    await this.connectWeb3();
    const web3 = window.web3;
    this.setState({web3: web3});
    // Use web3 to get the user's accounts.
    const accounts = await web3.eth.getAccounts();

    // Get the contract instance.
    const networkId = await web3.eth.net.getId();
    let deployedNetwork = TokenSwap.networks[networkId];
    const tokenswapInstance = new web3.eth.Contract(
      TokenSwap.abi,
      deployedNetwork && deployedNetwork.address
    );
    deployedNetwork = Token.networks[networkId];
    const tokenInstance = new web3.eth.Contract(
      Token.abi,
      deployedNetwork && deployedNetwork.address
    );
    
    this.setState({tokenInstance : tokenInstance});
    this.setState({tokenswapInstance: tokenswapInstance});
    // adding metamask account to state
    this.setState({account : accounts[0]});
  }

  // Modified from: https://medium.com/valist/how-to-connect-web3-js-to-metamask-in-2020-fee2b2edf58a
  async connectWeb3() {
    if (window.ethereum) {
      // await window.ethereum.send('eth_requestAccounts');
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else {
      console.log("A problem occured!");
    }
  }
  
  constructor(props) {
    super(props);
    this.state = { account: '', tokenInstance: {}, tokenswapInstance: {}, web3 : null };
  }

  buyTokens = (etherAmount) => {
    // .send() in web3 allows acting on a function instead of just reading from the blockchain
    // .call() just for reading from blockchain
    this.state.tokenswapInstance.methods.purchaseTokens().send({value : etherAmount, from : this.state.account}).on('tHash', (hash) => {
      // do nothing
    });
  }

  sellTokens = (tokenAmount) => {
    this.state.tokenInstance.methods.approve(this.state.tokenswapInstance.address, tokenAmount).send({from : this.state.account}).on('tHash', (hash) => {
      // do nothing
    });
    this.state.tokenswapInstance.methods.sellTokens(tokenAmount).send({value : tokenAmount, from : this.state.account}).on('tHash', (hash) => {
      // do nothing
    });
  }

  render() {
    // Taken from: https://betterprogramming.pub/how-to-connect-a-react-app-to-the-blockchain-fa9dbd0bbd69
    if (!this.state.web3) {
      return <div>Loading contents...</div>
    }

    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="#"
          >
            O9K Token Swap!
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>
                <Interface buyTokens={this.buyTokens} sellTokens={this.sellTokens}/>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
