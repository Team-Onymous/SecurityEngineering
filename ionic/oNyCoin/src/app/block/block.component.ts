/**
 * Created by bryan on 4-12-2018.
 */
import { Component, HostListener, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {EncrDecrService} from "../services/EncrDecr.service";
import {RespondService} from "../services/respond.service";
import {DialogComponent} from "../dialog/dialog.component";
import {MatDialog} from "@angular/material";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

export interface Option {
  value: string;
  viewValue: string;
}


@Component({
  moduleId: module.id,
  selector: 'rg-block',
  templateUrl: 'block.component.html',
  styleUrls: ['block.component.css'],
  providers: [RespondService]
})

export class BlockComponent{
  visible: boolean = true;
  public checked = false;
  breakpoint: number = 520;
  selectedOption : string;
  private pass_id;



  options: Option[] = [
    {value: 'lost', viewValue: 'Lost'},
    {value: 'stolen', viewValue: 'Stolen'},
    {value: 'notused', viewValue: 'Not Used'},
    {value: 'Other', viewValue: 'Other'}
  ];
  constructor(private userService: UserService, private router: Router,
              private EncrDecr: EncrDecrService,
              private respondService: RespondService,
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

    this.respondService.messages.subscribe(msg => {
      this.pass_id = msg
    });
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

  blockCard(newPass) {

    let userAccount = localStorage.getItem('user');
    let decryptedUserAccount = JSON.parse(this.EncrDecr.get(environment.secret, userAccount));

    if(newPass)
    {
      this.userService.removeCard(this.pass_id, decryptedUserAccount.street , decryptedUserAccount.house_number , decryptedUserAccount.postal_code, decryptedUserAccount.city , decryptedUserAccount.id).subscribe(
        response => {
          this.router.navigate(['/home']);
        },
        err => console.log(err)
      );
    }else{
      this.userService.removeCard('',  decryptedUserAccount.street , decryptedUserAccount.house_number , decryptedUserAccount.postal_code, decryptedUserAccount.city, decryptedUserAccount.id).subscribe(
        response => {
          this.router.navigate(['/home']);
        },
        err => console.log(err)
      );
    }
  }

  openDialog(newpass): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px'
    });

    this.blockCard(newpass);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
