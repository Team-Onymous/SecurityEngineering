/**
 * Created by Cas on 7-01-2019.
 */
import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {Web3Service} from "../util/web3.service";
import {UserService} from "../services/user.service";
import {WebSocketService} from "../services/webSocket.service";


@Component({
    moduleId: module.id,
    selector: 'rg-bar-balance',
    templateUrl: 'barBalance.component.html',
    styleUrls: ['barBalance.component.css'],
    providers: [Web3Service, WebSocketService]
})

export class BarBalanceComponent implements OnInit {

    public passId = "Hallo";

    constructor(private Web3Service: Web3Service,
                private userService: UserService,
                public webSocketService: WebSocketService) {

    }

    ngOnInit() {
        this.listen();
    }

    public listen() {
        this.webSocketService.createObservableSocket('ws://localhost:40510')
            .subscribe(data => {
                this.passId = data;
                this.webSocketService.sendMessage('pause');
            }, err => {
                console.log(err);
            }, () => {
                console.log('Stream complete.');
            });
    }
}
