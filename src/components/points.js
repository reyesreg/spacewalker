import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';

export default class Points extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ position: 'absolute', bottom: 10, right: 10, }}>
                <Text style={{ color: 'white' }}>{this.props.score}</Text>
            </View>
        );
    }
}