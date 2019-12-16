//import liraries
import React, { useState, useCallback, useEffect} from 'react';
import { View, Text, StyleSheet , ScrollView, TextInput,KeyboardAvoidingView, Button, Alert} from 'react-native';
import CustomHeaderButton from '../../components/UI/HeaderButton'
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import * as jobActions from '../../actions/jobActions';
import {useDispatch, useSelector} from 'react-redux';




// create a component
const EditModeScreen = (props) => {

    const dispatch = useDispatch()

    const descriptionErrorMessage = useSelector(state => state.job.descriptionErrorMessage)
    const phoneErrorMessage = useSelector(state => state.job.phoneErrorMessage)
    const jobCreated = useSelector(state => state.job.jobCreated)
    const userOwnJobs = useSelector(state => state.job.userOwnJobs)
    const id  = props.navigation.getParam('id')

    const toUpdate = userOwnJobs ? userOwnJobs.find( job => job.id === id) :[]


  const [description, setDescription] = useState(toUpdate ? toUpdate.description : '');
  const [phone, setPhone] = useState(toUpdate ? toUpdate.phone : '')
  const [loading, setLoading] = useState(false)

  const data = useCallback(() => {
                            const jobData = {
                                description:description,
                                phone:phone
                            }

                            dispatch(jobActions.updateJob(id, jobData) )
                          
            
                          

  },[description, phone, userOwnJobs])


  const submit = async () => {
      setLoading(true)
      await data()
      setLoading(false)

      Alert.alert('Job editing dong', 'see your jobs',
      [
          {
              text:'yes',
              onPress:()=>{
                  setPhone('')
                  setDescription('')
                  dispatch(jobActions.clearErrorMessage())
                  props.navigation.openDrawer()
              }
          }
      ])
 
  }



    return (
       <KeyboardAvoidingView  style={{flex:1, paddingHorizontal:6}} enabledKeyboardOffset={350} >
            <ScrollView contentContainerStyle={{alignItems:'center'}}>
                    <View style={styles.formContainer}>
                        <Text style={styles.label}>Jobs Description</Text>
                        <Text style={{fontSize:13}}>(also include salary, time and address)</Text>
        {
            descriptionErrorMessage != undefined && (<View style={{paddingTop:4}}> 
                                                       <Text style={{color:'red'}}>{descriptionErrorMessage}</Text>
                                                    </View>)
        }
                      
                        <TextInput style={styles.input} returnKeyType="next" multiline numberOfLines={20} value={description} onChangeText={(desc) => setDescription(desc)} />

                        <Text style={styles.label}>Phone</Text>
                        <Text style={{fontSize:13}}>(Job seeker will call you in this number)</Text>
       {
        phoneErrorMessage != undefined && (<View style={{paddingTop:4}}> 
                                                <Text style={{color:'red'}}>{phoneErrorMessage}</Text>
                                            </View>)
        }
                      
                        <TextInput style={styles.phone} returnKeyType="next"  keyboardType="phone-pad" value={phone} onChangeText={(phone) => setPhone(phone)} />
                        <Button title="Submit Jobs" onPress={submit} />
                 </View>
            </ScrollView>
       </KeyboardAvoidingView>
      
    );
};

// define your styles
const styles = StyleSheet.create({
    formContainer: {
        width:"100%",
        marginTop:15
    },
    label:{
        fontSize:20
    },
    input:{
        paddingHorizontal:2,
        paddingVertical:5,
        backgroundColor:"#f9f7f6",
        height:150,
        fontSize:22,
        borderColor:"#ccc",
        borderWidth:2,
        marginVertical:5,
    },
    phone:{
        paddingHorizontal:2,
        paddingVertical:5,
        backgroundColor:"#f9f7f6",
      
        fontSize:22,
        borderColor:"#ccc",
        borderWidth:2,
        marginVertical:5,
    }
});

EditModeScreen.navigationOptions = (navData) => {
    return {
        headerTitle:"Edit Job",
        headerRight:(<HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
                          <Item title="menu" iconName="md-menu" onPress={() =>navData.navigation.toggleDrawer()} />
                    </HeaderButtons>)
    }
 }
 
 

 


//make this component available to the app
export default EditModeScreen;
