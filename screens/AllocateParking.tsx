import { FlatList, Text, View, TouchableOpacity, Button, TextInput } from 'react-native';
import React, { useContext, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../context';
import moment from "moment";

const AllocateParking = () => {
    const { dispatch,registrationNumber, date,show,onChange } = useContext(AppContext)
    const navigation: any = useNavigation()

    useEffect(()=>{
        dispatch("SET_DATE",{date:new Date()})
        dispatch("SET_REGISTRATION",{registrationNumber:""})
    },[])

    return (
        <View>
             <TextInput style={{
                height: 50,
                margin: 12,
                marginBottom:20,
                borderWidth: 1,
                padding: 10,
                width: 250,
                alignSelf: 'center',
                marginTop:30
            }}
                maxLength={10}
                testID="parking-drawing-registration-input"
                placeholder='Enter registration number'
                value={registrationNumber}
                onChangeText={(text) => dispatch("SET_REGISTRATION", {registrationNumber:text })}
            />
 <View style={{ width: "65%", alignSelf:'center',marginBottom: 20 }}>
                <Button title='Select Parking Time'                    
                    onPress={() => {
                        dispatch("OPEN_TIME_PICKER",{show:true})
                    }}
                />
            </View>
            {show && (<DateTimePicker
            value={date}
            mode='time'
            is24Hour={false}
            display='default'
            onChange={((event:any,selectedDate:any)=>onChange((selectedDate)))}
            maximumDate={new Date()}
            />)}

<Text style={{textAlign:'center'}}>{moment(date).format('DD/MMM/YY LTS')}</Text>

<View style={{alignSelf:"center", height:200, width:"65%",marginTop:20}}>
<Button 
    testID='allocate-parking'
    title='Alot Parking'
    disabled={registrationNumber==""?true:false}
    onPress={()=>{
        dispatch("ALOT_PARKING",{})
        navigation.navigate("AlotParking")
    }}
/>
</View>

        </View>
    );
}

export default AllocateParking;
