import React, {PureComponent} from "react";
import {Link} from "react-router-dom";
import Identicon from "identicon.js";
import Config from "../helpers/Config";
import Web3Context from "../contexts/Web3Context";
import logo from "../images/logo.svg";
import IsEmpty from "../helpers/IsEmpty";
import TextNeon from "../helpers/texts/TextNeon";
import TextGlow from "../helpers/texts/TextGlow";
import "./Navbar.css";

class Navbar extends PureComponent {
    render() {
        return (
            <Web3Context.Consumer>
                {(web3Context) => (
                    <nav className="navbar navbar-light bgc-1F1E30">
                        <div className="container-fluid h-100">
                            <Link to={Config.Links.Home} className="navbar-brand text-white d-flex align-items-center">
                                <img
                                    src={logo}
                                    alt="Brand"
                                    width="36"
                                    height="36"
                                    className="logo"
                                />&nbsp;&nbsp;
                                <TextNeon className="m-0 font-family-great-vibes fw-bold fs-4" size={5}>Crypto Swap</TextNeon>
                            </Link>
                            {IsEmpty(web3Context.account) ?
                                <button className="btn text-white bgc-FFA500 btn-bubble" onClick={web3Context.loadWeb3}>Connect</button> :
                                <div className="account d-flex align-items-center">
                                    <TextGlow className="m-0 small" size={1}>{web3Context.account}</TextGlow>
                                    <img
                                        src={`data:image/png;base64, ${new Identicon(web3Context.account, 24).toString()}`}
                                        alt="Account"
                                        width="24"
                                        height="24"
                                        className="rounded-circle ms-2 logo"
                                    />
                                </div>
                            }
                        </div>
                    </nav>
                )}
            </Web3Context.Consumer>
        );
    }
}

export default Navbar;