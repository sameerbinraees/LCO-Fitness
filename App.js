import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Animated, Button, TextInput } from 'react-native';
import Constants from 'expo-constants';
import Test from './Test'

import RNAudioStreamer from 'react-native-audio-streamer';

RNAudioStreamer.setUrl('http://lacavewebradio.chickenkiller.com:8000/stream.mp3')
RNAudioStreamer.play()
RNAudioStreamer.pause()
RNAudioStreamer.seekToTime(16) //seconds
RNAudioStreamer.duration((err, duration) => {
  if (!err) console.log(duration) //seconds
})
RNAudioStreamer.currentTime((err, currentTime) => {
  if (!err) console.log(currentTime) //seconds
})

// Player Status:
// - PLAYING
// - PAUSED
// - STOPPED
// - FINISHED
// - BUFFERING
// - ERROR
RNAudioStreamer.status((err, status) => {
  if (!err) console.log(status)
})


export default function App() {

  //const [exerciseNumber, setExerciseNumber] = useState(0);
  //const [totalTime, setTotalTime] = useState(0);
  //const [elapsedTime, setElapsedTime] = useState(0);
  const [numberOfExercise, setNumberOfExercise] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [numberOfSets, setNumberOfSets] = useState(0);
  const [selected, setSelectedArray] = useState([]);
  const [changeState, setChangeState] = useState(false);
  const [Break, setBreak] = useState(false);
  const [exName, setExName] = useState("")
  const [pressed, setPressed] = useState(false)
  const [exCompleted, setExCompleted] = useState(false)

  let remaining_time, elapsed_time = 0, total_time, exercise_number = 0, num = 0
  //let minutes, seconds
  let selectedEx = []
  const BREAK_DURATION = 40
  let time
  let ex = 0

  useEffect(() => {
    selectExercises()
  }, [])

  function selectExercises() {
    //setSelectedArray([])
    let list = [{ Name: "Planks", Duration: 1 }, { Name: "Pushups", Duration: 2 },
    { Name: "Squats", Duration: 3 }, { Name: "Situps", Duration: 4 }, { Name: "Lunges", Duration: 5 },
    { Name: "Mountain Climbers", Duration: 6 }, { Name: "Benchpress", Duration: 7 },
    { Name: "Crunches", Duration: 8 }, { Name: "Pullups", Duration: 9 }]
    for (var i = 0; i < 5; ++i) {
      let j = (Math.floor(Math.random() * Math.floor(list.length)))
      selectedEx.push(list[j])
      list.splice(j, 1)
    }
    setSelectedArray([...selectedEx])
    setChangeState(!changeState)

  }


  function startTime() {
    if (exercise_number <= 4) {
      console.log(selected[Math.floor(num / numberOfSets)].Name)
      setExName(selected[exercise_number].Name)
      setBreak(false)
      console.log(num, numberOfSets, numberOfExercise)
      total_time = selected[exercise_number].Duration
      elapsed_time = elapsed_time + 1
      remaining_time = total_time - elapsed_time
      setMinutes(Math.floor(remaining_time / 60))
      setSeconds(remaining_time - minutes * 60)
      if (remaining_time >= 0) { }
      //console.log(minutes, seconds)
      else {
        num = num + 1
        console.log("Wait 40 secs")
        clearInterval(time)
        handleBreak()

      }
    } else {
      setExCompleted(true)
    }
  }

  function handleBreak() {
    setBreak(true)
    //console.log((num % numberOfSets))
    if ((num % numberOfSets) == 0) {
      //console.log("Inside");
      setNumberOfExercise(Math.floor(num / numberOfSets));
      exercise_number = Math.floor(num / numberOfSets)

    }
    setTimeout(() => {
      //setTotalTime(5)
      elapsed_time = 0
      time = setInterval(startTime, 1000);
    }, 4000);
  }

  function startExercise() {

    time = setInterval(startTime, 1000);
  }

  function convertSecToMin(t) {
    let m = Math.floor(t / 60);

    return (m)
  }



  return (
    <View style={styles.container}>

      {selected.map((item, key) => { return <Text key={key}>{item.Name} : {convertSecToMin(item.Duration)} min</Text> })}

      <TextInput
        style={{
          width: 250,
          backgroundColor: '#dde8c9',
          padding: 16,
        }}
        placeholder="Enter Number of Sets"
        placeholderTextColor="#60605e"
        maxLength={1}
        onChangeText={(text) => setNumberOfSets(text)}
        keyboardType={'numeric'}
      />

      <Button
        title="To phir start karen? Dabao Mujhay!"
        disabled={pressed}
        onPress={() => {
          startExercise()
          setPressed(true)
        }}
      />

      {Break ? <Text>Enjoy Break</Text> : <Text>{minutes}:{seconds}</Text>}

      <Text>{numberOfExercise}</Text>

      {!Break ? <Text>{exName}</Text> : <Text></Text>}

      <Button
        title="Continue"
        disabled={!Break}
        onPress={() => {
          startExercise()
          setPressed(true)
        }}
      />

      {exCompleted ? <Text>Congo jani!</Text> : <Text></Text>}



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
