import { Text, View, Alert, Button, TextInput } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../context';

export const getLots = (numberOfSlots?: any, dispatch?: any) => {
    let res: any = []
    for (let index = 1; index <= parseInt(numberOfSlots, 10); index++) {
        res.push({ id: `P${index}`, vehicle: null, entryDateTime: null })
    }
    if (dispatch) {
        dispatch("SET_LOTS", { lots: res })
    }
}

const ParkingHome = () => {
    const { numberOfSlots, dispatch } = useContext(AppContext)
    const navigation: any = useNavigation()
    return (
        <View>
            <Text style={{ fontSize: 20, alignItems: 'center', margin: 50, textAlign: 'center' }}>
                Enter the number of parking lots you want to create
            </Text>
            <TextInput style={{
                height: 40,
                margin: 12,
                borderWidth: 1,
                padding: 10,
                width: 200,
                alignSelf: 'center'
            }}
                maxLength={3}
                keyboardType='number-pad'
                testID="parking-create-text-input"
                placeholder='Number of parking lot'
                value={numberOfSlots}
                onChangeText={(text) => dispatch("ADD_SLOTS", { slots: text })}
            />
            <View style={{ alignSelf: 'center', height: 200, width: 100, marginTop: 50 }}>
                <Button title='Submit'
                    disabled={!numberOfSlots}
                    testID='paring-create-submit-button'
                    onPress={() => {
                        if (numberOfSlots != 0) {
                            getLots(numberOfSlots, dispatch)
                            navigation.navigate('AlotParking')
                        } else {
                            Alert.alert('Please enter a valid number')
                        }
                    }}
                />
            </View>
        </View>
    );
}

export default ParkingHome;
