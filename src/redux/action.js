import {initialLandingState} from "./reducer";

export default class Action {
    static UpdateDevice = "UpdateDevice";
    static UpdateVariableList = "UpdateVariableList";
    static UpdateLandingState = "UpdateLandingState";

    dispatch;

    constructor({context, dispatch}) {
        if (context) {
            this.dispatch = context.props.dispatch;
        } else if (dispatch) {
            this.dispatch = dispatch
        }
    }

    updateDevice(device) {
        this.dispatch({type: Action.UpdateDevice, device})
    }

    updateVariableList(variables) {
        this.dispatch({type: Action.UpdateVariableList, variables})
    }

    resetLandingState() {
        this.dispatch({
            type: Action.UpdateLandingState,
            payload: {...initialLandingState},
            origin: 'resetLandingState'
        })
    }

}
