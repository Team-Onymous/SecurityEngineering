/**
 * Created by Cas on 7-01-2019.
 */
import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {Web3Service} from "../util/web3.service";
import {UserService} from "../services/user.service";
import {barConsumable} from "../services/barConsumable";
import {environment} from "../../environments/environment";
import {EncrDecrService} from "../services/EncrDecr.service";


@Component({
    moduleId: module.id,
    selector: 'rg-balance',
    templateUrl: 'balance.component.html',
    styleUrls: ['balance.component.css'],
    providers: [Web3Service]
})

export class BalanceComponent implements OnInit {

    public balance;
    public user;

    constructor(private Web3Service: Web3Service,
                private userService: UserService,
                private EncrDecr: EncrDecrService) {

    }

    ngOnInit() {
        this.balance = this.Web3Service.balance;
        this.getUser();
    }

    private getUser() {

        if (this.userService.isLoggedIn()) {

            let userAccount = localStorage.getItem('user');
            let decryptedUserAccount = JSON.parse(this.EncrDecr.get(environment.secret, userAccount));

            this.userService.getUser(decryptedUserAccount.id).subscribe(
                (user) => {

                    this.user = user
                });
        }
    }

    private createWallet() {

        this.Web3Service.createWallet()
    }


}
