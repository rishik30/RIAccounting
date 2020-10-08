import * as React from "react"
import {View, Text, FlatList, TouchableOpacity} from "react-native"
import { fetchHelper } from "../utils"
import { FETCH_USER_ENTRIES_URL, DEFAULT_ENTRIES_PAGE_SIZE } from "../appConstants"
import UserEntry from "../components/UserEntry"

interface IEntriesList {
    userId: number
}

const EntriesList = (props: IEntriesList) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [entries, setEntries] = React.useState([])
    const [page, setPage] = React.useState<number>(1)

    const fetchEntries = async () => {
        const {userId} = props
        setIsLoading(true)
        const {data} = await fetchHelper(FETCH_USER_ENTRIES_URL, {
            method: 'GET',
            queryParams: {
                userId,
                pageNumber: page,
                pageSize: DEFAULT_ENTRIES_PAGE_SIZE
            }
        })
        const dataToSet = page === 1
            ? data
            : [...entries, ...data]
        setEntries(dataToSet)
        setIsLoading(false)
    }

    const handleLoadMore = () => {
        setPage(page + 1)
        fetchEntries()
    }

    React.useEffect(() => {
        fetchEntries()
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
                            onEndReached={handleLoadMore}
                            onEndReachedThreshold={0.5}
                        />
                    }
                </View>}
        </View>
    )
}

export default EntriesList