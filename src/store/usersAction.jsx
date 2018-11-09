/**
 * 
 * @param {*} users 
 * @param {*} action 
 * @event 用户模块
 */

const initialState = {  
    userInfoList:[]
}
function usersAction(state = initialState, action) {
    switch(action.type) {
       case 'ADD_USER':
            return Object.assign(
                {}, 
                state.userInfoList , 
                {   userInfoList: [...state.userInfoList,action.userInfo] }
            )
        default:
            return initialState;     
   }
}

export default usersAction