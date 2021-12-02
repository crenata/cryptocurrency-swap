import React from "react";
import {useLocation, useNavigate} from "react-router-dom";

const RouteElement = ({component: RouteComponent, ...props}) => {
    const location = useLocation();
    const navigate = useNavigate();
    return <RouteComponent {...props} location={location} navigate={navigate} />;
};

export default RouteElement;