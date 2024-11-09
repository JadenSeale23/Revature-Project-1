//basic implementation of a store, which is basically a global data storage
export const store:any = {
    //loggedInUserInfo (filled in after successful login)
    LoggedInuser:{
        "userId":0,
        "username":"",
        "role":""
    },
    backendUrl:"http://localhost:7777/"
}