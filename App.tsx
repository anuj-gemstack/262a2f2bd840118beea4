import { StyleSheet, Text, View, Alert, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import { AppContext } from './context';
import ParkingHome from './screens/ParkingHome';
import AlotParking from './screens/AlotParking';
import AllocateParking from './screens/AllocateParking';
import ExitParking from './screens/ExitParking';

const Stack: any = createNativeStackNavigator()

interface INumberOfSlots {
  numberOfSlots: number
}

const App = () => {
  const [numberOfSlots, setNumberOfSlots] = useState<any>("")
  const [lots, setLots] = useState<any>([])
  const [registraionNumber, setRegistraionNumber] = useState<any>(null)
  const [date, setDate] = useState<any>(new Date())
  const [show, setShow] = useState<any>(false)
  const [api, setApi] = useState<any>({ isLoading: true, data: {} })

  const onChange = (selectedDate: any) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS == "ios")
    setDate(currentDate)
  }

  const alotParking = () => {
    let ap = lots?.filter((i: any) => !i.vehicle)

    if (ap?.length) {
      let ri = Math.floor(Math.random() * ap.length)
      let p: any = ap[ri]
      let pl: any = [...lots]
      let index = pl.findIndex((i: any) => i?.id == p?.id)
      pl[index] = { ...p, vehicle: registraionNumber, entryDateTime: date }
      setLots(pl)
      setRegistraionNumber("")
    } else {
      Alert.alert("", "No parking available")
    }
  }

  const exitParking = async (id: string, charges: any) => {
    let pl: any = [...lots]
    let index = pl.findIndex((i: any) => i?.id == id)

    const url = "https://httpstat.us/200"
    const payload = {
      'car-registration': `${pl[index].vehicle}`,
      'charge': charges
    }
    try {
      const res = await axios.post(url, payload, {})
      if (res?.status == 200) {
        pl[index] = { ...pl[index], vehicle: null, entryDateTime: null }
        setLots(pl)
      } else {
        Alert.alert("Something went wrong")
      }
    } catch (error) {
      setApi({
        isLoading: false
      })
    }
  }

  const dispatch = (actionType: any, payload: any) => {
    switch (actionType) {
      case "ADD_SLOTS":
        setNumberOfSlots(payload.slots)
        return;
      case "SET_LOTS":
        setLots(payload.lots)
        return;
      case "SET_DATE":
        setDate(payload.date)
        return;
      case "SET_REGISTRATION":
        setRegistraionNumber(payload.registraionNumber)
        return;
      case "ON_DATE_CHANGE":
        onChange(payload.selectedDate)
        return;
      case "OPEN_TIME_PICKER":
        setShow(payload.show)
        return;
      case "ALOT_PARKING":
        alotParking()
        return;
      case "REMOVE_PARKING":
        exitParking(payload.id, payload.charges)
        return;

      default:
        return;
    }
  }

  return (
    <AppContext.Provider value={{ onChange, show, registraionNumber, date, lots, numberOfSlots, dispatch }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ParkingHome">
          <Stack.Screen name="ParkingHome">
            {(props: any) => <ParkingHome />}
          </Stack.Screen>
          <Stack.Screen name="AlotParking">
            {(props: any) => <AlotParking />}
          </Stack.Screen>
          <Stack.Screen name="AllocateParking">
            {(props: any) => <AllocateParking />}
          </Stack.Screen>
          <Stack.Screen name="ExitParking">
            {(props: any) => <ExitParking {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

export default App;