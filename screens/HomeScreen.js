import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Avatar, Card } from 'react-native-elements'
import debounce from 'lodash.debounce'

import Loading from '../components/Loading'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Users',
  }
 
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      page: 1,
      loadMore: false,
      noMoreUser: false
    }
  }
  componentDidMount() {
    setTimeout( this._requestData, 3000)
  }

  _requestData = async () => {
    const { dataSource } = this.state
        // console.warn('requestData...')
    fetch(`https://reqres.in/api/users?per_page=5&page=${this.state.page}`)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: dataSource.concat(responseJson.data),
          loadMore: false,
          noMoreUser: responseJson.data.length ? false : true
        })
        // console.warn(responseJson.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <Card containerStyle={styles.contentContainer} >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Avatar
              rounded
              source={{ uri: item.avatar }}
              style={styles.image}
              size="xlarge"
              activeOpacity={0.7}
            />
            <View>
              <Text style={{ fontSize: 18 }}>
                {item.first_name} {item.last_name}
              </Text>
              <Text>{item.email}</Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    )
  }
  _handleLoadMore = () => {
    const { page, noMoreUser } = this.state
    // console.warn('handleLoadMore...');
    if (!noMoreUser) {
      this.setState(
        {
          page: page + 1,
          loadMore: true
        },
        this._requestData
      )
    }
  }
  _renderLoadMore = () => {
    return this.state.loadMore ? (
        <View style={styles.loader}>
          {this.state.noMoreUser ?
            <Text style={{ textAlign: 'center' }}>No more user</Text> :
            <ActivityIndicator size="large" />
          }
        </View> 
    ) : this.state.noMoreUser ? (<Text style={{ textAlign: 'center', marginTop: 10, marginBottom: 10 }}>No more user</Text>) : null
  }
  render() {
    const { isLoading, dataSource } = this.state
    return isLoading ? (
      <Loading show={isLoading}/>
    ) : (
        <View style={styles.container}>
          {/* TODO : to externalize */} 
          <FlatList
            data={dataSource}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index}
            bounces={false}
            onEndReached={debounce(this._handleLoadMore, 500)}
            onEndReachedThreshold={0.01}
            ListFooterComponent={this._renderLoadMore}
          />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 10,
    marginTop: 5,
    marginBottom: 0
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
    marginBottom: 5,
  },
  loader: {
    marginTop: 40,
    marginBottom: 40
  }
});
