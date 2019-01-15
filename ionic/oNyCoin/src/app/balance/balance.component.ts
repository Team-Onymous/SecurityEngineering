/**
 * Created by Cas on 7-01-2019.
 */
import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {Web3Service} from "../util/web3.service";
import {UserService} from "../services/user.service";
import {barConsumable} from "../services/barConsumable";


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
                private userService: UserService) {

    }

    ngOnInit() {
        this.balance = this.Web3Service.balance;
        this.getUser(1);
    }

    private getUser(id) {
        this.userService.getUser(id).subscribe(
            (user) => {
                console.log(user);
                this.user = user
            });
    }

    private createWallet() {

        this.Web3Service.createWallet()
    }


}
