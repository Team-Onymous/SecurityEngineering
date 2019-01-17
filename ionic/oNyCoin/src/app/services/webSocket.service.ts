import { Observable } from 'rxjs';

export class WebSocketService {
    ws: WebSocket;

    createObservableSocket(url: string): Observable<string> {
        this.ws = new WebSocket(url);
        return new Observable(observer => {
            this.ws.onmessage = (event) => {
                console.log(event.data);
                observer.next(event.data);
                observer.complete();
            };
            this.ws.onerror = (event) => observer.error(event);
            // this.ws.onclose = () => observer.complete();
        });
    }
}
