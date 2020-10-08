import * as React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../context/authContext';

interface ILoginDetails {
    email: string,
    password: string
  }

export const LoginScreen = () => {
    const {auth: {login}} = React.useContext(AuthContext)
    const [loginDetails, setLoginDetails] = React.useState<ILoginDetails>({email: "", password: ""})
  
    const handleInputChange = (val: string, type: "email" | "password") => {
      setLoginDetails((inputDetails: ILoginDetails) => ({...inputDetails, [type]: val}))
    }
  
    return (
      <View style={styles.loginContainer}>
        <LinearGradient
          colors={["#DEF1F8", "#2995BC", "#195C74"]}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: "100%",
            width: "100%"
          }} />
          <View style={{
            flex: 1,
            justifyContent: 'flex-end',
            paddingLeft: 20,
            paddingRight: 20,
            marginBottom: 20
            // alignItems: 'center',
          }}>
            <View style={{marginBottom: 20}}>
              <Text style={{color: "white", fontSize: 12}}>{"Email"}</Text>
              <TextInput
                value={loginDetails.email}
                onChangeText={text => handleInputChange(text, "email")}
                style={styles.inputField}
              />
            </View>
            <View style={{marginBottom: 20}}>
              <Text style={{color: "white", fontSize: 12}}>{"Password"}</Text>
              <TextInput
                value={loginDetails.password}
                onChangeText={text => handleInputChange(text, "password")}
                secureTextEntry={true}
                style={styles.inputField}
              />
            </View>
            <TouchableOpacity
              onPress={() => {login(loginDetails.email, loginDetails.password)}}
              style={{
                width: "100%",
                padding: 10,
                backgroundColor: "#FFCB77",
                borderRadius: 50,
                alignItems: "center"
              }}
            >
              <Text style={{color: "white"}}>{"Login"}</Text>
            </TouchableOpacity>
          </View>
      </View>
    )
  }

  const styles = StyleSheet.create({
    loginContainer: {
      width: "100%",
      height: "100%"
    },
    inputField: {
        borderBottomColor: "white",
        height: 40,
        width: "100%",
        borderBottomWidth: 0.3,
        fontSize: 12,
        color: "white"
    }
  });