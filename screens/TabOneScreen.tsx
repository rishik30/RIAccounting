import * as React from 'react';
import { StyleSheet, TextInput, Button } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
// import { TextInput } from 'react-native-gesture-handler';

const TestComp = () => {
    const [text, setText] = React.useState(null)
    React.useEffect(() => {
        fetch(`http://192.168.1.103:3000/testGet`)
        .then(res => res.json())
        .then(text => setText(text.text))
        .catch(console.log)
    }, [])
    return (
        <View>
            <Text>{text||"Good you came"}</Text>
        </View>
    )
}

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <TestComp />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    height: "100%"
  }
});
