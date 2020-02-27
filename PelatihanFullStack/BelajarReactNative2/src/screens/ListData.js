import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import { Container, Header, Left, Body, Right, Title, Icon, List, ListItem, Fab, Item, Input, Button } from 'native-base';
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default class App extends Component {


    constructor(props){
        super(props);
        this.state = {

        }
      
    }
  render() {
    console.log(this.props)

    this.props.navigation.setOptions({
        title: "TODO APP",
        headerStyle: {
            backgroundColor: 'blue',
        },
        headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center'
    })
    const toDoList = [
      {
        id: '1',
        list: 'Memasak',
      },
      {
        id: '2',
        list: 'Mencuci',
      },
      {
        id: '3',
        list: 'Main Bola',
      },
      {
        id: '4',
        list: 'Menggambar',
      },
      {
        id: '5',
        list: 'Memasak',
      },
      {
        id: '6',
        list: 'Mencuci',
      },
      {
        id: '7',
        list: 'Main Bola',
      },
      {
        id: '8',
        list: 'Menggambar',
      },
      {
        id: '9',
        list: 'Memasak',
      },
      {
        id: '10',
        list: 'Mencuci',
      },
      {
        id: '11',
        list: 'Main Bola',
      },
      {
        id: '12',
        list: 'Menggambar',
      }
    ]
    toDoList.unshift(this.props.route.params)
    return (
      <View style={{ flex: 1 }}>
          <Header searchBar rounded style={{backgroundColor: 'white'}}>
                <Item style={{backgroundColor:'#ccc'}}>
                    <Icon name="ios-search" />
                    <Input placeholder="Search" />
                </Item>
            </Header>
        <FlatList
          data={toDoList}
          renderItem={({ item }) =>
            <List>
              <ListItem>
                <Text>{item.list}</Text>
              </ListItem>

            </List>
          }
          keyExtractor={item => item.id}
        />

        <Fab

          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => this.props.navigation.navigate('AddData')}
        >
          <Icon name="add" type="MaterialIcons" 
           
          />

        </Fab>

      </View>
    )
  }
}
