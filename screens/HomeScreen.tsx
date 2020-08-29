import * as React from "react"
import { StyleSheet, TextInput, Button, View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { AuthContext } from "../context/authContext";
import { isEmpty as _isEmpty } from "lodash";
import { FETCH_USER_ENTRIES_URL } from "../appConstants";
import { fetchHelper } from "../utils";

const HomeScreen = () => {
    const {user, auth} = React.useContext(AuthContext)
    const [isAppLoading, setIsAppLoading] = React.useState<boolean>(true)
    const [entries, setEntries] = React.useState<Array<Object>>([])

    // cmd
    React.useEffect(() => {
        const fetchUserEntries = async () => {
            const {data} = await fetchHelper(FETCH_USER_ENTRIES_URL, {
                method: 'GET',
                queryParams: {
                    userId: user.id
                }
            })
            setIsAppLoading(false)
            console.log({userEntriesData: data})
            setEntries(data)
        }

        fetchUserEntries()
    }, [])

    return (
        <View style={styles.container}>
            {/* <Text style={styles.logout} onPress={auth.logout}>Logout</Text> */}
            <View style={styles.header}>
                <Text>
                    {`Welcome ${user.name}`}
                </Text>
            </View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            {isAppLoading && <Text>{"Loading Entries..."}</Text>}
            {!isAppLoading && <View>
                {
                    !_isEmpty(entries)
                        ? entries.map((userEntry: any) => {
                            return <View></View>
                        })
                        : <Text>{"No Entries yet!"}</Text>
                }
            </View>}
            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#227C9D'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 4,
        backgroundColor: '#DEF1F8',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    logout: {
        paddingTop: 30
    }
})

export default HomeScreen