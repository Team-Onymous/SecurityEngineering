import { Observable } from 'rxjs';

export class WebSocketService {
    ws: WebSocket;

    createObservableSocket(url: string): Observable<string> {
        this.ws = new WebSocket(url);
        return new Observable(observer => {
            this.ws.onmessage = (event) => {
                observer.next(event.data);
            };
            this.ws.onerror = (event) => observer.error(event);
            this.ws.onclose = () => observer.complete();
        });
    }

    sendMessage(message: string) {
        this.ws.send(message);
    }
}
