//import liraries
import React, { useCallback, useEffect,useState } from 'react';
import { View, Text, StyleSheet,FlatList,ActivityIndicator } from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import * as jobActions from '../../actions/jobActions';
import {useDispatch, useSelector} from 'react-redux'
import JobItem from '../../components/UI/JobItem'



const JobsScreen = (props) => {

    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)

    const allJobs = useSelector(state => state.job.availableJobs)

    const loadJobs = useCallback(async () => {

        setIsRefreshing(true)


        try{
            await dispatch(jobActions.fetchAllJobs())

        }catch(err){

        }

        setIsRefreshing(false)
    },[dispatch])

    useEffect(()=>{
         setIsLoading(true)
         loadJobs().then(()=>{
             setIsLoading(false)
         })
    },[dispatch, loadJobs])

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadJobs)

        return () => {
            willFocusSub.remove()
        }
    },[dispatch, loadJobs])


    if(isLoading){
        return (
            <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator size="large" color="red" animating/>
            </View>
        )
    }


    return (
   <FlatList data={allJobs} 
   onRefresh={loadJobs}
   refreshing={isRefreshing}
   keyExtractor={item => item.id} 
   style={{flex:1}} 
   renderItem={itemData => <JobItem
                                     description={itemData.item.description}
                                     phone={itemData.item.phone.toString()}
                                     bgColor={itemData.item.bgColor}
    />} />
    );
};




// define your styles
const styles = StyleSheet.create({
    container: {
        
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      
    },
});


JobsScreen.navigationOptions = (navData) => {
   return {
       headerTitle:"Latest Available Jobs",
       headerRight:(<HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
                         <Item title="menu" iconName="md-menu" onPress={() =>navData.navigation.toggleDrawer()} />
                   </HeaderButtons>)
   }
}





//make this component available to the app
export default JobsScreen;
