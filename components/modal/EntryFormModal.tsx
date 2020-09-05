import * as React from "react"
import {Modal, View, TextInput, Text, TouchableOpacity, StyleSheet, NativeSyntheticEvent, Picker} from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker';
// import {Picker} from '@react-native-community/picker';
import {isEmpty as _isEmpty} from "lodash";
import { ENTRY_TYPE_ENUM } from "../../appConstants";
import { pallete } from "../../constants/Colors";
import { AuthContext } from "../../context/authContext";
import { fetchHelper } from "../../utils";
import {FETCH_USER_ENTRIES_URL} from "../../appConstants"

export interface IEntryFormModalProps {
    open: boolean,
    entryType: ENTRY_TYPE_ENUM
    closeModal?: () => void,
    users: Array<any>
}

const EntryFormMoal = (props: IEntryFormModalProps) => {
    const {user} = React.useContext(AuthContext)

    const [date, setDate] = React.useState<Date>(new Date())
    const [amount, setAmount] = React.useState<string>("")
    const [description, setDescription] = React.useState<string>("")
    const [show, setShow] = React.useState<boolean>(false)
    const [selectedUser, setSelectedUser] = React.useState<string | number | undefined>(undefined)

    const handleOnChange = (event: Event, selectedDate: Date | undefined) => {
        setDate(selectedDate || date)
        setShow(false)
    }

    const saveEntryDetails = async () => {
        const data = {
            description,
            amount: parseFloat(amount),
            createdAt: new Date(date).getTime(),
            userId: user.id,
            meta: {
                type: props.entryType,
                mode: "CASH"
            }
        }
        try {
            await fetchHelper(FETCH_USER_ENTRIES_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {data}
            })
            props.closeModal && props.closeModal()
        } catch (error) {
            console.log({saveErro: error})            
        }
    }

    const handleAmountChange = (event: NativeSyntheticEvent<any>) => {
        try {
            setAmount(event.nativeEvent.text)
        } catch (error) {
            console.log({error})
        }
    }

    const handleDescriptionChange = (event: NativeSyntheticEvent<any>) => {
        try {
            setDescription(event.nativeEvent.text)
        } catch (error) {
            console.log({error})
        }
    }

    const handleUserSelection = (itemValue: React.ReactText, itemIndex: number) => {
        setSelectedUser(itemValue)
    }

    const constructedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`

    return (
        <Modal
            visible={props.open}
            transparent={false}
            animationType={'slide'}
        >
            <View style={styles.container}>
                <Text style={styles.header}>{`${props.entryType} Entry`}</Text>
                <TextInput
                    style={styles.textInput}
                    keyboardType={'numeric'}
                    placeholder={'Amount ₹'}
                    onChange={handleAmountChange}
                    value={amount}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder={'Description'}
                    onChange={handleDescriptionChange}
                    value={description}
                />
                <View style={styles.inline}>
                    <TouchableOpacity onPress={() => setShow(true)} activeOpacity={0.9}>
                        <Text style={styles.date}>{constructedDate}</Text>
                    </TouchableOpacity>
                    <Text style={styles.mode}>{'CASH'}</Text>
                </View>
                {show && <DateTimePicker
                    mode={'date'}
                    value={date}
                    display="default"
                    onChange={handleOnChange}
                />}
                {!_isEmpty(props.users) && <Picker
                    selectedValue={selectedUser}
                    onValueChange={handleUserSelection}
                >
                    {props.users.map((user, index) => {
                        return <Picker.Item label={user.name} value={user.id} />
                    })}
                </Picker>}
                <View style={styles.ctaContainer}>
                    <View style={styles.inline}>
                        <TouchableOpacity onPress={saveEntryDetails}>
                                <Text>{'Save'}</Text>
                            </TouchableOpacity>
                        <TouchableOpacity onPress={props.closeModal}>
                            <Text>{'Close'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#EFEFEF'
    },
    header: {
        fontSize: 20,
        textAlign: 'center'
    },
    textInput: {
        width: '100%',
        height: 40,
        borderWidth: 2,
        borderColor: pallete.yellow,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        marginBottom: 10
    },
    inline: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    date: {
        borderWidth: 2,
        borderColor: pallete.yellow,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        borderRadius: 5,
        fontSize: 12,
        textAlign: 'center'
    },
    mode: {
        paddingRight: 5,
        fontSize: 12
    },
    ctaContainer: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    save: {

    }
})

export default EntryFormMoal