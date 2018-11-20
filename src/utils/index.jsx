export { color, local, operId  } from './theme'

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
export function parseList(list,newList) {
    list.forEach(function (item, index) {
        newList.push({
            value: item.code,
            label: item.name
        });
        if (item.children) {
            newList[index].children = [];
            parseList(item.children, newList[index].children)
        }
    })
    return newList
}
