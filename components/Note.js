import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const Note = ({ note, navigation }) => {
    return (
        <TouchableOpacity style={{ ...styles.note, backgroundColor: note.color }} onPress={() => navigation.navigate("DetailNote", note)} >
            <View style={{ flex: 1 }} >
                <Text style={{ color: "gray", fontSize: 22, fontFamily: "Semibold", fontWeight: "bold" }}>{note.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Note

const styles = StyleSheet.create({
    note: {
        backgroundColor: "#FDA3B8",
        margin: 5,
        marginBottom: 10,
        paddingHorizontal: 50,
        paddingVertical: 15,
        elevation: 6,
        borderRadius: 5,
        flex: 1,
        overflow: "hidden"
    }
})
