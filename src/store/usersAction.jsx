/**
 * 
 * @param {*} users 
 * @param {*} action 
 * @event 用户模块
 */
import { fromJS } from 'immutable'

const initialState = {  
    userInfoList:[
    ]
}
function usersAction(state = initialState, action) {
    switch(action.type) {

        case 'ADD_USER':

            let state = Object.assign(
                {},
                state, 
                {   userInfoList: [...state.userInfoList,action.userInfo] }
            )
            return fromJS( state ).toJS()

            break;

        case 'DELETE_USER':

            state.userInfoList.splice( action.index , 1)
            return fromJS( state ).toJS()

            break;
            
        default:
            return initialState;     
   }
}

export default usersAction