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
        console.log("deleted")
        const noteResult = await deleteNote(note.id)
        if (noteResult.rowsAffected > 0) {
            Toast.show({
                type: "success",
                text1: "Note has been deleted"
            })
            setTimeout(() => {

                navigation.goBack()
            }, 1500);
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
        }, 1500);
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
                    <Text style={{ fontFamily: "Semibold", fontSize: 12 ,color: isDark ? 'white':'black'}}>Note Title</Text>
                    <TextInput placeholder='Update Your Note Title' defaultValue={note.title} multiline={true} onChangeText={(e) => setTitle(e)} style={{ fontSize: 20, fontFamily: "Poppins" ,color: isDark ? 'white':'black'}}/>
                </View>
                <View style={{ marginVertical: 20 }} >
                    <Text style={{ fontFamily: "Semibold", fontSize: 12,color: isDark ? 'white':'black' }}>Note Description</Text>
                    <TextInput placeholder='Update Your Note Description' defaultValue={note.description} multiline={true} onChangeText={(e) => setDescription(e)} style={{ fontSize: 16, fontFamily: "Poppins" ,color: isDark ? 'white':'black'}}/>
                </View>
                <View  >
                    <Text style={{ fontFamily: "Semibold", fontSize: 12,color: isDark ? 'white':'black' }}>Note Background Color</Text>
                    <View style={{ ...styles.noteBackground, backgroundColor: color }} />
                </View>

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
