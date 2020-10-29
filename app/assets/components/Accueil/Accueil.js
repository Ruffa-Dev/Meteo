import React, {useEffect, useState} from 'react';
import Days from '../Days/Days';
import Menu from '../Menu/Menu';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import images from '../../images';
import {Icon} from 'react-native-elements';

const styles = StyleSheet.create({
  logo: {
    width: 70,
    height: 70,
  },
  content: {
    flex: 2,
    margin: 10,
    flexDirection: 'row',
  },
  title: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    textTransform: 'capitalize',
    color: 'white',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  refresh: {
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#003366',
    padding: 1,
    width: 50,
    height: 'auto',
    borderRadius: 15,
    marginBottom: 5,
    borderColor: 'white',
    borderWidth: 1,
  },
  button1: {
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
  col: {
    flex: 1,
    flexDirection: 'column',
  },
  valign: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'right',
  },
  texttemp: {
    fontSize: 30,
    color: 'black',
    marginBottom: 20,
    marginTop: 10,
  },
  background: {
    backgroundColor: 'lightgrey',
    flex: 1,
  },
  backgroundImage: {
    flex: 2,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  logotemp: {
    width: 20,
    height: 20,
  },
});

function Accueil() {
  const [showWeather, setShowWeather] = useState({
    weather: [{}],
    main: {},
    wind: {},
  });

  const [zipcode, setZipcode] = useState('06130');

  const getMyStringValue = async () => {
    try {
      console.log('Data successfully received');
      const data = await AsyncStorage.getItem('key');
      setZipcode(data);
      console.log(zipcode);
      getData();
    } catch (e) {
      console.log('Failed to receive the data in the storage');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    const options = {
      method: 'GET',
    };
    fetch(
      'http://api.openweathermap.org/data/2.5/weather?zip=' +
        zipcode +
        ',fr&appid=33c68e0324103ef70dd386498dab63f7&lang=fr&units=metric',
      options,
    )
      .then((response) => {
        return response.json();
      })
      .then(
        (data) => {
          if (data) {
            setShowWeather(data);
          }
        },
        (error) => {
          console.log(error);
        },
      );
  }

  return (
    <View style={styles.background}>
      <ImageBackground
        source={require('../../img/3.jpg')}
        style={styles.backgroundImage}>
        <Menu />
        <View style={styles.content}>
          <View style={styles.col}>
            <View style={styles.refresh}>
              <TouchableOpacity
                style={styles.button}
                onPress={getMyStringValue}>
                <Icon
                  name="cw"
                  size={20}
                  color="white"
                  type="entypo"
                  style={styles.iconReload}
                  onPress={getMyStringValue}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.image}>
              <Image
                style={styles.logo}
                source={images[showWeather.weather[0].icon]}
              />
              <Text style={styles.title}>{showWeather.name}</Text>
              <Text style={styles.text}>
                {showWeather.weather[0].description}
              </Text>
            </View>
          </View>
          <View style={styles.col}>
            <View style={styles.valign}>
              <Text style={styles.texttemp}>{showWeather.main.temp} °C</Text>
              <Text style={styles.text}>
                <Image
                  style={styles.logotemp}
                  source={require('../../img/110.png')}
                />
                {showWeather.main.temp_min} °C
              </Text>
              <Text style={styles.text}>
                <Image
                  style={styles.logotemp}
                  source={require('../../img/101.png')}
                />
                {showWeather.main.temp_max} °C
              </Text>
              <Text style={styles.text}>
                <Image
                  style={styles.logotemp}
                  source={require('../../img/50d.png')}
                />
                {showWeather.wind.speed} km/h
              </Text>
              <Text style={styles.text}>
                <Image
                  style={styles.logotemp}
                  source={require('../../img/50n.png')}
                />
                {showWeather.main.humidity}%
              </Text>
            </View>
          </View>
        </View>
        <Days />
      </ImageBackground>
    </View>
  );
}

export default Accueil;
