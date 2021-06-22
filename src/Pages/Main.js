import React from 'react'
import {
    BrowserRouter as Router,
    HashRouter,
    Switch,
    Route,
} from 'react-router-dom'
import FrontendAuth from "../RouterAuth/FrontendAuth";

function Main () {
    return (
        <Router>
            <Switch>
                <FrontendAuth></FrontendAuth>

            </Switch>
        </Router>
    )
}

export default Main