/**
 * Created by bryan on 4-12-2018.
 */
import {Component, HostListener, OnInit} from '@angular/core';
import {Web3Service} from "../util/web3.service";
import {EncrDecrService} from "../services/EncrDecr.service";
import {Router} from "@angular/router";


@Component({
    moduleId: module.id,
    selector: 'rg-add-coins',
    templateUrl: 'add.coins.component.html',
    styleUrls: ['add.coins.component.css'],
})

export class AddCoinsComponent {

    visible: boolean = true;
    breakpoint: number = 520;
    coinsInput: string;
    public showDialog;

    constructor(private web3Service: Web3Service,
                private EncrDecr: EncrDecrService) {

    }

    ngOnInit() {
        const w = window.innerWidth;
        if (w >= this.breakpoint) {
            this.visible = true;
        } else {
            // whenever the window is less than 520, hide this component.
            this.visible = false;
        }
        //
        // let userAccount = JSON.parse(localStorage.getItem('user'));
        // let decryptedPrivKey = this.EncrDecr.get(userAccount.email.substr(0, 2) + userAccount.lastname.substr(0, 2), atob(userAccount.wallet_key));
        // console.log("Decrypted Privkey: " + decryptedPrivKey);
        //
        // //user account
        // this.userAccount = this.web3.eth.accounts.privateKeyToAccount(decryptedPrivKey);

    }


    @HostListener('window:resize', ['$event'])
    onResize(event) {
        const w = event.target.innerWidth;
        if (w >= this.breakpoint) {
            this.visible = true;
        } else {
            // whenever the window is less than 520, hide this component.
            this.visible = false;
        }
    }

    goToRegister() {
    }

    addCoins(amount) {

        //to show modal
        this.showDialog = !this.showDialog;

        console.log(amount);
        this.web3Service.buyTokens(amount);
    }

    newTransaction() {

        // this.sendMessage();
        this.web3Service.transactionMade = false;
        document.getElementById('transaction').innerHTML = "";
        this.showDialog = !this.showDialog;
    }
}
