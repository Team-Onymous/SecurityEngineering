import {Injectable} from '@angular/core';

import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {WebsocketService} from "./webSocket.service";

@Injectable()
export class RespondService {

    messages: Subject<any>;

    // Our constructor calls our wsService connect method
    constructor(private wsService: WebsocketService) {
        this.messages = <Subject<any>>wsService
            .connect()
            .pipe(map((response: any) => response));
    }

    // Our simplified interface for sending
    // messages back to our socket.io server
    sendMsg(msg) {
        this.messages.next(msg);
    }

}