import * as React from "react"
import {View, Text, FlatList, TouchableOpacity} from "react-native"
import { fetchHelper } from "../utils"
import { FETCH_USER_ENTRIES_URL } from "../appConstants"
import UserEntry from "../components/UserEntry"
import { AntDesign } from "@expo/vector-icons"

const OtherUserDetailsScreen = ({route}) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [entries, setEntries] = React.useState([])

    React.useEffect(() => {
        const {userId} = route
        const fetchDetails = async () => {
            setIsLoading(true)
            const {data} = await fetchHelper(FETCH_USER_ENTRIES_URL, {
                method: 'GET',
                queryParams: {
                    userId
                }
            })
            setIsLoading(false)
            setEntries(data)
        }
        fetchDetails()
    }, [])

    return (
        <View>
            {isLoading && <Text>{"Loading Entries..."}</Text>}
            {!isLoading && <View>
                    {
                        <FlatList 
                            ItemSeparatorComponent={() =>
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
                            keyExtractor={(item: any, index: number) => `${item.name}-${index}`}
                            renderItem={({item, index, separators}) => (
                            <TouchableOpacity
                                activeOpacity={0.8}
                            >
                                <UserEntry details={item} />
                            </TouchableOpacity>)}
                        />
                    }
                </View>}
        </View>
    )
}

export default OtherUserDetailsScreen