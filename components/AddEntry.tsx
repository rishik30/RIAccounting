import * as React from "react"
import {View, StyleSheet, Modal, Text, Image, TouchableOpacity} from "react-native"
import * as Animatable from 'react-native-animatable';
import { pallete } from "../constants/Colors"
import EntryFormMoal, { IEntryFormModalProps } from "./modal/EntryFormModal";
import { ENTRY_TYPE_ENUM } from "../appConstants";

interface IAddEntryProps {

}

const AddEntry = (props: IAddEntryProps) => {
    const [addIconClicked, setAddIconClicked] = React.useState<boolean>(false)
    const [saveEntryModalProps, setSaveEntryModalProps] = React.useState<IEntryFormModalProps>({
        open: false,
        entryType: ENTRY_TYPE_ENUM.CREDIT
    })

    const handleAddPress = () => {
        setAddIconClicked((val) => !val)
    }

    const handleAddEntryOptionPress = (type: ENTRY_TYPE_ENUM) => {
        setSaveEntryModalProps({entryType: type, open: true})
    }

    const closeAddEntryModal = () => {
        setSaveEntryModalProps({entryType: ENTRY_TYPE_ENUM.CREDIT, open: false})
    }

    return (
        <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
                {addIconClicked &&
                    <Animatable.View
                        animation={'slideInUp'}
                        duration={500}
                        style={styles.addContainer}
                    >
                        <TouchableOpacity
                            style={styles.entryOptions}
                            onPress={() => handleAddEntryOptionPress(ENTRY_TYPE_ENUM.CREDIT)}
                        >
                            <Text style={styles.creditOption}>{"Credit"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.entryOptions}
                            onPress={() => handleAddEntryOptionPress(ENTRY_TYPE_ENUM.DEBIT)}
                        >
                            <Text style={styles.debitOption}>{"Debit"}</Text>
                        </TouchableOpacity>
                    </Animatable.View>
                }
                <TouchableOpacity
                    style={styles.addBtn}
                    activeOpacity={0.9}
                    onPress={handleAddPress}
                >
                    <Image 
                        source={require("../assets/images/plus.png")}
                        resizeMode={'center'}
                        style={styles.addIcon}
                    />
                </TouchableOpacity>
            </View>
            <EntryFormMoal
                {...saveEntryModalProps}
                closeModal={closeAddEntryModal}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: -25
    },
    addBtn: {
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: pallete.yellow,
        shadowColor: "#FFF",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addIcon: {
        width: 20,
        height: 20
    },
    addContainer: {
        width: 100,
        height: 90,
        borderRadius: 10,
        backgroundColor: '#FFF',
        elevation: 6,
    },
    entryOptions: {
        width: '100%',
        height: 30,
        marginTop: 10,
        // marginBottom: 10,
        borderBottomColor: pallete.orange,
        borderBottomWidth: 1
    },
    creditOption: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: pallete.green,
        textTransform: 'uppercase',
    },
    debitOption: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: pallete.red,
        textTransform: 'uppercase',
    }
})

export default AddEntry