import React, { Component } from 'react';
import BuyForm from './BuyForm.js';
import SellForm from './SellForm.js';

class Interface extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentForm : 'buy'
        };
    }

    render() {
        let content;
        if (this.state.currentForm === 'buy') {
            content = <BuyForm buyTokens={this.props.buyTokens}/>
        }
        else {
            content = <SellForm sellTokens={this.props.sellTokens}/>
        }
        return(
            <div id="content">
                <div className="d-flex justify-content-between mb-3">
                    <button
                        className="btn btn-light"
                        onClick={(event) => {
                            this.setState({ currentForm: 'buy' })
                        }}
                        >
                        Buy
                    </button>
                    <span className="text-muted">&lt; &nbsp; &gt;</span>
                    <button
                        className="btn btn-light"
                        onClick={(event) => {
                            this.setState({ currentForm: 'sell' })
                        }}
                        >
                        Sell
                    </button>
                </div>

                <div className="card mb-4" >
                <div className="card-body">
                    {content}

                    </div>
                        <h6>psst.. make sure you have Metamask connected to the right network!</h6>
                    </div>
                </div>
        );
    }
}

export default Interface;