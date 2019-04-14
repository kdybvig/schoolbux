import { StoreAction, StoreState } from "../types/StoreTypes";



export const StoreReducer = (state: StoreState, action: StoreAction) : StoreState => {
    switch(action.type) {
        case 'INITIAL_ITEMS' : 
            return {
                ...state,
                items: action.payload,
                isLoading: false
            }
        case 'ADD_ITEM' : 
            return {
                ...state,
                items: [...state.items, action.payload],
                isLoading: false,
                error: ''
            }
        case 'REMOVE_ITEM':
            const itemsAfterRemoval = findByIdAndRemove(action.payload, state.items)
            return {
                ...state,
                items: itemsAfterRemoval,
                isLoading: false,
                error: ''
            }
        case 'UPDATE_ITEM':
            const itemsAfterUpdate = findByIdAndReplace(action.payload._id, state.items, action.payload)
            return {
                ...state,
                items: itemsAfterUpdate,
                isLoading: false,
                error: ''
            }
        case 'LOADING':
            return {
                ...state,
                isLoading: true
            }
            case 'ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default :
                return {...state}
    }
}


export function findByIdAndRemove(id: string, array:any[]) {
    const newArray = array.slice()
    const index= newArray.findIndex(element => element._id === id)
    if(index === -1) return array //todo: throw error
    newArray.splice(index,1)
    return newArray
}

export function findByIdAndReplace(id: string, array:any[], newValue: any) : any[] {
    const newArray = array.slice()
    const index= newArray.findIndex(element => element._id === id)
    if(index === -1) return array //todo: throw error
    newArray.splice(index,1, newValue)
    return newArray
}