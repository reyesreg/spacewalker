import React, { Component } from 'react';
import {
    View,
    Animated,
    Easing,
    Dimensions,
    Image
} from 'react-native';

export default class Meteor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slide: new Animated.ValueXY({ x: this.props.winWidth, y: -140 }),
            angle: 1
        }
    }

    refreshMeteorState() {
        let val = Math.floor(Math.random() * Window.width) + 1;
        let val2 = Math.floor(Math.random() * Window.width) + 1;

        this.setState({
            slide: new Animated.ValueXY({ x: val, y: -140 }),
            angle: (0-Window.height)/(val-val2),
        })

        this.attack(val, val2);
    }

    attack(val, val2) {
        Animated.timing(
            this.state.slide, {
                toValue: { x: val2, y: Window.height },
                delay: 5000,
                duration: 1500,
                easing: Easing.linear,
            }).start(() => {
                this.refreshMeteorState();
            });
    }

    componentDidMount() {
        this.attack(this.props.winWidth);
    }

    render() {
        const slideStyle = this.state.slide.getTranslateTransform();

        return (
            <Animated.View
                style={[styles.container,
                    //slideStyle,
                    {transform: [{rotate: -(this.state.angle) + 'deg'}]}
                ]}>
                <Image resizeMode="cover" source={require('../assets/img/meteor.png')} style={{ height: 140, width: 45, }} />
            </Animated.View>
        );
    }
}

const Window = Dimensions.get('window');

const styles = {
    container: {
        height: 140,
        width: 45,
        backgroundColor: 'gray',
        position: 'absolute'
    }
}