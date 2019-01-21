/**
 * Created by bryan on 4-12-2018.
 */
import {Component, HostListener, OnInit} from '@angular/core';
import {Web3Service} from "../util/web3.service";


@Component({
    moduleId: module.id,
    selector: 'rg-refund',
    templateUrl: 'refund.component.html',
    styleUrls: ['refund.component.css'],
})

export class RefundComponent {

    visible: boolean = true;
    breakpoint: number = 520;

    public showDialog;

    constructor(private web3Service: Web3Service) {
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

    refund(amount) {

        //to show modal
        this.showDialog = !this.showDialog;
        
        this.web3Service.refund(amount);
    }

    newTransaction() {

        // this.sendMessage();
        this.web3Service.transactionMade = false;
        document.getElementById('transaction').innerHTML = "";
        this.showDialog = !this.showDialog;
    }
}
