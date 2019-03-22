import React, { FunctionComponent, createContext, useState, useReducer, useCallback } from 'react';
import { StoreReducer, dispatchWithAsync } from './StoreReducer';
import { StoreAsyncAction } from '../types/StoreTypes';


export const StoreContext = createContext<any>(null);

const initialState = {
  items: [],
  isLoading: false,
  error: ''
}

export const StoreProvider:FunctionComponent = ({children}) => {
  const [state, dispatch] = useReducer(StoreReducer, initialState)

  return (
    <StoreContext.Provider value={{dispatch: (action: StoreAsyncAction ) => dispatchWithAsync(dispatch)(action), state: state}}>
      {children}
    </StoreContext.Provider>
  )
}
