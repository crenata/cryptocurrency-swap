import React, {PureComponent} from "react";
import PropTypes from 'prop-types';
import "./BgBubbles.css";

class BgBubbles extends PureComponent {
    render() {
        return (
            <div className={`bubbles position-relative overflow-hidden ${this.props.className}`}>
                {Array.from({length: 50}).map((value, index, array) => (
                    <div key={index} className="bubble"></div>
                ))}
                {this.props.children}
            </div>
        );
    }
}

BgBubbles.propTypes = {
    className: PropTypes.string
};

export default BgBubbles;