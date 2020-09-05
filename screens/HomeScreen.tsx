import * as React from "react"
import { StyleSheet, Modal, TouchableOpacity, View, Text, FlatList, Platform } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { AuthContext } from "../context/authContext";
import { isEmpty as _isEmpty } from "lodash";
import { FETCH_USER_ENTRIES_URL, FETCH_ALL_USERS_URL } from "../appConstants";
import { fetchHelper } from "../utils";
import UserEntry from "../components/UserEntry";
import AddEntry from "../components/AddEntry";

const HomeScreen = () => {
    const {user, auth} = React.useContext(AuthContext)
    const [isAppLoading, setIsAppLoading] = React.useState<boolean>(true)
    const [entries, setEntries] = React.useState<Array<any>>([])
    const [refresh, setRefresh] = React.useState<boolean>(false)
    const [openModal, setOpenModal] = React.useState<boolean>(false)
    const [users, setUsers] = React.useState<Array<any>>([])

    const fetchUserEntries = async () => {
        const {data} = await fetchHelper(FETCH_USER_ENTRIES_URL, {
            method: 'GET',
            queryParams: {
                userId: user.id
            }
        })
        setIsAppLoading(false)
        // console.log({userEntriesData: data})
        setEntries(data)
    }
    
    const fetchAllUsers = async () => {
        try {
            const {data} = await fetchHelper(FETCH_ALL_USERS_URL, {
                method: 'GET'
            })
            setUsers(data)
        } catch (error) {
            
        }
    }

    // cmd
    React.useEffect(() => {
        fetchUserEntries()
        fetchAllUsers()
    }, [])

    const handleRefresh = async () => {
        setRefresh(true)
        await fetchUserEntries()
        setRefresh(false)
    }

    const handleItemLongPress = () => {
        setOpenModal(true)
    }

    const hasEntries = !_isEmpty(entries)
    return (
        <View style={styles.container}>
            {/* <Text style={styles.logout} onPress={auth.logout}>Logout</Text> */}
            <View style={styles.header}>
                <Text>
                    {`Welcome ${user.name}`}
                </Text>
                <Text>
                    {hasEntries && `Balance ${entries[0].balance}`}
                </Text>
            </View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                {isAppLoading && <Text>{"Loading Entries..."}</Text>}
                {!isAppLoading && <View>
                    {
                        <FlatList 
                            ItemSeparatorComponent={() =>
                                // Platform.OS !== 'android' &&
                                // (({ highlighted }) => (
                                <View
                                    style={{
                                        width: '100%',
                                        height: 0.5,
                                        backgroundColor: '#f7fcfe',
                                        opacity: 0.5
                                    }}
                                />
                                // ))
                            }
                            ListEmptyComponent={() => <Text>{"No Entries yet!"}</Text>}
                            showsHorizontalScrollIndicator={false}
                            data={entries}
                            refreshing={refresh}
                            onRefresh={handleRefresh}
                            keyExtractor={(item: any, index: number) => `${item.name}-${index}`}
                            renderItem={({item, index, separators}) => (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onLongPress={handleItemLongPress}
                            >
                                <UserEntry details={item} />
                            </TouchableOpacity>)}
                        />
                    }
                </View>}
                <Modal
                    visible={openModal}
                    transparent={false}
                    animationType={"slide"}
                >
                    <Text>{"Modal HERE"}</Text>
                    <TouchableOpacity
                        style={{ backgroundColor: "#2196F3" }}
                        onPress={() => {
                            setOpenModal(false);
                        }}
                        >
                        <Text>Hide Modal</Text>
                    </TouchableOpacity>
                </Modal>
                <AddEntry users={users} />
            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#DEF1F8'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 5,
        backgroundColor: '#113D4D',
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