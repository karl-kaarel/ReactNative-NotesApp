import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, TextInput, Pressable } from 'react-native'
import Icon from "react-native-vector-icons/MaterialIcons"
import HeaderBtn from "react-native-vector-icons/Ionicons"
import Toast from 'react-native-toast-message';
import { colors } from '../data'
import { insertNotes } from '../db/db'
import styles from '../styles'
const AddNote = ({ navigation }) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [color, setColor] = useState("#FDA3B8")
    const [textValidated, setTextValidated] = useState(false)
    const [error, setError] = useState("")
    const uploadNotes = async () => {
        const textError = checkValidation(title, description, color)
        setError(textError)
        setTextValidated(true)
    }
    const checkValidation = (title, description, color) => {
        const error = {}
        if (title === "") {
            error.title = "Please  enter title"
        }
        if (description === "") {
            error.description = "Please  enter description"
        }
        if (color === "") {
            error.color = "Please  select color"
        }
        return error
    }
    useEffect(async () => {
        if (Object.keys(error).length === 0 && textValidated) {
            console.log("uploaded")
            const ifData = await insertNotes(title, description, color)
            Toast.show({
                type: "success",
                text1: "Your note has been created 👋"
            })
            setTimeout(() => {
                navigation.goBack()
            }, 1500);
        }
    }, [error, textValidated])
    return (
        <View style={styles.container(isDark)}>
            <View style={{ flexDirection: "row", alignItems: "center", }}>

                {/* Back button */}
                <Pressable onPress={() => navigation.navigate("Home")}>
                    <View style={styles.iconContainerAdd}>
                        <HeaderBtn name='arrow-back' size={24} color={"#fff"} />
                    </View>
                </Pressable>

                <Text style={{ textAlign: "center", fontFamily: "Poppins", fontSize: 18, flex: 1, color: isDark ? 'white':'black' }}>Add A New Note</Text>
            </View>


            <View style={styles.formContainer}>
                <View style={{ marginBottom: 20 }}>
                    <View style={{ ...styles.inputContainer, borderWidth: error.title ? 1 : 0 }}>
                        <Icon name='title' size={25} color={"grey"} />
                        <TextInput value={title} onChangeText={(e) => setTitle(e)} multiline={true} onKeyPress={() => setError({ ...error, title: null })} placeholder='Enter Your Note Title' style={styles.input} />
                    </View>
                    {error.title && <Text style={styles.error}>{error.title}</Text>}
                </View>
                <View style={{ marginBottom: 20 }}>

                    <View style={{ ...styles.inputContainer, borderWidth: error.description ? 1 : 0 }}>
                        <Icon name='description' size={25} color={"grey"} />
                        <TextInput value={description} onChangeText={(e) => setDescription(e)} on multiline={true} onKeyPress={() => setError({ ...error, description: null })} placeholder='Enter Your Note Description' style={styles.input} />
                    </View>
                    {error.description && <Text style={styles.error}>{error.description}</Text>}

                </View>
                <View style={{ marginVertical: 20 }}>

                    {/* Choose color */}
                    <View style={{ flexDirection: "row", }}>
                        {colors.map((col, index) => (
                            <TouchableOpacity key={index} onPress={() => { setSelectedIndex(index); setColor(col.color) }} >
                                <View key={col.id} style={{ ...styles.colorBox, backgroundColor: col.color, borderWidth: index === selectedIndex ? 2 : 0 }} />
                            </TouchableOpacity>
                        )
                    )}
                    </View>

                    {error.color && <Text style={styles.error}>{error.color}</Text>}
                </View>

                {/* Upload button */}
                <TouchableOpacity style={styles.btn} onPress={uploadNotes}>
                    <Text style={{ color: "#fff", fontSize: 16 }}>Upload</Text>
                </TouchableOpacity>
            </View>
            <Toast />
        </View>
    )
}

export default AddNote
