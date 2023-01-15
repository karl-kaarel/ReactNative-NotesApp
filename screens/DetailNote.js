import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, TextInput, View, Pressable, TouchableOpacity } from 'react-native'
import Toast from "react-native-toast-message"
import Icon from "react-native-vector-icons/Ionicons"
import Delete from "react-native-vector-icons/AntDesign"
import { deleteNote } from '../db/db'
import { updateNote } from '../db/db'
import { colors } from '../data'

const DetailNote = ({ route, navigation }) => {
    const note = route.params

    const [selectedIndex, setSelectedIndex] = useState(0)
    const [title, setTitle] = useState(note.title)
    const [description, setDescription] = useState(note.description)
    const [color, setColor] = useState(note.color)

    const deleteNoteHandler = async () => {
        const noteResult = await deleteNote(note.id)
        if (noteResult.rowsAffected > 0) {
            Toast.show({
                type: "success",
                text1: "Note has been deleted"
            })
            setTimeout(() => {

                navigation.goBack()
            }, 2000);
        }
    }
    const updateNoteHandler = async () => {
        console.log("updated")
        const ifData = await updateNote(note.id, title, description, color)
        Toast.show({
            type: "success",
            text1: "Your note has been updated 👋"
        })
        setTimeout(() => {
            navigation.goBack()
        }, 2000);
    }

    return (
        <View style={styles.container(!isDark)}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                
                {/* Back button */}
                <Pressable onPress={() => navigation.navigate("Home")}>
                    <View style={styles.iconContainer}>
                        <Icon name='arrow-back' size={24} color={"#fff"} />
                    </View>
                </Pressable>
                
                {/* Delete button */}
                <Pressable onPress={deleteNoteHandler}>
                    <View style={{ ...styles.iconContainer, backgroundColor: "#fff" }}>
                        <Delete name='delete' size={24} color={"red"} />
                    </View>
                </Pressable>
                
            </View>
            <View style={{ marginTop: 20, }}>
                <View  >
                    <Text style={{ fontFamily: "Semibold", fontSize: 12 }}>Note Title</Text>
                    <Text style={{ fontSize: 20, fontFamily: "Poppins" }}>{note.title}</Text>
                </View>
                <View style={{ marginVertical: 20 }} >
                    <Text style={{ fontFamily: "Semibold", fontSize: 12 }}>Note Description</Text>
                    <Text style={{ fontSize: 16, fontFamily: "Poppins" }}>{note.description}</Text>
                </View>
                <View  >
                    <Text style={{ fontFamily: "Semibold", fontSize: 12 }}>Note Background Color</Text>
                    <View style={{ ...styles.noteBackground, backgroundColor: note.color }} />

                {/* Choose color */}
                <View style={{ flexDirection: "row", alignContent: 'center', justifyContent: 'center'}}>
                    {colors.map((col, index) => (
                        <TouchableOpacity key={index} onPress={() => { setSelectedIndex(index); setColor(col.color) }} >
                            <View key={col.id} style={{ ...styles.colorBox, backgroundColor: col.color, borderWidth: index === selectedIndex ? 2 : 0 }} />
                        </TouchableOpacity>
                    )
                    )}
                </View>

                {/* Upload button */}
                <TouchableOpacity style={styles.btn} onPress={updateNoteHandler}>
                    <Text style={{ color: "#fff", fontSize: 16 }}>Update</Text>
                </TouchableOpacity>
            </View>
            <Toast />
        </View>
    )
}

export default DetailNote

const styles = StyleSheet.create({
    container: isDark=>( {
        flex: 1,
        paddingTop: 60,
        backgroundColor: isDark ? 'white':'black',
        paddingHorizontal: 20,
    }),
    iconContainer: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 5,
        elevation: 4,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        overflow: "hidden"
    },

    noteBackground: {
        backgroundColor: "#FDA3B8",

        height: 120,

        elevation: 6,
        borderRadius: 5,

        overflow: "hidden"

    },
    btn: {
        marginTop:20,
        backgroundColor: "#00887e",
        paddingVertical: 15,
        alignItems: "center", justifyContent: "center", borderRadius: 8,
    },
    colorBox: {
        height: 50, width: 50, marginHorizontal: 5, borderRadius: 4,
        overflow: "hidden",
        borderColor: "grey"
    }
})
