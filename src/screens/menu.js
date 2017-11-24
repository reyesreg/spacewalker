import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import TextInput2 from '../components/textInput';

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '' }
    }

    render() {

        return (
            <View style={{ marginTop: 100 }}>
                <Text>Menu</Text>
                <TouchableOpacity onPress={() => Actions.Game()}><Text>Play</Text></TouchableOpacity>
                <TextInput
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    fontStyle={this.state.text.length == 0 ? 'italic' : 'normal'}
                    placeholder="hi"
                    />
                <TextInput
                    style={[{fontStyle: 'normal', marginTop: 30 }]}
                    placeholder="Username"
                    placeholderTextColor="yellow"
                    fontStyle='italic'
                    multiline={false}
                    />
            </View>
        );
    }
}

const styles = {
};
