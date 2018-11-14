export { color, local  } from './theme'

export function labelValue ( list, label, value){

    let inputList = []

    list.forEach( (item) =>{
        inputList.push({
            label : item[label],
            value : item[value]
        })
    })
    
    return inputList
}
