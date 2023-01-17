import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root/root';
import LogRocket from 'logrocket';

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

const environment = process.env.REACT_APP_ENVIRONMENT || 'local'
if(process.env.REACT_APP_ENVIRONMENT == 'production'){
    LogRocket.init(process.env.REACT_APP_LOGROCKET_STRING);
}
setTimeout(() => {
    Sentry.init({
    beforeSend(event) {
        if(process.env.REACT_APP_ENVIRONMENT == 'production'){
            const logRocketSession = LogRocket.sessionURL;
            if (logRocketSession !== null) {
                event.extra["LogRocket"] = logRocketSession;
                return event;
            } else {
                return event;
            }
        }
        return event;
    },
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [new BrowserTracing()],
    environment: environment,
    traces_sample_rate: 0.2
})
},3000)


ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);

