/**
 * Created by bryan on 10-12-2018.
 */
import { Component, HostListener, OnInit} from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  coins: string;
}

export interface Drinks {
  name: string;
  coins: string;
  value: number;
}

@Component({
  moduleId: module.id,
  selector: 'rg-bar',
  templateUrl: 'bar.component.html',
  styleUrls: ['bar.component.css'],
})

export class BarComponent {
  order: Drinks[] = [];
  hasOrder: boolean = false;

  tiles: Tile[] = [
    {text: 'Beer', cols: 2, rows: 1, color: '#38817A', coins: '1'},
    {text: 'Wine', cols: 2, rows: 1, color: '#38817A', coins: '1.5'},
    {text: 'Water', cols: 2, rows: 1, color: '#38817A', coins: '1'},
    {text: 'Cola', cols: 2, rows: 1, color: '#38817A', coins: '1'},
    {text: 'Two', cols: 2, rows: 1, color: '#38817A', coins: '1'},
    {text: 'Three', cols: 2, rows: 1, color: '#38817A', coins: '1'},
    {text: '5', cols: 1, rows: 1, color: '#DDBDF1', coins: '1'},
    {text: '6', cols: 1, rows: 1, color: '#DDBDF1', coins: '1'},
    {text: '5', cols: 1, rows: 1, color: '#DDBDF1', coins: '1'},
    {text: '6', cols: 1, rows: 1, color: '#DDBDF1', coins: '1'},
    {text: '5', cols: 1, rows: 1, color: '#DDBDF1', coins: '1'},
    {text: '6', cols: 1, rows: 1, color: '#DDBDF1', coins: '1'},
    {text: '5', cols: 1, rows: 1, color: '#DDBDF1', coins: '1'},
    {text: '6', cols: 1, rows: 1, color: '#DDBDF1', coins: '1'},
    {text: '5', cols: 1, rows: 1, color: '#DDBDF1', coins: '1'},
    {text: '6', cols: 1, rows: 1, color: '#DDBDF1', coins: '1'},
    {text: '5', cols: 1, rows: 1, color: '#DDBDF1', coins: '1'},
    {text: '6', cols: 1, rows: 1, color: '#DDBDF1', coins: '1'},
    {text: '5', cols: 1, rows: 1, color: '#DDBDF1', coins: '1'},
    {text: '6', cols: 1, rows: 1, color: '#DDBDF1', coins: '1'},
  ];


  ngOnInit() {
  }

  Clicked(name: string, coins: string) {
    let tempOrder: Drinks = {name: name, coins: coins, value: 1};
    let addDrink = false;
    this.hasOrder = false;
    if(this.order.length < 1) {
      this.order.push(tempOrder);
      console.log(this.order);
    }else{
      this.order.forEach((drink: Drinks) => {
        if(drink.name == name){
          drink.value = drink.value + 1;
          addDrink = true;
        }
      });
      if(addDrink){
        console.log(this.order);
      }else {
        this.order.push(tempOrder);
        console.log(this.order);
      }
    }
    this.order = [...this.order];
    this.hasOrder = true;
    console.log(this.hasOrder);
  }

}
