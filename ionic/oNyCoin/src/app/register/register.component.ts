/**
 * Created by bryan on 6-12-2018.
 */
import {UserService} from '../services/user.service';
import {Component, HostListener, OnInit} from '@angular/core';
import {Web3Service} from "../util/web3.service";
import {Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
    moduleId: module.id,
    selector: 'rg-register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css'],
})


export class RegisterComponent {
    Email = new FormControl();
    EmailInput: string;
    FirstNameInput: string;
    LastNameInput: string;
    passwordInput: string;
    passwordRepeatInput: string;
    dateOfBirthInput: string;

    visible: boolean = true;
    breakpoint: number = 520;
    date: Date;

    constructor(public userService: UserService, private Web3Service: Web3Service, private router: Router, private formBuilder: FormBuilder) {

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

    goToRegister(FirstName, LastName, Email, DateOfBirth, Password) {
        console.log(this.Web3Service.createWallet());
        let wallet_address = this.Web3Service.createWallet().address;

        this.userService.addUser(FirstName, LastName, Email, this.date, Password, wallet_address).subscribe(
            response => {
                console.log(response);
                this.router.navigate(['/addcard'])
            },
            err => console.log(err)
        );
    }
}
