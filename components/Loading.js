import React from 'react';
import {
  Animated,
  Image,
  View,
} from 'react-native'


export default class Loading extends React.Component {
  constructor(props) {
    super(props)
    this.loadingOpacity = new Animated.Value(0)
  }
  componentDidMount() {
    this.handleAnimation()
  }
  handleAnimation() {
    this.loadingOpacity.setValue(0)
    Animated.sequence([
      Animated.timing(
        this.loadingOpacity,
        {
          toValue: 1,
          duration: 300,
        }
      ),
      Animated.timing(
        this.loadingOpacity,
        {
          toValue: 0,
          duration: 300,
        }
      )
    ]).start(() => this.handleAnimation())
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', opacity: (this.props.show) ? 1 : 0 }}>
        <Animated.Image source={require('../assets/images/ombori.png')} style={{ width: 100, height: 100, opacity: this.loadingOpacity }} />
      </View>
    )
  }
}