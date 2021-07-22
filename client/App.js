import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, View, Alert, Text, TouchableOpacity, Button, Modal,Pressable } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import axios from 'axios';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      modalVisible: false,
      user:null,
      errorMessage:null
    };
    this.findCoordinates = this.findCoordinates.bind(this);
  }

  async findCoordinates(){

    try {
      await Location.requestBackgroundPermissionsAsync();
      var location = await Location.getCurrentPositionAsync({});
      var latitude =  location['coords']['latitude'];
      var longitude = location['coords']['longitude'];

      await this.setState({latitude,longitude});

      const gpsCoordinates = { user: this.state.user, gpsData:{latitude: latitude, longitude:longitude} };

      const response = await axios.post("http://localhost:8080/location", gpsCoordinates)

      console.log(response)
    } catch (e){
      console.log(e);
    }
  }

  coordinateService = () =>{

    if(this.state.user !=null){
      this.findCoordinates();
      setInterval(this.findCoordinates,5000);
      this.setState({errorMessage:null})
    } else{
      this.setState({ errorMessage:"Please Enter User" })
    }


  }

  updateUser = (input) =>{
    this.setState({user:input.target.value})
  }

  userDataSubmit = () =>{
    console.log(this.state.user)
  }

  render() {
    const { modalVisible } = this.state;
    return (
      <View style={styles.centeredView}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => { this.coordinateService }}
              >
                <Text>Latitude: {this.state.latitude}</Text>
                <Text>Longitude: {this.state.longitude}</Text>
              </Pressable>
            </View>
          </View>
        <View>
          <Text>{this.state.errorMessage}</Text>
        </View>
        <View>
          <input type={"text"} value={this.state.user} onChange={this.updateUser}></input>
          &nbsp;&nbsp;&nbsp;
          <Button title={"Submit Name"} onPress={this.userDataSubmit}></Button>
        </View>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button title="Get Location" onPress={this.coordinateService} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

