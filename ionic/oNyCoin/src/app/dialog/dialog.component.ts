/**
 * Created by bryan on 6-12-2018.
 */
import {UserService} from '../services/user.service';
import {Component, OnInit, Input, Output, OnChanges, EventEmitter, HostListener, OnDestroy} from '@angular/core';
import {Web3Service} from "../util/web3.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {EncrDecrService} from "../services/EncrDecr.service";
import {animate, style, transition, trigger} from "@angular/animations";


@Component({
    moduleId: module.id,
    selector: 'rg-dialog',
    templateUrl: 'dialog.component.html',
    styleUrls: ['dialog.component.css'],
    animations: [
        trigger('dialog', [
            transition('void => *', [
                style({transform: 'scale3d(.3, .3, .3)'}),
                animate(100)
            ]),
            transition('* => void', [
                animate(100, style({transform: 'scale3d(.0, .0, .0)'}))
            ])
        ])
    ]
})


export class DialogComponent implements OnInit, OnDestroy {


    @Input() closable = true;
    @Input() modalVisible: boolean;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    visible: boolean = true;
    breakpoint: number = 520;

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

    }

    ngOnDestroy(): void {

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

    close() {
        this.modalVisible = false;
        this.visibleChange.emit(this.modalVisible);
    }
}
