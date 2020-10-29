import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Card} from 'react-native-elements';
import images from '../../images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon} from 'react-native-elements';

const styles = StyleSheet.create({
  logo: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  card1: {
    backgroundColor: '#003366',
  },
  title: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
  },
  content: {
    flex: 3,
    margin: 10,
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#003366',
    padding: 1,
    width: 50,
    height: 'auto',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'white',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
  test: {
    flexDirection: 'row',
  },
  refresh: {
    flex: 1,
  },
  refresh1: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

function Days() {
  const [showWeather, setShowWeather] = useState({
    list: [
      {
        weather: [{}],
        main: {},
        wind: {},
      },
    ],
    city: {},
  });

  const [zipcode, setZipcode] = useState('06130');

  const getMyStringValue = async () => {
    try {
      console.log('Data successfully received');
      const data = await AsyncStorage.getItem('key');
      setZipcode(data);
      console.log(zipcode);
      getDays();
    } catch (e) {
      console.log('Failed to receive the data in the storage');
    }
  };

  const showFiveDay = showWeather.list.map((value, index) => (
    <View key={index} style={styles.body}>
      <Card containerStyle={styles.card1}>
        <View style={styles.card}>
          <Card.Title style={styles.text}>{value.dt_txt}</Card.Title>
          <Card.Divider />
          <Image style={styles.logo} source={images[value.weather[0].icon]} />
          <Text style={styles.text}>{value.weather[0].description}</Text>
          <Text style={styles.text}>Temp-min: {value.main.temp_min} °C</Text>
          <Text style={styles.text}>Temp-max: {value.main.temp_max} °C</Text>
        </View>
      </Card>
    </View>
  ));

  useEffect(() => {
    getDays();
  }, []);

  function getDays() {
    const options = {
      method: 'GET',
    };
    fetch(
      'http://api.openweathermap.org/data/2.5/forecast?zip=' +
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
    <View style={styles.content}>
      <View style={styles.test}>
        <View style={styles.refresh}>
          <TouchableOpacity style={styles.button} onPress={getMyStringValue}>
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
        <View style={styles.refresh1}>
          <Text style={styles.title}>Météo {showWeather.city.name} /5j</Text>
        </View>
      </View>
      <ScrollView horizontal={true}>{showFiveDay}</ScrollView>
    </View>
  );
}

export default Days;
