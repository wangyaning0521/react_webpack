//定义store中要改变的变量
const initialState = {  
	size:0,
}
//创建action 用于改变变量
const reducer = (state = initialState, action) => { 
	switch (action.type) {  
        case 'ADD_SIZE':  
            return Object.assign({}, state, {
                size: state.size+action.size
            })
        default:  
            return initialState;  
	}  
} 
export default reducer