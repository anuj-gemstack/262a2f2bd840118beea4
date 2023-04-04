import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { AppContext } from '../context';
import {useContext} from 'react';

const AlotParking = () => {

  const { lots } = useContext(AppContext);
  const navigation: any = useNavigation()
  return (
    <View style={{alignItems:"center", justifyContent:"center", alignSelf:"center"}}>

      <FlatList
         data={lots}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => {
                if (item?.vehicle) {
                    navigation.navigate("ExitParking", item)
                }
            }}>
                <View style={{
                    height: 100, width: 100, borderWidth: 1, marginTop: 10,
                    borderRadius: 10, margin: 30,
                }}>
                <Text style={{ fontSize: 18, marginTop: 15, textAlign: 'center' }}>
                    {item?.vehicle || `P ${index++}`}
                </Text>
                {item?.vehicle ? <Text style={{ fontSize: 12, marginTop: 35, textAlign: 'center' }}>
                    {moment(item?.entryDateTime).format('LTS')}
                </Text> : null}
            </View>
            </TouchableOpacity>
        )}
      />
      <View style={{marginBottom:20, height:70}}>
      <Button 
      title="Alot Parking"
      onPress={() =>navigation.navigate('AllocateParking')}
    />
      </View>
    </View>
  )
}

export default AlotParking