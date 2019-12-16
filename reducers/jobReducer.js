
import JobModel from '../model/JobModel'


const initialState={
    availableJobs:[],
    userOwnJobs:[]
}

export default  (state=initialState, action) => {
    switch(action.type){

       case "CREATED_JOB_SUCCESS":

       const newJob = new JobModel(action.jobData.id, action.jobData.ownerId,action.jobData.bgColor,action.jobData.description, action.jobData.phone )
           return{
               ...state,
               availableJobs: state.availableJobs.concat(newJob),
               userOwnJobs:state.userOwnJobs.concat(newJob),
               jobCreated:action.jobCreated 
           }


          case "CREATE_JOB_FAILED" :
      
              return {
                  ...state,
                  descriptionErrorMessage:action.descriptionErrorMessage,
                  phoneErrorMessage:action.phoneErrorMessage
              }

              case "CLEAR_ERROR_MESSAGE":
                 return{
                     ...state,
                     descriptionErrorMessage:action.descriptionErrorMessage,
                     phoneErrorMessage:action.phoneErrorMessage
 
                 }


                 case "SET_JOBS":


                 console.log('jobRedcuer fetching', action)

                     return{
                         ...state,
                        availableJobs:action.allJobs.sort(function(a,b){
                            return 0.5 - Math.random()
                        }),
                        userOwnJobs:action.userOwnJobs
                     }


                     case "DELETE_JOB":
                         return{
                             ...state,
                             userOwnJobs:state.userOwnJobs.filter(job => job.id !== action.jobId),
                             availableJobs:state.availableJobs.filter(job => job.id !== action.jobId)

                         }

                        


        default :
        return state
    }


  
}