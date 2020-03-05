import React, { Component } from 'react'
import { StyleSheet, View, FlatList, AsyncStorage } from 'react-native'
import { Text, List, ListItem } from 'native-base'
import { RNCamera } from 'react-native-camera';
import axios from 'axios'

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      barcodes: []
    }
  }
  barcodeRecognized = ({ barcodes }) => this.setState({ barcodes });
  renderBarcodes = () => (
    <View>
      {this.state.barcodes.map(this.renderBarcode)}
    </View>
  );
  renderBarcode = ({ bounds, data }) => (
    <React.Fragment key={data + bounds.origin.x}>
      <View
        style={{
          borderWidth: 2,
          borderRadius: 10,
          position: 'absolute',
          alignItems: 'center',
          borderColor: '#F00',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: 10,
          ...bounds.size,
          left: bounds.origin.x,
          top: bounds.origin.y,
        }}
      >
        <Text style={{
          color: '#F00',
          flex: 1,
          position: 'absolute',
          textAlign: 'center',
          backgroundColor: 'transparent',
        }}>{"DETECTED"}</Text>
      </View>
    </React.Fragment>
  );
  renderBarcodes1 = () => (
    <View>
      <FlatList
        data={this.state.barcodes}
        renderItem={({ item }) =>
          <List style={{ marginTop: -10 }}>
            <ListItem key={item.data}>
              <Text style={{ color: 'white', fontSize: 10 }}>{item.data}</Text>
            </ListItem>

          </List>
        }
        keyExtractor={item => item.data}
      />
    </View>
  );

  handleSearch = async () => {
    const idUser1 = await AsyncStorage.getItem('@HistMyThings.idUser')
    const idItem = this.state.barcodes[this.state.barcodes.length - 1].data
    axios({
      url: "https://histmythings1583381336810.mejik.id/graphql",
      method: "POST",
      data: {
        variables: {
          idItem: `${idItem}`
        },
        query: `
              query($idItem: String!){
                item(id: $idItem){
                    id
                    name
                    idUser
                }
            }
          `
      }
    }).then(res => {
      console.log(idUser1)
      console.log(res.data.data.item.idUser)
      this.setState({
        id: res.data.data.item.id,
        item: res.data.data.item.name,
        idUser2: res.data.data.item.idUser
      })
      if (idUser1 != this.state.idUser2) {
        alert("You can't access the item")
        return false
      } else {
        this.props.navigation.navigate('DetailItem', { id: this.state.id, item: this.state.item })
      }

    }).catch(err => {
      alert("The Item is not registered yet")
    })
  }

  render() {

    this.props.navigation.setOptions({
      headerShown: true,
      keyboardHandlingEnabled: false,
      headerTitle: 'Scan QR',
      headerStyle: { backgroundColor: '#505154' },
      headerTintColor: '#FD9644'
    });
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={{
              flex: 1,
              width: '100%',
            }}
            onGoogleVisionBarcodesDetected={this.barcodeRecognized}

          >
            {this.renderBarcodes()}
          </RNCamera>

        </View>
        {this.state.barcodes.length > 0 ?
          <TouchableOpacity
            onPress={() => this.handleSearch()}
            style={{ backgroundColor: '#FD9644', height: 60, alignItems: 'center', justifyContent: 'center' }}>
            {/* {this.renderBarcodes()} */}
            <Text style={{ color: 'white', marginTop: 0 }}><Text style={{ color: 'red', fontWeight: 'bold' }}>{"Your item is detected"}</Text> , click here to display</Text>
          </TouchableOpacity>
          :
          <View style={{ backgroundColor: '#FD9644', height: 50, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: 'white' }}>{"Point the camera to your Items QR Code"}</Text>
          </View>
        }


      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16
  }
})
