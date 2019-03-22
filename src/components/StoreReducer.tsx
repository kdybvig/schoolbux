import { StoreAction, StoreState, productValuesWithId, oldProduct, newProduct, StoreAsyncAction, PutItemReturnInterface, DeleteItemReturnInterface } from "../types/StoreTypes";





export function findByIdAndRemove(id: string, array:any[]) {
    const newArray = array.slice()
    const index= newArray.findIndex(element => element._id === id)
    if(index === -1) return array //todo: throw error
    newArray.splice(index,1)
    return newArray
}

export function findByIdAndReplace(id: string, array:any[], newValue: any) {
    const newArray = array.slice()
    const index= newArray.findIndex(element => element._id === id)
    if(index === -1) return array //todo: throw error
    newArray.splice(index,1, newValue)
    return newArray
}

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
            const postRemoveState = findByIdAndRemove(action.payload, state.items)
            return {
                ...state,
                items: postRemoveState,
                isLoading: false,
                error: ''
            }
        case 'UPDATE_ITEM':
            const postUpdateState = findByIdAndReplace(action.payload._id, state.items, action.payload)
            return {
                ...state,
                items: postUpdateState,
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


const apiUrl = "http://localhost:5000/store"
const token: string | null = localStorage.getItem('jwtToken')



async function putNewItem (item: newProduct): Promise<PutItemReturnInterface> {
    const url = apiUrl + '/item/'

    const formData = new FormData();
    Object.entries(item).forEach(entry=> formData.append(entry[0], entry[1]))

    try {
        const res = await (fetch(url, {
            method: 'PUT',
            body: formData,
            headers:{
                'Authorization' : token ? token : '', 
            }
        }))
        const response = await res.json()
        
        if (response._id) {
            const {_id, title, description, price, inStock, imgUrl} = response
            const item = {_id, title, description, price, inStock, imgUrl}
            return {success: true, item: item, error: ''};
        }
        return {success: false, item: null, error: response.error};
    } catch(err) {
        console.log(err);
        return {success: false,  item: null, error: 'Network error'};
    }
}

async function updateItem (item: oldProduct): Promise<PutItemReturnInterface> {
    const url = apiUrl + '/item/' + item._id

    const formData = new FormData();
    Object.entries(item).forEach(entry=> {
        if(entry[0] !== '_id') formData.append(entry[0], entry[1])
    })

    try {
        const res = await (fetch(url, {
            method: 'PUT',
            body: formData,
            headers:{
                'Authorization' : token ? token : '', 
            }
        }))
        const response = await res.json()
        
        if (response._id) {
            const {_id, title, description, price, inStock, imgUrl} = response
            const item = {_id, title, description, price, inStock, imgUrl}
            return {success: true, item: item, error: ''};
        }
        return {success: false, item: null, error: response.error};
    } catch(err) {
        console.log(err);
        return {success: false,  item: null, error: 'Network error'};
    }
}



async function removeItem (id: string): Promise<DeleteItemReturnInterface> {
    const url = apiUrl + '/item/' + id

    try {
        const res = await (fetch(url, {
            method: 'DELETE',
            headers:{
                'Authorization' : token ? token : ''
            }
        }))
        const response = await res.json()
        
        if (response.success) {
            return {success: response.success, error: ''};
        }
        return {success: '', error: response.error};
    } catch(err) {
        console.log(err);
        return {success: '', error: 'Network error'};
    }
}

async function getInitialItems () {
    const url = apiUrl

    try {
        const res = await (fetch(url, {
            headers:{
                'Authorization' : token ? token : '', 
                'Content-Type': 'application/json'
            }
        }))
        const response = await res.json()
        
        if (response && !response.error) {
            return {success: true, items: response, error: response.error};
        }
        return {success: false, items: null, error: response.error};
    } catch(err) {
        console.log(err);
        return {success: false,  items: null, error: 'Network error'};
    }
}


export function dispatchWithAsync (dispatch: any) {
    return async (action: StoreAsyncAction) => {
        switch(action.type) {
            case 'GET_INITIAL_ITEMS' : {
                dispatch({type: 'LOADING'})
                const storeItemsData = await getInitialItems()
                if(storeItemsData.error) {
                    dispatch({type: 'ERROR', payload: storeItemsData.error})
                    return
                }
                dispatch({type: 'INITIAL_ITEMS', payload: storeItemsData.items})
                return
            }
            case 'PUT_ADD_ITEM' : {
                dispatch({type: 'LOADING'})
                const newItemData = await putNewItem(action.payload)
                if(newItemData.error) {
                    dispatch({type: 'ERROR', payload: newItemData.error})
                    return
                }
                dispatch({type: 'ADD_ITEM', payload: newItemData.item})
                return
            }
            case 'PUT_UPDATE_ITEM' : {
                dispatch({type: 'LOADING'})
                const updatedItemData = await updateItem(action.payload)
                if(updatedItemData.error) {
                    dispatch({type: 'ERROR', payload: updatedItemData.error})
                    return
                }
                dispatch({type: 'UPDATE_ITEM', payload: updatedItemData.item})
                return
            }
            case 'DELETE_REMOVE_ITEM' : {
                dispatch({type: 'LOADING'})
                const updatedItemData = await removeItem(action.payload)
                if(updatedItemData.error) {
                    dispatch({type: 'ERROR', payload: updatedItemData.error})
                    return
                }
                dispatch({type: 'REMOVE_ITEM', payload: action.payload})
                return
            }
    
            default: {
                dispatch(action)
                return
            }
        }
    }
}