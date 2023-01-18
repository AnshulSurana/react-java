import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import AccountContainer from './containers/AccountContainer';
import TransactionContainer from './containers/TransactionContainer';
import AccListContainer from './containers/AccListContainer';
import TransListContainer from './containers/TransListContainer';
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/CreateAccount"  component={AccountContainer} />
                    <Route path="/CreateTransaction"  component={TransactionContainer} />
                    <Route path="/AccList"  component={AccListContainer} />
                    <Route path="/TransList"  component={TransListContainer} />                 
                </Switch>
            </Router>
        )
    }
}