/**
 * Created by bryan on 5-12-2018.
 */
import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Web3Service} from "../util/web3.service";
import {Router} from "@angular/router";


@Component({
    moduleId: module.id,
    selector: 'rg-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
})


export class LoginComponent implements OnInit, OnDestroy {
    visible: boolean = true;
    breakpoint: number = 520;
    emailInput: string;
    passwordInput: string;
    public balance;

    constructor(public userService: UserService,
                private router: Router) {

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
        this.balance.style.display = 'none'
    }

    ngOnDestroy(): void {
        this.balance = document.getElementsByClassName('balanceBoxContainer')[0];
        this.balance.style.display = 'block'
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

    login(username, password) {
        this.userService.login(username, password).subscribe(
            response => {
                this.router.navigate(['/home']);
            },
            err => console.log(err)
        );
    }

    goToRegister() {
        this.router.navigate(['/register']);
    }
}
