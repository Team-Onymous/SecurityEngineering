/**
 * Created by Cas on 7-01-2019.
 */
import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {Web3Service} from "../util/web3.service";
import {UserService} from "../services/user.service";
import {WebsocketService} from "../services/webSocket.service";
import {RespondService} from "../services/respond.service";

@Component({
    moduleId: module.id,
    selector: 'rg-bar-balance',
    templateUrl: 'barBalance.component.html',
    styleUrls: ['barBalance.component.css'],
    providers: [Web3Service, WebsocketService, RespondService]
})

export class BarBalanceComponent implements OnInit {

    public passId = "Hallo";


    constructor(private Web3Service: Web3Service,
                private userService: UserService,
                public webSocketService: WebsocketService,
                private respondService: RespondService) {

    }

    ngOnInit() {
        // this receives the information from the card.
        this.respondService.messages.subscribe(msg => {
            console.log(msg);
            this.passId = msg;
        });
    }

    // public listen() {
    //     this.observer = this.webSocketService.createObservableSocket('ws://localhost:40510')
    //         .subscribe(data => {
    //             let that = this;
    //
    //             this.passId = data;
    //
    //             sendMessage('pause');
    //
    //             function sendMessage(state) {
    //                 that.webSocketService.sendMessage(state);
    //             }
    //
    //         }, err => {
    //             console.log(err);
    //         }, () => {
    //             console.log('Stream complete.');
    //         });
    // }
    //
    // public resume() {
    //     // this.listen();
    //     this.observer.sendMessage('resume')
    // }
}
