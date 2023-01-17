import Action from "../action";
import {initialState} from "./index";
import {StorageKeys, StorageService} from "../../service/core/storage.service";

export default function AppReducer(state = initialState, action = {}) {
    switch (action.type) {
        case Action.UpdateDevice:
            return {
                ...state,
                device: action.device,
            };
        case Action.UpdateVariableList:
            return {
                ...state,
                variables: action.variables,
            };
        case Action.UpdateLandingState:
            const landingState = {
                ...state.landingState,
                ...action.payload
            }
            const newState = {
                ...state,
                landingState,
            }
            StorageService.setPerm(StorageKeys.LANDING_STATE, landingState)
            return newState;
        default:
            return state;
    }
}
