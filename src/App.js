import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Game from './screens/game';
import Menu from './screens/menu';

export default class App extends Component {
    render() {
        return(
            <Router>
                <Scene key="root">
                    <Scene key="Menu" component={Menu} title="Menu" initial />
                    <Scene key="Game" component={Game} title="Game" hideNavBar/>
                </Scene>
            </Router>
        );
    }
}