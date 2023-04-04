import { FlatList, Text, View, TouchableOpacity, Button, TextInput } from 'react-native';
import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../context';
import moment from "moment";

const AlotParking = () => {
    const { lots } = useContext(AppContext)
    const navigation: any = useNavigation()
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
            <FlatList
                data={lots}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) =>{
                    console.log('item', item);
                    
                    return( <TouchableOpacity onPress={() => {
                        if (item?.vehicle) {
                            navigation.navigate("ExitParking", item)
                        }
                    }}>
                        <View style={{
                            height: 100, width: 100, backgroundColor: '#eee', borderWidth: 1, marginTop: 10,
                            borderRadius: 10, margin: 30
                        }}>
                        </View>
                        <Text style={{ fontSize: 18, marginTop: 15, textAlign: 'center' }}>
                            {item?.vehicle || `P ${index++}`}
                        </Text>
                        {item?.vehicle ? <Text style={{ fontSize: 12, marginTop: 35, textAlign: 'center' }}>
                            {moment(item?.entryDateTime).format('LTS')}
                        </Text> : null}
                    </TouchableOpacity>)
                }
                }
            />
 <View style={{ height: 70, marginBottom: 20 }}>
                <Button title='Alot Parking'                    
                    onPress={() => {
                        navigation.navigate("AllocateParking")
                    }}
                />
            </View>
        </View>
    );
}

export default AlotParking;
