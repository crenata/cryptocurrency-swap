import React, {PureComponent} from "react";
import PropTypes from 'prop-types';
import "./BgForest.css";

class BgForest extends PureComponent {
    render() {
        return (
            <div className={`fireflies ${this.props.className}`}>
                {Array.from({length: 15}).map((value, index, array) => (
                    <div key={index} className="firefly"></div>
                ))}
                {this.props.children}
            </div>
        );
    }
}

BgForest.propTypes = {
    className: PropTypes.string
};

export default BgForest;