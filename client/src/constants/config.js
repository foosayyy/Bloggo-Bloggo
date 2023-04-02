// API_Notification Messages
export const API_NOTIFICATION_MESSAGES = {
    loading : {
        title : 'Loading...',
        message: 'Data is being loaded. Please wait!!'
    },
    success : {
        title : 'Success',
        message : 'Data Successfully loaded'
    }, 
    responseFailure : {
        titile : 'Error',
        message : 'An  error occured while fetching response from the server. Please try again.'
    },
    requestFailure : {
        titile : 'Error',
        message : 'Error occured while parsing requested data'
    },
    networkError : {
        title : 'Error',
        message : 'Unable to connect to the server. Please check your internet connectivity and try again later'
    }
}

export const SERVICE_URLS = {
    userSignup : {url : `/signup`, method : `POST`},
    userLogin : {url : `/login` , method : `POST`}
}