import * as React from "react"
import {View, Text, StyleSheet} from "react-native"
import moment from 'moment'

interface IUserEntry {
    details: any
}

const UserEntry = (props: IUserEntry) => {
    const {details} = props
    const isDebit = details.type === "DEBIT"
    const date = moment(details.created_at).format("DD-MM-YYYY")
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.inline}>
                    <Text style={styles.header}>{details.name}</Text>
                    <Text style={styles.date}>{date}</Text>
                </View>
                <Text style={styles.subHeader}>{details.description || ""}</Text>
            </View>
            <View>
                <Text style={isDebit ? styles.debitAmount : styles.creditAmount}>{`₹ ${details.amount}`}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    inline: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    header: {
        color: '#DEF1F8',
        fontSize: 14
    },
    subHeader: {
        color: '#DEF1F8',
        opacity: 0.8,
        fontSize: 10
    },
    debitAmount: {
        color: '#FE6D73',
        fontSize: 12
    },
    creditAmount: {
        color: '#8BC795',
        fontSize: 12
    },
    date: {
        fontSize: 10,
        paddingLeft: 10,
        color: '#DEF1F8'
    }
})

export default UserEntry