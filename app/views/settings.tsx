import { View, Text } from '@/app/components/Themed';
import React from 'react';
import { StyleSheet } from 'react-native';

type SettingsProps = {};
const Settings: React.FunctionComponent<SettingsProps> = () => {

  return (
    <>
      <View style={styles.view}>
        <Text style={styles.text} >
          Settings
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

export default Settings;
