import AppReducer from './app.reducer';

export const initialLandingState = {
    template_id: 0,
    selectedNavItemId: 'layout',
    templatePreviewType: 'web',
    template_selected: false,
    showSuperCharge: true
}
export const initialState = {
    device: {
        width: 0,
        scale: 0,
        breakpoint: 'xs'
    },
    landingState: {...initialLandingState},
    variables: []
};

export default function RootReducer(state = initialState, action = {}) {
    AppReducer(state, action);
}
