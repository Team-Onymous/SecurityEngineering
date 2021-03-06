/**
 * Created by bryan on 10-12-2018.
 */
import {Component, HostListener, OnInit} from '@angular/core';
import {BarService} from '../services/bar.services';
import {Observable} from 'rxjs';
import {barConsumable} from '../services/barConsumable';
import {Web3Service} from "../util/web3.service";
import {BarBalanceComponent} from "../barBalance/barBalance.component";
import {WebsocketService} from "../services/webSocket.service";
import {RespondService} from "../services/respond.service";
import {UserService} from "../services/user.service";
import {environment} from "../../environments/environment";
import {EncrDecrService} from "../services/EncrDecr.service";
import {Router} from "@angular/router";
import {DialogComponent} from "../dialog/dialog.component";
import {MatDialog} from "@angular/material";

export interface Tile {
    color: string;
    cols: number;
    rows: number;
    text: string;
    coins: number;
}

export interface Drinks {
    name: string;
    coins: number;
    value: number;
}

@Component({
    moduleId: module.id,
    selector: 'rg-bar',
    templateUrl: 'bar.component.html',
    styleUrls: ['bar.component.css'],
    providers: [BarBalanceComponent, RespondService]
})

export class BarComponent {
    constructor(public barService: BarService,
                public web3Service: Web3Service,
                private barBalanceComponent: BarBalanceComponent,
                private respondService: RespondService,
                private router: Router,
                public dialog: MatDialog) {
    }

    order: Drinks[] = [];
    hasOrder: boolean = false;
    public totalCoins;

    public loadedConsumable$: Observable<barConsumable[]>;

    public tilesBar: Tile[] = [];

    public showDialog;

    public tx;

    ngOnInit() {


        this.loadedConsumable$ = this.barService.getConsumables();
        this.loadedConsumable$.subscribe(
            (consumables: barConsumable[]) => {
                if (consumables.length >= 1) {
                    let numberOfCols = 1;
                    for (const consumable of consumables) {
                        let color: string = '';
                        let colsWidth: number = 0;
                        if (consumable.alcoholic) {
                            color = '#38817A';
                        } else {
                            color = '#2d9ee0';
                        }
                        if (numberOfCols > 6) {
                            colsWidth = 1;
                        } else {
                            colsWidth = 2;
                        }
                        numberOfCols++;
                        this.tilesBar.push({
                            text: consumable.name,
                            cols: colsWidth,
                            rows: 1,
                            color: color,
                            coins: consumable.cost
                        });
                    }
                }
            });
    }

    Clicked(name: string, coins: number) {
        let tempOrder: Drinks = {name: name, coins: coins, value: 1};
        let addDrink = false;
        this.hasOrder = false;
        if (this.order.length < 1) {
            this.order.push(tempOrder);
        } else {
            this.order.forEach((drink: Drinks) => {
                if (drink.name == name) {
                    drink.value = drink.value + 1;
                    this.tilesBar.forEach((consumable: Tile) => {
                        if (drink.name == consumable.text) {
                            drink.coins = drink.coins + consumable.coins;
                        }
                    });
                    addDrink = true;
                }
            });
            if (!addDrink) {
                this.order.push(tempOrder);
            }
        }
        this.order = [...this.order];
        this.hasOrder = true;
        this.getTotalCoins();
    }

    minDrink(name: string, coins: number) {
        {
            let tempOrder: Drinks = {name: name, coins: coins, value: 1};
            let minDrink = false;
            this.hasOrder = false;
            if (this.order.length < 1) {
                this.order.push(tempOrder);
            } else {
                this.order.forEach((drink: Drinks) => {
                    if (drink.name == name) {
                        drink.value = drink.value - 1;
                        this.tilesBar.forEach((consumable: Tile) => {
                            if (drink.name == consumable.text) {
                                drink.coins = drink.coins - consumable.coins;
                            }
                        });
                        if (drink.value <= 0) {
                            this.order.splice(this.order.indexOf(drink), 1);
                        }
                        minDrink = true;
                    }
                });
                if (!minDrink) {
                    this.order.push(tempOrder);
                }
            }
            this.order = [...this.order];
            this.hasOrder = true;
            this.getTotalCoins();
        }
    }

    getTotalCoins() {
        this.totalCoins = 0;
        this.order.forEach((drink: Drinks) => {
            this.totalCoins = this.totalCoins + drink.coins;
        });
    }

    confirmOrder() {

        //to show modal
        this.showDialog = !this.showDialog;

        let amount = this.totalCoins;
        let order = '';
        this.order.forEach((drink: Drinks) => {
            order = order + (', ' + drink.value + ' ' + drink.name + '');
        });
        this.buyConsumables(amount, order);
        this.order = [];
        this.order = [...this.order];
        this.getTotalCoins();


    }

    cancelOrder() {
        this.order = [];
        this.order = [...this.order];
        this.getTotalCoins();
        this.sendMessage();
        // this.newTransaction();
    }

    buyConsumables(amount, order) {
        this.web3Service.buyConsumables(amount, order);
    }

    sendMessage() {
        this.respondService.sendMsg("reset");
    }

    newTransaction() {

        this.sendMessage();
        this.web3Service.transactionMade = false;
        document.getElementById('transaction').innerHTML = "";
        this.showDialog = !this.showDialog;
        this.router.navigate(['/bar'])
    }

    checkValue() {
        if (this.totalCoins) {
            let balance = document.getElementsByClassName('barBalance')[0].innerHTML;
            return balance
        } else return 0
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '500px',
            disableClose: true,
        });

        let amount = this.totalCoins;
        let order = '';
        this.order.forEach((drink: Drinks) => {
            order = order + (', ' + drink.value + ' ' + drink.name + '');
        });
        this.buyConsumables(amount, order);
        this.order = [];
        this.order = [...this.order];
        this.getTotalCoins();


        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.sendMessage();
        });
    }
}
