import * as  firebase from 'firebase'
import {validateAll} from 'indicative/validator';
import JobModel from '../model/JobModel'

export const postJob = (data) => {
    return async (dispatch,getState )=> {

const randomColors = ["#f3a683","#f7d794","#778beb","#e77f67","#cf6a87","#f19066","#303952,","#546de5","#3dc1d3","#f78fb3","#e15f41","#c44569","#786fa6","#63cdda","#ea8685","#63cdda","#596275","#574b90","#303952"]
const colorNumber = Math.floor(Math.random() * 20) + 1
const bgColor=randomColors[colorNumber]

    const val =  getState()   
    const userId = val.auth.userId

       const rules = {
            description:'required|min:15',
            phone:'required|min:10',      
           
        }

        const messages = {
            required: (field) => `${field}  is required`,
          
            'description.min': 'job description is too short',
            'phone.min': 'phone number is too short',
           
        }


 

          try{
            await validateAll(data,rules, messages)

            const token = await firebase.auth().currentUser.getIdToken(true).then(function(idToken){
                             return idToken
                         })

            const response = await fetch(`https://jobsktm-a474c.firebaseio.com/allJobs.json?auth=${token}`,{
                                                        method:'POST',
                                                        headers:{
                                                            'Content-Type': 'application/json'
                                                        },
                                                        body:JSON.stringify({
                                                                    description:data.description,
                                                                    ownerId:userId,
                                                                    phone:data.phone,
                                                                    bgColor:bgColor
                                                        })
                                                    })


            const resData = await response.json()
 
             dispatch({
                 type:"CREATED_JOB_SUCCESS",
                 jobCreated:true,
                 jobData:{
                     id:resData.name,
                     description:data.description,
                     ownerId:userId,
                     phone:data.phone,
                     bgColor:bgColor,
                    
                 }, 
                 
             })
             
            if(!response.ok){
                throw new Error('Somthing went wrong while posting jobs')
            }

           

          }catch(errors){
         
                const formattedErrors = {}

                

                 errors.forEach(error => formattedErrors[error.field] = error.message)

                 console.log('errorrrrrssssssssssss', formattedErrors)

                  dispatch({
                      type:'CREATE_JOB_FAILED',
                      descriptionErrorMessage:formattedErrors.description,
                      phoneErrorMessage:formattedErrors.phone,

                  })
          }
    }
}


export const clearErrorMessage =() =>{
    return async dispatch =>{
        dispatch ({
            type:'CLEAR_ERROR_MESSAGE',
            descriptionErrorMessage:undefined,
            phoneErrorMessage:undefined
        })
    }
}


export const fetchAllJobs = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId

        try{
            const response = await fetch(`https://jobsktm-a474c.firebaseio.com/allJobs.json`)

           const resData = await response.json()

           const loadedJobs =[]

           for(const key in resData){
               loadedJobs.push(new JobModel(key, resData[key].ownerId, resData[key].bgColor, resData[key].description, resData[key].phone))

           }

           dispatch({
               type:"SET_JOBS",
               allJobs:loadedJobs,
               userOwnJobs:loadedJobs.filter(job => job.ownerId == userId)
           })

        }catch(err){

        }
    }
}

export const deleteJob = (jobId) => {
    return async (dispatch) => {
        
        
        const token = await firebase.auth().currentUser.getIdToken(true).then(function(idToken){
            return idToken
    
        })

        await fetch(`https://jobsktm-a474c.firebaseio.com/allJobs/${jobId}.json?auth=${token}`,{
            method:'DELETE'
        })

        dispatch({
            type:'DELETE_JOB',
            jobId:jobId
        })

    }
}

export const updateJob = (jobId, data) => {
    return async (dispatch) => {

        const rules = {
            description:'required|min:15',
            phone:'required|min:10',      
           
        }

        const messages = {
            required: (field) => `${field}  is required`,
          
            'description.min': 'job description is too short',
            'phone.min': 'phone number is too short',
           
        }


        try{

            await validateAll(data,rules, messages)

            const token = await firebase.auth().currentUser.getIdToken(true).then(function(idToken){
                return idToken
            })

            const response = await fetch(`https://jobsktm-a474c.firebaseio.com/allJobs/${jobId}.json?auth=${token}`,{
                method:'PATCH',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    description:data.description,
                    phone:data.phone
                })
            })

            dispatch({
                type:"UPDATE_JOB",
                jobId:jobId,
                jobData:{
                    description:data.description,
                    phone:data.phone
                }
            })
        }catch(err){
            
        }

    }
}