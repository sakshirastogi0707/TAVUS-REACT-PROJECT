import React, {Component, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './root.scss';
import 'font-awesome/css/font-awesome.min.css'
import {SnackbarProvider} from 'notistack';
import {createStore} from 'redux';
import {Provider, useDispatch} from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppReducer from "../../redux/reducer/app.reducer";
import {AppRouter} from "../app-router/app-router";
import {Config} from "../../config/config";
import { stopReportingRuntimeErrors } from "react-error-overlay";
import ErrorBoundaries from "../error-boundaries/error-boundaries";
import Segment from 'react-segment-analytics';
import {StorageKeys, StorageService, TempStorage} from "../../service/core/storage.service";
import Action from "../../redux/action";

if (Config.ENVIRONMENT === "development") {
    // stopReportingRuntimeErrors(); // disables error overlays
}

const store = createStore(AppReducer);

store.subscribe(() => {
    // listen for store changes
});

function Root(props) {
    if (Config.ENVIRONMENT !== 'development') {
        //console.log('environment', Config);
        //console.clear()
    }
    if(window.location.pathname !== '/video'){
        document.title = Config.APP_NAME;
    }

    //document.title = Config.APP_NAME;
    return (
        <Provider store={store}>
            <SnackbarProvider maxSnack={3}>
                <ErrorBoundaries>
                    {/* <IntercomProvider appId={Config.INTERCOM_APP_ID} autoBoot> */}
                        <Segment writeKey={process.env.REACT_APP_SEGMENT_KEY}>
                            <AppRouter/>
                            <ToastContainer limit={1} />
                        </Segment>

                    {/* </IntercomProvider> */}
                </ErrorBoundaries>
            </SnackbarProvider>
        </Provider>
    );
}

export default Root;
