import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Pressable, TextInput, FlatList, useColorScheme,Switch } from 'react-native'
import { useIsFocused } from "@react-navigation/native"
import Icon from "react-native-vector-icons/Ionicons"
import Note from '../components/Note'
import { fetchNotes } from '../db/db'
import App from '../App'
import { isDarkMode } from '../App'

const Home = ({ navigation }) => {   
    
    const [notes, setNotes] = useState([])
    const [text, setText] = useState("")
    const isFocused = useIsFocused();
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(text.toLowerCase()) || note.description.toLowerCase().includes(text.toLowerCase()))
    const [isDark, setIsDark] =useState(isDarkMode);
    useEffect(async () => {
        const { rows } = await fetchNotes()
        setNotes(rows._array)
    }, [isFocused])
    return (
        <View style={styles.container(isDark )}>
            {/* Notes title */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontSize: 25, color: isDark ? 'white':'black',fontFamily: "Semibold" }}>Notes</Text>
                    <Switch value={isDark} onValueChange={(val)=>setIsDark(val)}  />
            </View>

            {/* search box */}
            <View style={styles.inputContainer}>
                <Icon name='search-outline' size={25} color={"gray"} />
                <TextInput value={text} onChangeText={(e) => setText(e)} style={styles.input} placeholder='Search Your Notes' />
            </View>

            {/* notes view */}
            <FlatList showsVerticalScrollIndicator={false} data={filteredNotes} renderItem={({ item }) => (
                <Note note={item} navigation={navigation} />
                
            )} />

            {/* add new note button */}
            <Pressable style={styles.iconPosition} onPress={() => navigation.navigate("AddNote")}> 
                <View style={styles.iconContainer(isDark)}>
                    <Icon name='add' size={50} color={isDark ? 'black':'white'} />
                </View>
            </Pressable>
        </View>
    )
}

export default Home
const styles = StyleSheet.create({   
    container: isDark => ({
        flex: 1,
        paddingTop: 60,
        backgroundColor: isDark ? 'black':'white',
        color: isDark ? 'white':'black',
        paddingHorizontal: 20,
    }),

    iconContainer:isDark=> ({
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isDark ? 'white':'black',
        overflow: "hidden",
    }),
    iconPosition: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        right: 7,
        bottom: 120
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,
        padding: 10,
        borderRadius: 8,
        elevation: 2,
        backgroundColor: "#fff"
    },
    input: {
        width: "90%",
        fontSize: 14,
        marginHorizontal: 6,
        color: "grey"
    },
})

