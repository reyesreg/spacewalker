import React, { Component } from 'react';
import {
    View,
    Image,
    Dimensions,
    Animated,
    Easing,
    PanResponder
} from 'react-native';

export default class Astronaut extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pan: new Animated.ValueXY({ x: (Window.width - 68) / 2, y: Window.height - 200 }),
            fireSlide: new Animated.ValueXY({ x: 0, y: -100 }),
        }
    }

    loopFlame() {
        Animated.sequence([
            Animated.timing(
                this.state.fireSlide, {
                    toValue: { x: 0, y: -90 },
                    duration: 1000,
                    easing: Easing.linear
                }),
            Animated.timing(
                this.state.fireSlide, {
                    toValue: { x: 0, y: -100 },
                    duration: 1000,
                    easing: Easing.linear
                })
        ]).start(() => {
            this.loopFlame();
        })
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,

            onPanResponderGrant: (e, gestureState) => {
                this.state.pan.setOffset({ x: this.state.pan.x._value, y: this.state.pan.y._value });
                this.state.pan.setValue({ x: 0, y: 0 });
            },

            onPanResponderMove: Animated.event([
                null, {
                    dx: this.state.pan.x,
                    dy: this.state.pan.y,
                },
            ]),

            onPanResponderRelease: (e, {vx, vy}) => {
                this.state.pan.flattenOffset();
            }
        });
    }

    componentDidMount() {
        this.loopFlame();
    }

    render() {
        let { pan } = this.state;
        let [translateX, translateY] = [pan.x, pan.y];
        let dragBoxStyle = { transform: [{ translateX }, { translateY }] };

        const fireSlideStyle = this.state.fireSlide.getTranslateTransform();

        return (
            <Animated.View {...this._panResponder.panHandlers} style={[styles.dragBox, dragBoxStyle]}>
                <Image resizeMode='cover' source={require('../assets/img/astronaut.png')} style={{ width: 68, height: 130, zIndex: 5, left: 6 }} />
                <Animated.Image resizeMode='cover' source={require('../assets/img/flame.png')}
                    style={[
                        //fireSlideStyle,
                        { width: 80, height: 130, position: 'absolute' }]} />
            </Animated.View>
        );
    }
}

const Window = Dimensions.get('window');

const styles = {
    dragBox: {
        height: 170,
        width: 80,
        position: 'absolute',
    }
};
