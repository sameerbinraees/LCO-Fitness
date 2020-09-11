import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Animated, Button, TextInput } from 'react-native';


export default function Test() {
    const [numberOfExercise, setNumberOfExercise] = useState(0);
    let num = 0, numberOfSets = 2

    function func2() {
        console.log("Inside");

        setNumberOfExercise(numberOfExercise => numberOfExercise + 1);
    }
    function func1() {


        func2()
        //()=> setNumberOfExercise(numberOfExercise => numberOfExercise + 1);
        setTimeout(() => {
            console.log(numberOfExercise);
        }, 1000)

    }

    function func() {
        //func1()
        for (var i = 0; i <= 10; ++i) {
            setNumberOfExercise(numberOfExercise => (numberOfExercise + 1));
            console.log(numberOfExercise)

        }

        //setInterval(func1, 1000);
    }

    return (
        <View style={styles.container}>

            <Button title="DABA" onPress={func} />
            <Text>{numberOfExercise}</Text>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
