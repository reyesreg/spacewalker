import React, { Component } from 'react';
import { View, Image, Dimensions, Animated, Easing, PanResponder } from 'react-native';

import Asteroid from '../components/asteroid';
import Asteroid2 from '../components/asteroid2';
import Meteor from '../components/meteor';
import Astronaut from '../components/astronaut';
import Points from '../components/points';

export default class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            slide: new Animated.ValueXY({ x: 0, y: 0 }),
            slide2: new Animated.ValueXY({ x: 0, y: -Window.height }),
            points: 0,
        }
    }

    refreshBGState() {
        this.setState({
            slide: new Animated.ValueXY({ x: 0, y: 0 }),
            slide2: new Animated.ValueXY({ x: 0, y: -Window.height }),
        });

        this.loopBG();
    }

    loopBG() {
        Animated.parallel([
            Animated.timing(
                this.state.slide, {
                    toValue: { x: 0, y: Window.height },
                    duration: 2000,
                    easing: Easing.linear
                }),
            Animated.timing(
                this.state.slide2, {
                    toValue: { x: 0, y: 0 },
                    duration: 2000,
                    easing: Easing.linear
                }),
        ]).start(() => {
            this.refreshBGState();
        })
    }

    componentDidMount() {
        this.loopBG();
    }

    renderObstacles() {
        return (
            <View>
                <Asteroid winWidth={Math.floor(Math.random() * Window.width-70) + 1}/>
                <Asteroid2 winWidth={Math.floor(Math.random() * Window.width-100) + 1}/>
                <Meteor winWidth={Math.floor(Math.random() * Window.width) + 1}/>
            </View>
        );
    }

    render() {
        const slideStyle = this.state.slide.getTranslateTransform();
        const slideStyle2 = this.state.slide2.getTranslateTransform();

        return (
            <View style={styles.container}>
                <Animated.Image resizeMode='cover' source={require('../assets/img/bg.jpg')}
                    style={[
                        //slideStyle,
                        { width: Window.width, height: Window.height, position: 'absolute' }]} />
                <Animated.Image resizeMode='cover' source={require('../assets/img/bg.jpg')}
                    style={[
                        //slideStyle2,
                        { width: Window.width, height: Window.height, position: 'absolute' }]} />
                <Astronaut />
                <Points score="100"/>
                {this.renderObstacles()}
            </View>
        );
    }
}

const Window = Dimensions.get('window');

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#121538'
    }
};
