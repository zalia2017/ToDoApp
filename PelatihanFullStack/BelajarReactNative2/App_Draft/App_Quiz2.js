import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import { Container, Header, Left, Body, Right, Title, Icon, List, ListItem, Fab, Item, Input, Button } from 'native-base';

export default class App extends Component {

  render() {
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
    return (
      <View style={{ flex: 1 }}>
        <Header>
          <Left style={{ flex: 1 }} />
          <Body style={{ flex: 1 }}>
            <Title>TO DO APP</Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <Header searchBar rounded>
          <Item>
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
        >
          <Icon name="add" type="MaterialIcons" />

        </Fab>

      </View>
    )
  }
}
