import React, {PureComponent} from "react";
import PropTypes from 'prop-types';

class TextNeon extends PureComponent {
    render() {
        let size1 = this.props.size;
        let size2 = this.props.size * 200 / 100;
        let size3 = this.props.size * 300 / 100;
        let size4 = this.props.size * 400 / 100;
        let size5 = this.props.size * 500 / 100;
        let size6 = this.props.size * 600 / 100;
        let size7 = this.props.size * 700 / 100;
        return (
            <>
                <style>{`
                    @-webkit-keyframes neon {
                        20%, 24%, 55% {
                            color: #111111;
                            text-shadow: none;
                        }
                        0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
                            color: #FFF6A9;
                            text-shadow: 0 0 ${size1}px #FFA500, 0 0 ${size2}px #FFA500, 0 0 ${size3}px #FFA500, 0 0 ${size4}px #FFA500, 0 0 ${size5}px #FF0000, 0 0 ${size6}px #FF8D00, 0 0 ${size7}px #FF0000;
                        }
                    }
                    @keyframes neon {
                        20%, 24%, 55% {
                            color: #111111;
                            text-shadow: none;
                        }
                        0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
                            color: #FFF6A9;
                            text-shadow: 0 0 ${size1}px #FFA500, 0 0 ${size2}px #FFA500, 0 0 ${size3}px #FFA500, 0 0 ${size4}px #FFA500, 0 0 ${size5}px #FF0000, 0 0 ${size6}px #FF8D00, 0 0 ${size7}px #FF0000;
                        }
                    }
                `}</style>
                <p className={this.props.className} style={{
                    textShadow: "0 0 5px #FFA500, 0 0 15px #FFA500, 0 0 20px #FFA500, 0 0 40px #FFA500, 0 0 60px #FF0000, 0 0 10px #FF8D00, 0 0 98px #FF0000",
                    color: "#FFF6A9",
                    WebkitAnimation: "neon 12s infinite",
                    MozAnimation: "neon 12s infinite",
                    animation: "neon 12s infinite",
                }}>{this.props.children}</p>
            </>
        );
    }
}

TextNeon.propTypes = {
    className: PropTypes.string,
    size: PropTypes.number.isRequired
};

export default TextNeon;