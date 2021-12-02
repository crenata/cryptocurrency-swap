import React, {PureComponent} from "react";
import {BrowserRouter, Routes, Route, Outlet, Link} from "react-router-dom";
import RouteElement from "./helpers/RouteElement";
import Config from "./helpers/Config";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

class AppRoutes extends PureComponent {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path={Config.Routers.Home} element={<RouteElement component={Home} />} />
                    <Route path={Config.Routers.Teams.Index} element={<Outlet />}>
                        <Route index element={<div>
                            <h1>Teams</h1>
                            <Link to={Config.Links.Teams.Havea}>Go to Havea</Link>
                        </div>} />
                        <Route path={Config.Routers.Teams.Havea} element={<div>
                            <h1>Havea</h1>
                            <Link to={Config.Links.Teams.Index}>Back</Link>
                        </div>} />
                    </Route>
                    <Route path={Config.Routers.NotFound} element={<RouteElement component={NotFound} />} />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default AppRoutes;