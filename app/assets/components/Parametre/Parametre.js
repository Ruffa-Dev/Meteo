import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Menu from '../Menu/Menu';

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 6,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
  },
  textInput: {
    flex: 1,
    margin: 20,
    color: 'white',
  },
  input: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    color: 'white',
    fontSize: 30,
    padding: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#003366',
    width: 120,
    height: 'auto',
    borderRadius: 15,
    marginTop: 10,
    borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  codeText: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    color: 'white',
    fontSize: 20,
    justifyContent: 'center',
    padding: 5,
    textAlign: 'center',
  },
});

function Parametre() {
  const [zipcode, setZipcode] = useState('06130');

  const handleZipcode = (value) => {
    setZipcode(value);
  };

  saveValue = async () => {
    try {
      await AsyncStorage.setItem('key', zipcode);
      console.log('Data successfully saved');
      console.log('save' + ' ' + zipcode);
    } catch (e) {
      console.log('Failed to save the data to the storage');
    }

    console.log('Done.');
  };

  return (
    <View style={styles.body}>
      <Menu />
      <ImageBackground
        source={require('../../img/1.jpg')}
        style={styles.backgroundImage}>
        <View style={styles.textInput}>
          <Text style={styles.text}>Code postal</Text>
          <TextInput
            style={styles.codeText}
            onChangeText={handleZipcode}
            value={zipcode}
          />
          <View style={styles.center}>
            <TouchableOpacity style={styles.button} onPress={saveValue}>
              <Text style={styles.text}>Valider</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default Parametre;
