import React, { Component } from 'react';

class SellForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            outputO9K: '0', outputMsg: "Swapped for: ___ O9K"
        };
        this.updateContent = this.updateContent.bind(this);
    }

    updateContent() {
        var outputMsg = "Swapped for: " + this.state.outputO9K.toString() + " O9K";
        this.setState({outputMsg});
    }

    render() {
        return(
            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let etherAmount
                etherAmount = this.input.value.toString()
                etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')
                this.props.buyTokens(etherAmount)
                }}>
                    <div className="ether-input">
                        <input
                            type="text"
                            onChange={(event) => {
                            const etherAmount = this.input.value.toString()
                            this.setState({
                                outputO9K: etherAmount * 10
                            })
                            }}
                            ref={(input) => { this.input = input }}
                            className="form-control form-control-lg"
                            placeholder="Enter amount in Ether"
                            required />
                    </div>
                    <div className="O9K-output">
                        { this.state.outputMsg }
                    </div>
                    
                    <div className="mb-5">
                        <span className="float-left text-muted">Exchange Rate</span>
                        <span className="float-right text-muted">1 ETH = 10 O9K</span>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block btn-lg" onClick={this.updateContent}>SWAP!</button>
            </form>
        );
    }
}

export default SellForm;