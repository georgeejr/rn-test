import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { WebBrowser, Icon } from 'expo';
export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };
  _handlePress = (url) => {
    WebBrowser.openBrowserAsync(url)
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.option} onPress={this._handlePress.bind(this, 'https://github.com/georgeejr')}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.optionIconContainer}>
              <Icon.Ionicons
                name={
                  Platform.OS === 'ios'
                    ? `ios-git-branch${focused ? '' : '-outline'}`
                    : 'md-git-branch'
                }
                size={26}
                style={{ marginBottom: -3, marginRight: 10 }}
              />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>
                https://github.com/georgeejr
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={this._handlePress.bind(this, 'https://www.linkedin.com/in/georgeejr/')}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.optionIconContainer}>
              <Icon.Ionicons
                name="logo-linkedin"
                size={26}
                style={{ marginBottom: -3, marginRight: 10 }}
              />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionText}>
                https://www.linkedin.com/in/georgeejr
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  optionsTitleText: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 9,
    marginBottom: 12,
  },
  optionIconContainer: {
    marginRight: 9,
  },
  option: {
    backgroundColor: '#fefefe',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomColor: '#EDEDED',
  },
  optionText: {
    fontSize: 15,
    marginTop: 1,
  },
});