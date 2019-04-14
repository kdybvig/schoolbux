import React, { FunctionComponent, createContext, useState, useReducer, useCallback } from 'react';
import { StoreReducer } from './StoreReducer';
import { StoreReducerAsyncHandler } from './StoreReducerAsyncHandler'
import { StoreAsyncAction, StoreAction } from '../types/StoreTypes';


export const StoreContext = createContext<any>(null);

const initialState = {
  items: [],
  isLoading: false,
  error: ''
}

export const StoreProvider:FunctionComponent = ({children}) => {
  const [state, dispatch] = useReducer(StoreReducer, initialState)

  const dispatchWithAsyncHandler = (action: StoreAction | StoreAsyncAction) => StoreReducerAsyncHandler(dispatch)(action)

  return (
    <StoreContext.Provider value={{state, dispatch: dispatchWithAsyncHandler}}>
      {children}
    </StoreContext.Provider>
  )
}
