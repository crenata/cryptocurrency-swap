import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class TextTruncate extends PureComponent {
    render() {
        return (
            <p className={this.props.className} style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: this.props.lineClamp.toString(),
                WebkitBoxOrient: "vertical",
                lineHeight: 1.2,
            }}>{this.props.children}</p>
        );
    }
}

TextTruncate.propTypes = {
    className: PropTypes.string,
    lineClamp: PropTypes.number.isRequired
};

export default TextTruncate;