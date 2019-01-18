/**
 * Created by bryan on 6-12-2018.
 */
import {UserService} from '../services/user.service';
import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Web3Service} from "../util/web3.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {EncrDecrService} from "../services/EncrDecr.service";


@Component({
    moduleId: module.id,
    selector: 'rg-register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css'],
})


export class RegisterComponent implements OnInit, OnDestroy {
    Email = new FormControl();
    public EmailInput: string;
    public FirstNameInput: string;
    public LastNameInput: string;
    public Password;
    passwordInput: string;
    passwordRepeatInput: string;
    dateOfBirthInput: string;

    visible: boolean = true;
    breakpoint: number = 520;
    date: Date;
    public balance;

    constructor(public userService: UserService,
                private Web3Service: Web3Service,
                private router: Router,
                private formBuilder: FormBuilder,
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

        this.balance = document.getElementsByClassName('balanceBoxContainer')[0];
        this.balance.style.display = 'none';
        // this.balance = this.Web3Service.balance;
        this.Web3Service.loadContract()
    }

    ngOnDestroy(): void {
        this.balance = document.getElementsByClassName('balanceBoxContainer')[0];
        this.balance.style.display = 'block';

        window.location.reload();
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

        let wallet_address = this.Web3Service.createWallet().address;
        let wallet_key = this.EncrDecr.set(Email.substr(0, 2).toString() + LastName.substr(0, 2).toString(), this.Web3Service.createWallet().privateKey);



        this.userService.addUser(FirstName, LastName, Email, this.date, Password, wallet_address, btoa(wallet_key)).subscribe(
            response => {
                console.log(response);
                this.login(Email, Password);
            },
            err => console.log(err)
        );
    }

    login(username, password) {
        this.userService.login(username, password).subscribe(
            response => {
                this.Web3Service.loadContract();
                // this.router.navigate(['/home']);
                this.router.navigate(['/addcard'])
            },
            err => console.log(err)
        );
    }
}
