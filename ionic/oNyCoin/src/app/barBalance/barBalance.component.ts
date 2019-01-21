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

    public customer;
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
            this.userService.getBarUser(msg).subscribe(user => {

                this.username = user.firstname;
                // encrypting customers data
                this.customer = this.encrDecrService.set(environment.secret, JSON.stringify(user));
                if (user.wallet_address) {
                    this.Web3Service.getBarBalance(user.wallet_address);
                    localStorage.setItem('customer', this.customer);
                }

            })
        });
    }
}
