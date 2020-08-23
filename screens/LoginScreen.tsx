import * as React from 'react';
import { StyleSheet, TextInput, Button, View } from 'react-native';

interface ILoginDetails {
    email: string,
    password: string
  }

export const LoginScreen = () => {
    const [loginDetails, setLoginDetails] = React.useState<ILoginDetails>({email: "", password: ""})
  
    const handleInputChange = (val: string, type: "email" | "password") => {
      setLoginDetails((inputDetails: ILoginDetails) => ({...inputDetails, [type]: val}))
    }
  
    return (
      <View style={styles.loginContainer}>
        <TextInput
          value={loginDetails.email}
          onChangeText={text => handleInputChange(text, "email")}
          style={styles.inputField}
        />
        <TextInput
          value={loginDetails.password}
          onChangeText={text => handleInputChange(text, "password")}
          secureTextEntry={true}
          style={styles.inputField}
        />
        <Button
          title={"Login"}
          onPress={() => {}}
        />
      </View>
    )
  }

  const styles = StyleSheet.create({
    loginContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: "100%",
      height: "100%"
    },
    inputField: {
        borderColor: "black",
        height: 40,
        width: "80%",
        borderWidth: 1,
        borderRadius: 30,
        marginTop: 10,
        padding: 10
    }
  });