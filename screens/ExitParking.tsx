import { FlatList, Text, View, TouchableOpacity, Button, TextInput } from 'react-native';
import React, { useContext, useEffect, useMemo } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../context';
import moment from "moment";

const ExitParking = (props:any) => {
    const { dispatch } = useContext(AppContext)
    const navigation: any = useNavigation()
    const parkingDetail = props?.route?.params
const hourDiff = moment().diff(moment(parkingDetail?.entryDateTime, 'hours'))
const amount=useMemo(()=>{
    let h = hourDiff

    if(h>2){
        let eh = h-2
        return (eh*10)+10
    }else{
        return 10
    }
},[hourDiff])

    return (
        <View style={{flex:1, padding:20, alignItems:'center'}}
        
        testID='deregister-car-registration'>
<Text style={{marginVertical:20}}>
    Parking lot: {parkingDetail?.id}
</Text>
<Text style={{marginVertical:20}}>
    Vehicle Registration Number: {parkingDetail?.vehicle}
</Text>
<Text style={{marginVertical:20}}>
    Parking Start Time: {moment(parkingDetail?.entryDateTime).format("DD MMM YY, LTS")}
</Text>
<Text style={{marginVertical:20}}>
    Parking End Time: {moment().format("DD MMM YY, LTS")}
</Text>
<Text style={{alignSelf:'center',fontSize:22,marginVertical:20}}>
    Final parking amount: ${amount}
</Text>
<View style={{width:"65%",alignSelf:'center',height:200, marginVertical:20}}>

                <Button title='Payment'                    
                testID='paymentBtn'
                    onPress={() => {
                        dispatch("REMOVE_PARKING",{id:parkingDetail?.id,charges:amount})
                        navigation.navigate("AlotParking")
                    }}
                    />
                    </View>
           


        </View>
    );
}

export default ExitParking;
