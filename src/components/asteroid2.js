import React, { Component } from 'react';
import {
    View,
    Animated,
    Easing,
    Dimensions,
    Image
} from 'react-native';

export default class Asteroid2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slide: new Animated.ValueXY({ x: this.props.winWidth, y: -100 }),
            spinValue: new Animated.Value(0),
        }
    }

    refreshMeteorState() {
        let val = Math.floor(Math.random() * Window.width-100) + 1;

        this.setState({
            slide: new Animated.ValueXY({ x: val, y: -100 }),
            spinValue: new Animated.Value(0)
        })

        this.attack(val);
    }

    attack(val) {
        Animated.parallel([
            Animated.timing(
                this.state.slide, {
                    toValue: { x: val, y: Window.height },
                    delay: 7000,
                    duration: 3300,
                    easing: Easing.linear,
                    rotate: 360,
                }),
            Animated.timing(
                this.state.spinValue, {
                    toValue: 1,
                    delay: 7000,
                    duration: 3300,
                    easing: Easing.linear
                })
        ]).start(() => {
            this.refreshMeteorState();
        });
    }

    componentDidMount() {
        this.attack(this.props.winWidth);
    }

    render() {
        const spin = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
        const slideStyle = this.state.slide.getTranslateTransform();

        return (
            <Animated.View style={[styles.container,
                //slideStyle,
                {transform: [{ rotate: spin }]}]}>
                <Image resizeMode="cover" source={require('../assets/img/asteroid2.png')} style={{ height: 100, width: 100, }} />
            </Animated.View>
        );
    }
}

const Window = Dimensions.get('window');

const styles = {
    container: {
        height: 100,
        width: 100,
        backgroundColor: 'transparent',
        position: 'absolute'
    }
}