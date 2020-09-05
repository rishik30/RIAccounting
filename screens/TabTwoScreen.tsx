import * as React from 'react';
import { StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { Text, View } from '../components/Themed';
import { AuthContext } from '../context/authContext';

export default function TabTwoScreen() {
  const {users} = React.useContext(AuthContext)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Other Users</Text>
      <FlatList 
        ItemSeparatorComponent={() =>
            <View
                style={{
                    // width: '100%',
                    height: 0.5,
                    backgroundColor: '#FFCB77',
                    // opacity: 0.5,
                    marginVertical: 10
                }}
            />
        }
        ListEmptyComponent={() => <Text>{"No Users yet!"}</Text>}
        showsHorizontalScrollIndicator={false}
        data={users}
        keyExtractor={(item: any, index: number) => `${item.name}-${index}`}
        renderItem={({item, index, separators}) => (
          <View style={styles.separator}>
          <TouchableOpacity style={styles.userContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <AntDesign size={24} name="right" />
          </TouchableOpacity>
        </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 30,
    paddingHorizontal: 20
  },
  separator: {
    // marginVertical: 30,
    // height: 1,
    // width: '80%',
  },
  userContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  name: {
    color: "black",
    fontSize: 16
  }
});
