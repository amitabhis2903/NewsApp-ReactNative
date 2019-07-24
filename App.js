import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator, SafeAreaView } from 'react-native';
import {Card, CardItem, Container, Body} from 'native-base'

export default class App extends React.Component {

constructor(props) {
  super(props)
  this.state = {
    isLoading: true,
    dataSource: []
  }
}

getNewsFromApi = () => {
  let API_KEY = '8c84a161bad74300b7ea37e0b2315211'
  let country = 'in'
  const URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=8c84a161bad74300b7ea37e0b2315211`
  return(
    fetch( URL )
      .then( response => response.json())
      .then( responseJson => {
        console.log(responseJson.articles[0].title)
        this.setState({
          isLoading: false,
          dataSource: this.state.dataSource.concat(responseJson.articles)
        })
      })
      .catch(error => console.log(error))
  )
}

_keyExtractor = (items, index) => items.title

componentDidMount() {
  this.getNewsFromApi()
  console.log(this.dataSource)
}
  render() {

    if (this.state.isLoading) {
      return (
      <SafeAreaView style = {{flex: 1}}>
        <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: 'white'}}> 
          <ActivityIndicator size = 'large' color = 'black'>
          </ActivityIndicator>
        </View>
      </SafeAreaView>
      )
    }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style = {{marginTop: 10, 
          color: 'white', 
          fontSize: 30, 
          fontWeight: 'bold', }}>
          News
        </Text>
      </View>
      <FlatList style = {styles.flatContainer}
        
        data = {this.state.dataSource}
        keyExtractor = {this._keyExtractor}
        renderItem = { ({item}) => (
          <Card>
            <CardItem cardBody>
                <Image style = {{height: 200, width: null, flex: 1}}
                  source = {{ uri: item.urlToImage}}
                >
                </Image>
            </CardItem>
            <CardItem cardBody>
                <Body>
                <Text style = {{fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 8, marginRight: 8}}>
                  {item.title}
                </Text>
                </Body>
            </CardItem>
            <CardItem cardBody>
                <Body>
                <Text style = {{fontSize: 18, color: 'gray', marginTop: 10, marginBottom: 10, marginLeft: 8, marginRight: 8}}>
                  {item.description}
                </Text>
                </Body>
            </CardItem>
          </Card>
        )}
        ></FlatList>
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c2938'
  },
  mainContainer: {
    flex: 0.08,
    backgroundColor: '#1c2938',
    justifyContent: 'center',
    alignItems: 'center'
  },
  flatContainer: {
    flex: 2
  }
});
