/**
 * Created by bryan on 4-12-2018.
 */
import {Component, HostListener, OnInit} from '@angular/core';
import {Web3Service} from "../util/web3.service";
import {MatDialog} from "@angular/material";
import {DialogComponent} from "../dialog/dialog.component";


@Component({
    moduleId: module.id,
    selector: 'rg-refund',
    templateUrl: 'refund.component.html',
    styleUrls: ['refund.component.css'],
})

export class RefundComponent {

    visible: boolean = true;
    breakpoint: number = 520;
    coinsInput: string;
    ibanInput: string;

    public showDialog;


    animal: string = 'hallo!';
    name: string = 'boe';

    constructor(public web3Service: Web3Service,
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

    refund(amount) {

        //to show modal
        this.showDialog = !this.showDialog;
    }



    openDialog(amount): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '500px',
            data: {name: this.name, animal: this.animal},
            disableClose: true,
        });


        this.web3Service.refund(amount);

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.animal = result;
        });
    }
}
