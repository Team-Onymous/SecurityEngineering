/**
 * Created by Cas on 7-01-2019.
 */
import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {Web3Service} from "../util/web3.service";
import {UserService} from "../services/user.service";
import {WebsocketService} from "../services/webSocket.service";
import {RespondService} from "../services/respond.service";
import {EncrDecrService} from "../services/EncrDecr.service";
import {environment} from "../../environments/environment";


@Component({
    moduleId: module.id,
    selector: 'rg-bar-balance',
    templateUrl: 'barBalance.component.html',
    styleUrls: ['barBalance.component.css'],
    providers: [Web3Service, WebsocketService, RespondService]
})

export class BarBalanceComponent implements OnInit {
    private user;
    public username = 'Waiting for customer...';


    constructor(private Web3Service: Web3Service,
                private userService: UserService,
                public webSocketService: WebsocketService,
                private respondService: RespondService,
                private encrDecrService: EncrDecrService
    ) {

    }

    ngOnInit() {
        // this receives the information from the card.
        this.respondService.messages.subscribe(msg => {
            console.log(msg);
            this.userService.getBarUser(msg).subscribe(user => {
                console.log(JSON.stringify(user))

                this.username = user.firstname
                // encrypting customers data
                this.user = this.encrDecrService.set(environment.secret, JSON.stringify(user));
                this.Web3Service.getBarBalance(user.wallet_address);
                localStorage.setItem('customer', this.user);
            })
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
