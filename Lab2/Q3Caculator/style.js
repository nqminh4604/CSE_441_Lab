import { StyleSheet } from 'react-native';
export default styles = StyleSheet.create({

    displayValue: {
        fontSize: 50,
        textAlign: "center",
        height: 70,
    },
    container: {
        flex: 1,
        backgroundColor: "#F2F2F2",
        alignItems: "center",
        padding: 8,
    },
    display: {
        width: "100%",
        paddingTop: 275,
    },
    numberButton: {
        width: 70,
        height: 65,
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        margin: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    operatorButton: {
        width: 70,
        height: 65,
        backgroundColor: "#F3F3F3",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        margin: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    numberText: {
        fontSize: 30,
    },
    operatorText: {
        fontSize: 30,
        color: "orange",
    },
    normalRow: {
        flex: 4,
        width: 320,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    numberZero: {
        width: 175,
        height: 65,
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        margin: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    equalButton: {
        width: 40,
        height: 65,
        backgroundColor: "orange",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        margin: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    equal: {
        color: "#FFF",
        fontSize: 30,
    },
    clearButton: {
        width: "100%",
        height: 65,
        backgroundColor: "#F3F3F3",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        margin: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    clearView: {
        width: 315,
    }
},
);