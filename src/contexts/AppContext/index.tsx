import React, { createContext, useEffect, useReducer } from 'react';
import initState from './InitState';
import * as Interface from "./Interface";
import reducer from './Reducer';

type Dispatch = (action: Interface.Action) => void

const AppStateContext = createContext<Interface.State | undefined>(undefined);
const AppDispatchContext = createContext<Dispatch | undefined>(undefined);

export default (props: any) => {

    const [state, dispatch] = useReducer(reducer, initState);

    useEffect(() => {
        localStorage.setItem('appState', JSON.stringify(state));
    }, [state])

    return (
        <AppStateContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch}>
                {props.children}
            </AppDispatchContext.Provider>
        </AppStateContext.Provider>
    );
}

export const useAppState = () => {
    const context = React.useContext(AppStateContext)
    if (context === undefined) {
        throw new Error('useRootState must be used within a RootProvider')
    }
    return context
}

export const useAppDispatch = () => {
    const context = React.useContext(AppDispatchContext)
    if (context === undefined) {
        throw new Error('useRootDispatch must be used within a RootProvider')
    }
    return context
}

export const useApp = () => {
    return [useAppState(), useAppDispatch()]
}