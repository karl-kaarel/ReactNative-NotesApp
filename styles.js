import {StyleSheet} from 'react-native'
export default StyleSheet.create({
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
        iconContainerAdd: {
            paddingVertical: 6,
            paddingHorizontal: 10,
            borderRadius: 5,
            elevation: 4,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#000",
            overflow: "hidden"
        },
    
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
        inputContainerAdd: {
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 16,
            paddingHorizontal: 8,
            borderRadius: 8,
            elevation: 4,
            backgroundColor: "#fff",
            overflow: "hidden",
            // marginBottom: 20,
            borderColor: "red"
        },
        input: {
            width: "90%",
            fontSize: 14,
            marginHorizontal: 6,
            color: "grey"
        },
        formContainer: {
            width: "100%",
            marginVertical: 40
        },
        btn: {
            backgroundColor: "#00887e",
            paddingVertical: 15,
            alignItems: "center", justifyContent: "center", borderRadius: 8,
        },
        colorBox: {
            height: 50, width: 50, marginHorizontal: 5, borderRadius: 4,
            overflow: "hidden",
            borderColor: "grey"
        }, error: {
            fontSize: 12,
            fontFamily: "Poppins",
            color: "red"
        }
    })
