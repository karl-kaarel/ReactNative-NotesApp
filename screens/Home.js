import React, { useEffect, useState } from 'react'
import { Text, View, Pressable, TextInput, FlatList, useColorScheme,Switch } from 'react-native'
import { useIsFocused } from "@react-navigation/native"
import Icon from "react-native-vector-icons/Ionicons"
import Note from '../components/Note'
import { fetchNotes } from '../db/db'
import App from '../App'
import { isDarkMode } from '../App'
import styles from '../styles'
const Home = ({ navigation }) => {  
    
    const [notes, setNotes] = useState([])
    const [text, setText] = useState("")
    const isFocused = useIsFocused();
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(text.toLowerCase()) || note.description.toLowerCase().includes(text.toLowerCase()))
    const [isDark, setIsDark] =useState(isDarkMode);
    global.isDark = isDark;

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

