import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import {Icon} from 'react-native-elements';

function Menu() {
  return (
    <View style={styles.content}>
      <View style={styles.box}>
        <Icon
          name="arrow-long-right"
          size={40}
          color="white"
          type="entypo"
          style={styles.iconReload}
        />
      </View>
      <View style={styles.box1}>
        <Text style={styles.text}>Ma Météo Gratuite</Text>
      </View>
    </View>
  );
}

export default Menu;
