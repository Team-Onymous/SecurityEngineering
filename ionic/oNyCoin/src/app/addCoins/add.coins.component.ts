/**
 * Created by bryan on 4-12-2018.
 */
import {Component, HostListener, OnInit} from '@angular/core';
import {Web3Service} from "../util/web3.service";
import {EncrDecrService} from "../services/EncrDecr.service";
import {Router} from "@angular/router";
import {DialogComponent} from "../dialog/dialog.component";
import {MatDialog} from "@angular/material";


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

    constructor(public web3Service: Web3Service,
                private EncrDecr: EncrDecrService,
                public dialog: MatDialog) {

    }

    ngOnInit() {
        const w = window.innerWidth;
        if (w >= this.breakpoint) {
            this.visible = true;
        } else {
            // whenever the window is less than 520, hide this component.
            this.visible = false;
        }
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

    openDialog(amount): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '500px',
            disableClose: true,
        });

        this.web3Service.buyTokens(amount);

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }
}
