import { Subject } from 'rxjs';

const subject = new Subject();

export const dispatchService = {
    sendData: message => {
    	subject.next(message)
    },
    clearData: () => subject.next(),
    getData: () => subject.asObservable()
};