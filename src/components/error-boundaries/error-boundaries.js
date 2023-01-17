import React, {Component} from 'react';
import * as Sentry from '@sentry/browser';
import './error-boundaries.scss';
import _ from 'lodash';
import LogRocket from 'logrocket';

class ErrorBoundaries extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: [],
            didErrorCaught: false,
            showStack: false
        }
    }

    static getDerivedStateFromError(error) {
        return {didErrorCaught: true}
    }

    componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        LogRocket.getSessionURL(sessionURL => {
            Sentry.configureScope(scope => {
                scope.setExtra("LogRocket", sessionURL);
                Sentry.captureException(error);
            });
        });
        const stack = errorInfo.componentStack.split(' in ');
        this.setState({errors: stack})
    }

    render() {
        const {showStack, didErrorCaught, errors} = this.state;
        return (
            <>
                {didErrorCaught ?
                    <div className="error-boundaries">
                        <h2>Error Page, Something has broken</h2>
                        {showStack && <div>{errors.map((error) => {
                            return <p>{error}</p>
                        })}</div>}
                    </div> :
                    this.props.children
                }
            </>
        );
    }
}

export default ErrorBoundaries;
