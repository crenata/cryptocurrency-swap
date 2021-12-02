import React, {PureComponent} from "react";
import Web3Context from "../contexts/Web3Context";
import Template from "../template/Template";
import BgForest from "../helpers/backgrounds/BgForest";
import TextGlow from "../helpers/texts/TextGlow";
import IsEmpty from "../helpers/IsEmpty";

class Home extends PureComponent {
    render() {
        return (
            <Web3Context.Consumer>
                {(web3Context) => {
                    let isWeb3 = !IsEmpty(web3Context.web3);
                    return (
                        <Template className="bgc-1A1E23">
                            <BgForest className="app-content">
                                <div className="container">
                                    <div className="py-5">
                                        <div className="row">
                                            <div className="col-12 col-sm-12 col-md-8 col-lg-6 col-xl-6 offset-sm-0 offset-md-2 offset-lg-3 offset-xl-3">
                                                <div className="p-4 border-radius-1rem box-shadow-primary bgc-white-opacity-95">
                                                    <div className="from-swap">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <label htmlFor="from-swap-input" className="small">From</label>
                                                            <p className="m-0 small">Balance : {isWeb3 ? parseFloat(parseFloat(web3Context.web3.utils.fromWei(web3Context.primaryBalance.toString(), "ether")).toFixed(4)) : 0}</p>
                                                        </div>
                                                        <div className="input-group mt-2">
                                                            <div className="d-flex align-items-center pe-3" id="swap-from">
                                                                <svg viewBox="0 0 16 16" width="24px" color="text" xmlns="http://www.w3.org/2000/svg">
                                                                    <circle cx="8" cy="8" r="8" fill="#F0B90B" />
                                                                    <path d="M5.01656 8.00006L3.79256 9.23256L2.56006 8.00006L3.79256 6.76756L5.01656 8.00006ZM8.00006 5.01656L10.1081 7.12456L11.3406 5.89206L9.23256 3.79256L8.00006 2.56006L6.76756 3.79256L4.66806 5.89206L5.90056 7.12456L8.00006 5.01656ZM12.2076 6.76756L10.9836 8.00006L12.2161 9.23256L13.4401 8.00006L12.2076 6.76756ZM8.00006 10.9836L5.89206 8.87556L4.66806 10.1081L6.77606 12.2161L8.00006 13.4401L9.23256 12.2076L11.3406 10.0996L10.1081 8.87556L8.00006 10.9836ZM8.00006 9.23256L9.23256 8.00006L8.00006 6.76756L6.76756 8.00006L8.00006 9.23256Z" fill="#FFFDFA" />
                                                                </svg>
                                                                <span className="ms-2">BNB</span>
                                                            </div>
                                                            <input
                                                                id="from-swap-input"
                                                                type="text"
                                                                inputMode="decimal"
                                                                autoComplete="off"
                                                                autoCorrect="off"
                                                                pattern="^[0-9]*[.,]?[0-9]*$"
                                                                minLength="1"
                                                                spellCheck="false"
                                                                className="form-control text-end border-radius-1rem"
                                                                placeholder="0.0"
                                                                aria-label="From"
                                                                aria-describedby="swap-from"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="switch-swap my-3">
                                                        <div className="d-flex justify-content-center">
                                                            <button className="rounded-circle border d-flex align-items-center bgc-CBD3D5 opacity-75" style={{width: 28, height: 28}}>
                                                                <svg viewBox="0 0 24 24" width="14px" color="primary" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M11 5V16.17L6.11997 11.29C5.72997 10.9 5.08997 10.9 4.69997 11.29C4.30997 11.68 4.30997 12.31 4.69997 12.7L11.29 19.29C11.68 19.68 12.31 19.68 12.7 19.29L19.29 12.7C19.68 12.31 19.68 11.68 19.29 11.29C18.9 10.9 18.27 10.9 17.88 11.29L13 16.17V5C13 4.45 12.55 4 12 4C11.45 4 11 4.45 11 5Z" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="to-swap">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <label htmlFor="to-swap-input" className="small">To</label>
                                                            <p className="m-0 small">Balance : {isWeb3 ? parseFloat(parseFloat(web3Context.web3.utils.fromWei(web3Context.bep20Balance.toString(), "ether")).toFixed(4)) : 0}</p>
                                                        </div>
                                                        <div className="input-group mt-2">
                                                            <div className="d-flex align-items-center pe-3" id="swap-to">
                                                                <svg viewBox="0 0 24 24" width="24px" color="text" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 16H13V18H11V16ZM12.61 6.04C10.55 5.74 8.73 7.01 8.18 8.83C8 9.41 8.44 10 9.05 10H9.25C9.66 10 9.99 9.71 10.13 9.33C10.45 8.44 11.4 7.83 12.43 8.05C13.38 8.25 14.08 9.18 14 10.15C13.9 11.49 12.38 11.78 11.55 13.03C11.55 13.04 11.54 13.04 11.54 13.05C11.53 13.07 11.52 13.08 11.51 13.1C11.42 13.25 11.33 13.42 11.26 13.6C11.25 13.63 11.23 13.65 11.22 13.68C11.21 13.7 11.21 13.72 11.2 13.75C11.08 14.09 11 14.5 11 15H13C13 14.58 13.11 14.23 13.28 13.93C13.3 13.9 13.31 13.87 13.33 13.84C13.41 13.7 13.51 13.57 13.61 13.45C13.62 13.44 13.63 13.42 13.64 13.41C13.74 13.29 13.85 13.18 13.97 13.07C14.93 12.16 16.23 11.42 15.96 9.51C15.72 7.77 14.35 6.3 12.61 6.04Z" />
                                                                </svg>
                                                                <span className="ms-2">KTR</span>
                                                            </div>
                                                            <input
                                                                id="to-swap-input"
                                                                type="text"
                                                                inputMode="decimal"
                                                                autoComplete="off"
                                                                autoCorrect="off"
                                                                pattern="^[0-9]*[.,]?[0-9]*$"
                                                                minLength="1"
                                                                spellCheck="false"
                                                                className="form-control text-end border-radius-1rem"
                                                                placeholder="0.0"
                                                                aria-label="From"
                                                                aria-describedby="swap-to"
                                                            />
                                                        </div>
                                                    </div>
                                                    <button className="btn text-white w-100 mt-3 bgc-1C152D-opacity-95 border-radius-1rem">
                                                        <TextGlow size={1} className="m-0">Swap</TextGlow>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </BgForest>
                        </Template>
                    );
                }}
            </Web3Context.Consumer>
        );
    }
}

export default Home;