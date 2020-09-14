import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import {Link} from "react-router-dom";
import Search from './pages/Search/Search';
import Favourites from "./pages/Favourites/Favoutires";

function App() {
    return (
        <Router>
            <div className="App">
                <div className="App__header">
                    <div className="App__links">
                        <Link className={'App__header-link'} to="/search">Search</Link>
                        <Link className={'App__header-link'} to="/favourites">Favourites</Link>
                    </div>
                </div>
                <Switch>
                    <Route path="/search">
                        <Search/>
                    </Route>
                    <Route path="/favourites" exact>
                        <Favourites/>
                    </Route>
                    <Route path="/" >
                        <Redirect to="/search"/>;
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App
