import { StoreAction, oldProduct, newProduct, StoreAsyncAction, PutItemReturnInterface, DeleteItemReturnInterface } from "../types/StoreTypes";

const apiUrl = "http://localhost:5000/store"
const token: string | null = localStorage.getItem('jwtToken')

export function StoreReducerAsyncHandler (dispatch: any) {
    return async (action: StoreAsyncAction | StoreAction) => {

        switch(action.type) {
            case 'GET_INITIAL_ITEMS' : {
                dispatch({type: 'LOADING'})
                const storeItemsData = await getInitialItems()
                if(storeItemsData.error) {
                    dispatch({type: 'ERROR', payload: storeItemsData.error})
                    return 'error'
                } else {
                    dispatch({type: 'INITIAL_ITEMS', payload: storeItemsData.items})
                    return
                }
            }
            case 'PUT_ADD_ITEM' : {
                dispatch({type: 'LOADING'})
                const newItemData = await putNewItem(action.payload)
                if(newItemData.error) {
                    await dispatch({type: 'ERROR', payload: newItemData.error})
                    return 'error'
                }
                else {
                    await dispatch({type: 'ADD_ITEM', payload: newItemData.item})
                    return
                }
            }
            case 'PUT_UPDATE_ITEM' : {
                dispatch({type: 'LOADING'})
                const updatedItemData = await updateItem(action.payload)
                if(updatedItemData.error) {
                    dispatch({type: 'ERROR', payload: updatedItemData.error})
                    return 'error'
                } else {
                    dispatch({type: 'UPDATE_ITEM', payload: updatedItemData.item})
                    return
                }
            }
            case 'DELETE_REMOVE_ITEM' : {
                dispatch({type: 'LOADING'})
                const updatedItemData = await removeItem(action.payload)
                if(updatedItemData.error) {
                    dispatch({type: 'ERROR', payload: updatedItemData.error})
                    return 'error'
                } else {
                    dispatch({type: 'REMOVE_ITEM', payload: action.payload})
                    return
                }
                
            }
    
            default: {
                dispatch(action)
                return
            }
        }
    }
}

async function putNewItem (item: newProduct): Promise<PutItemReturnInterface> {
    const url = apiUrl + '/newitem/'

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
        return {success: false,  items: null, error: 'Network error'};
    }
}