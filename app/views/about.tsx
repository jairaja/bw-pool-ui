import { View, Text } from '@/app/components/Themed';
import React from 'react';
import { StyleSheet } from 'react-native';

type AboutProps = {};
const About: React.FunctionComponent<AboutProps> = () => {

  return (
    <>
      <View style={styles.view}>
        <Text style={styles.text} >
          About screen
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: 10,
  },
  text: {
    textAlign: 'center',
    padding: 5,
  },
  more: {
    marginVertical: 20,
  },
  button: {
    width: 120,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default About;
