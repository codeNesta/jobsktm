import { createSwitchNavigator, createAppContainer } from "react-navigation";
import StartupScreen from '../screen/StartupScreen'
import WelcomeScreen from '../screen/WelcomeScreen'
import AuthScreen from '../screen/users/AuthScreen'
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import JobsScreen from "../screen/jobs/JobsScreen";
import PostJobsScreen from "../screen/users/PostJobsScreen";
import UserJobScreen from "../screen/users/UserJobScreen"
import EditModeScreen from '../screen/users/EditModeScreen'
import Logout from '../screen/users/Logout'


import {Ionicons} from '@expo/vector-icons'
import React from 'react';
import { SafeAreaView,Text, View, Image} from 'react-native';
import {useSelector} from 'react-redux'




const JobsNavigator = createStackNavigator({
       Jobs:{
           screen:JobsScreen,          
       }
},{   
    navigationOptions:{
         drawerIcon:drawerConfig => <Ionicons name="md-reorder" size={23} color="#a29bfe" />
    },
   
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:'red',
        },
        headerTintColor:'white'
    }
})



const PostJobsNavigator = createStackNavigator({
    Jobs:{
        screen:PostJobsScreen
    }
},{
    navigationOptions:{
        drawerIcon:drawerConfig => <Ionicons name="md-paper" size={23} color="#a29bfe" />
   },
    
        defaultNavigationOptions:{
            headerStyle:{
                backgroundColor:'red',

            },
            headerTintColor:'white'
        }
})


const UserJobsNavigator = createStackNavigator({
    Jobs:{
        screen:UserJobScreen
    },
    EditMode:{
        screen:EditModeScreen
    }
},{
    navigationOptions:{
        drawerIcon:drawerConfig => <Ionicons name="ios-square" size={23} color="#a29bfe" />
   },
    
        defaultNavigationOptions:{
            headerStyle:{
                backgroundColor:'red',

            },
            headerTintColor:'white'
        }
})


const LogoutNavigator = createStackNavigator({
    Logout:{
        screen:Logout
    },
    
},{
    navigationOptions:{
        drawerIcon:drawerConfig => <Ionicons name="md-log-out" size={23} color="#a29bfe" />
   },
    
        defaultNavigationOptions:{
            headerStyle:{
                backgroundColor:'red',

            },
            headerTintColor:'white'
        }
})






const DrawerNavigator = createDrawerNavigator({
    LatestJobs:{
        screen:JobsNavigator,   
        navigationOptions:{
            drawerLabel:"Latest Jobs"
        }
    },
    PostNewJobs:{
        screen:PostJobsNavigator,
        navigationOptions:{
            drawerLabel:"Post New Jobs"
        }
  
    },
    UserOwnJobs:{
        screen:UserJobsNavigator ,
        navigationOptions:{
            drawerLabel:"User Own Jobs"
        }
  
    },
    Logout:{
        screen:LogoutNavigator ,
        navigationOptions:{
            drawerLabel:"Logout"
        }
  
    }

  
  
},{
    headerMode:"none",
    contentComponent:props =>{
        const authUser = useSelector(state => state.auth.name)
        const image = useSelector(state => state.auth.image)

        return (
            <View style={{marginTop:20}}>
                <SafeAreaView forceInset={{top:"Always", }}>
                    <DrawerItems {...props} />
                    <View style={{alignItems:'center', justifyContent:'center', marginTop:10}}>
                        <Image source={{uri:image}} style={{height:60, width:60, borderRadius:30}} />
                    </View>
                    <Text style={{fontSize:20, marginTop:10, alignSelf:"center"}}>
                        {authUser}
                    </Text>
                </SafeAreaView>
            </View>
        )
    }
    ,
    contentOptions:{
        activeTintColor:'#fff',
        activeBackgroundColor:'#636e72',
        itemContainerStyle:{
            marginVertical:45
        }
    },
    drawerWidth:200,
    drawerType:'front'
})


const MainNavigator = createSwitchNavigator({
    StartupScreen:StartupScreen,
    Jobs:DrawerNavigator,
    Auth:AuthScreen
})


export default createAppContainer(MainNavigator)