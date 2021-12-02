import React, {PureComponent} from "react";
import PropTypes from 'prop-types';

class TextGlow extends PureComponent {
    render() {
        let size1 = this.props.size;
        let size2 = this.props.size * 200 / 100;
        let size3 = this.props.size * 300 / 100;
        let size4 = this.props.size * 400 / 100;
        let size5 = this.props.size * 500 / 100;
        let size6 = this.props.size * 600 / 100;
        let size7 = this.props.size * 700 / 100;
        let size8 = this.props.size * 800 / 100;
        return (
            <>
                <style>{`
                    @-webkit-keyframes glow {
                        from {
                            text-shadow: 0 0 ${size1}px white, 0 0 ${size2}px white, 0 0 ${size3}px #E60073, 0 0 ${size4}px #E60073, 0 0 ${size5}px #E60073, 0 0 ${size6}px #E60073, 0 0 ${size7}px #E60073;
                        }
                        to {
                            text-shadow: 0 0 ${size2}px white, 0 0 ${size3}px #FF4DA6, 0 0 ${size4}px #FF4DA6, 0 0 ${size5}px #FF4DA6, 0 0 ${size6}px #FF4DA6, 0 0 ${size7}px #FF4DA6, 0 0 ${size8}px #FF4DA6;
                        }
                    }
                    @keyframes glow {
                        from {
                            text-shadow: 0 0 ${size1}px white, 0 0 ${size2}px white, 0 0 ${size3}px #E60073, 0 0 ${size4}px #E60073, 0 0 ${size5}px #E60073, 0 0 ${size6}px #E60073, 0 0 ${size7}px #E60073;
                        }
                        to {
                            text-shadow: 0 0 ${size2}px white, 0 0 ${size3}px #FF4DA6, 0 0 ${size4}px #FF4DA6, 0 0 ${size5}px #FF4DA6, 0 0 ${size6}px #FF4DA6, 0 0 ${size7}px #FF4DA6, 0 0 ${size8}px #FF4DA6;
                        }
                    }
                `}</style>
                <p className={this.props.className} style={{
                    color: "#FFFFFF",
                    WebkitAnimation: "glow 1s ease-in-out infinite alternate",
                    MozAnimation: "glow 1s ease-in-out infinite alternate",
                    animation: "glow 1s ease-in-out infinite alternate",
                }}>{this.props.children}</p>
            </>
        );
    }
}

TextGlow.propTypes = {
    className: PropTypes.string,
    size: PropTypes.number.isRequired
};

export default TextGlow;