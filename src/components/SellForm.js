import React, { Component } from 'react';

class SellForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            outputEth: '0', outputMsg: "Swapped for: ___ Ether"
        };
        this.updateContent = this.updateContent.bind(this);
    }

    updateContent() {
        console.log(this.state.outputEth);
        var outputMsg = "Swapped for: " + this.state.outputEth.toString() + " Ether";
        this.setState({outputMsg});
    }

    render() {
        return(
            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let etherAmount
                etherAmount = this.input.value.toString()
                etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')
                this.props.sellTokens(etherAmount)
                }}>
                    <div className="token-input">
                        <input
                            type="text"
                            onChange={(event) => {
                                const tokenAmount = this.input.value.toString()
                                this.setState({
                                    outputEth: tokenAmount / 10
                                })
                            }}
                            ref={(input) => { this.input = input }}
                            className="form-control form-control-lg"
                            placeholder="Enter amount in O9K"
                            required />
                    </div>
                    <div className="ether-output">
                        { this.state.outputMsg }
                    </div>
                    
                    <div className="mb-5">
                        <span className="float-left text-muted">Exchange Rate</span>
                        <span className="float-right text-muted">1 Eth = 10 O9K</span>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block btn-lg" onClick={this.updateContent}>SWAP!</button>
            </form>
        );
    }
}

export default SellForm;