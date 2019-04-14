
//store products

export interface productNoImg {
    title: string,
    price: string,
    description: string,
    inStock: string
}
export interface productValues extends productNoImg {
    imgUrl: string
}

export interface productValuesWithId extends productValues {
    _id: string
}

export interface newProduct extends productNoImg {
    image: File
}

export interface oldProduct extends productNoImg {
    image: File | null
    _id: string
}


//store actions

export interface AddItemInterface {
    type: "ADD_ITEM"
    payload: productValuesWithId
}

export interface InitialItemsInterface {
    type: "INITIAL_ITEMS"
    payload: productValuesWithId[]
}

export interface RemoveItemInterface {
    type: "REMOVE_ITEM"
    payload: string
}

export interface UpdateItemInterface {
    type: "UPDATE_ITEM"
    payload: productValuesWithId
}

export interface LoadingInterface {
    type: "LOADING"
}

export interface ErrorInterface {
    type: "ERROR",
    payload: string
}

export type StoreAction = AddItemInterface | RemoveItemInterface  | UpdateItemInterface | LoadingInterface | ErrorInterface | InitialItemsInterface

//store state

export interface StoreState {
    items: productValuesWithId[]
    isLoading: boolean,
    error: string
}

//store async actions

interface GetInitialItemsInterface {
    type: 'GET_INITIAL_ITEMS'
}

interface PutAddItemInterface {
    type: "PUT_ADD_ITEM"
    payload: newProduct
}

interface PutUpdateItemInterface {
    type: "PUT_UPDATE_ITEM"
    payload: oldProduct
}

interface DeleteRemoveItemInterface {
    type: "DELETE_REMOVE_ITEM"
    payload: string
}

export type StoreAsyncAction = PutAddItemInterface | PutUpdateItemInterface | DeleteRemoveItemInterface | GetInitialItemsInterface

//store fetch returns

export interface PutItemReturnInterface {
    success: boolean
    item: productValuesWithId | null
    error: string
}

export interface DeleteItemReturnInterface {
    success: string,
    error: string
}