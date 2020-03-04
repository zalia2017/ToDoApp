import React, { Component } from 'react'
import { StyleSheet, View, FlatList, Image } from 'react-native'
import { Form, Button, Text, List, ListItem, Fab, Icon } from 'native-base'
import { RNCamera } from 'react-native-camera';

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            barcodes : []
        }
    }
    barcodeRecognized = ({ barcodes }) => this.setState({ barcodes });
    // barcodeRecognized = ({ barcodes }) => 
    //     this.setState({barcodes : {barcodes}})
    //     // barcodes.forEach(barcode => console.warn(barcode.data))
    //   };
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
            }}>{data}</Text>
          </View>
        </React.Fragment>
      );
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
                <View>
                    {/* <Text>{this.state.barcodes}</Text> */}
                </View>
                <TouchableOpacity disabled
                    onPress={() => this.props.navigation.navigate('ScanQR')}
                    style={{ backgroundColor: '#FD9644', height: 50, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'white' }}>Scan QR Code</Text>
                </TouchableOpacity>
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
