import Action from "./Action";
import initState from "./InitState";
import * as Interface from './Interface';

export default function reducer(state = initState, action: Interface.Action) {
    switch (action.type) {
        case Action.UPDATE_AUTH:
            if (action?.value?.token && action?.value?.user) {
                return {
                    ...state,
                    auth: {
                        token: action?.value?.token,
                        user: action?.value?.user
                    }
                };
            }
            return state;
        case Action.LOGOUT_CMS:
            const newState = {
                ...state,
                auth: null
            };
            delete newState.auth;
            return newState;
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}