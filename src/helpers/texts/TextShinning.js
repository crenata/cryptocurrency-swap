import React, {PureComponent} from "react";
import PropTypes from 'prop-types';

class TextShinning extends PureComponent {
    render() {
        return (
            <>
                <style>{`
                    @-webkit-keyframes shinning {
                        0% {
                            background-position: -500%;
                        }
                        100% {
                            background-position: 500%;
                        }
                    }
                    @keyframes shinning {
                        0% {
                            background-position: -500%;
                        }
                        100% {
                            background-position: 500%;
                        }
                    }
                `}</style>
                <p className={this.props.className} style={{
                    background: "linear-gradient(90deg, black, white, black) no-repeat",
                    backgroundSize: "80%",
                    WebkitAnimation: "shinning 3s linear infinite",
                    MozAnimation: "shinning 3s linear infinite",
                    animation: "shinning 3s linear infinite",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "rgba(255, 255, 255, 0)",
                }}>{this.props.children}</p>
            </>
        );
    }
}

TextShinning.propTypes = {
    className: PropTypes.string
};

export default TextShinning;