import { View } from '@/app/common/components/themed';
import React from 'react';
import { TextInput } from 'react-native-paper';

type LocationsPropsType={
    onChange:()=>void;
}

const Locations = ({onChange}:LocationsPropsType) =>{
return (<View>
    <TextInput label="From" mode="outlined" onChangeText={onChange} />
    <TextInput label="From" mode="outlined" onChangeText={onChange} />
    <TextInput label="From" mode="outlined" onChangeText={onChange} />
    <TextInput label="From" mode="outlined" onChangeText={onChange} />
</View>)
}


export default Locations;