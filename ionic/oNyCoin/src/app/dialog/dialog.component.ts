/**
 * Created by bryan on 6-12-2018.
 */
import {UserService} from '../services/user.service';
import {
    Component,
    OnInit,
    Input,
    Output,
    OnChanges,
    EventEmitter,
    HostListener,
    OnDestroy,
    Inject
} from '@angular/core';
import {Web3Service} from "../util/web3.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {EncrDecrService} from "../services/EncrDecr.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface DialogData {
    animal: string;
    name: string;
}

@Component({
    moduleId: module.id,
    selector: 'rg-dialog',
    templateUrl: 'dialog.component.html',
    styleUrls: ['dialog.component.css']
})


export class DialogComponent implements OnInit, OnDestroy {


    @Input() closable = true;
    @Input() modalVisible: boolean;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    visible: boolean = true;
    breakpoint: number = 520;

    constructor(public userService: UserService,
                public web3Service: Web3Service,
                private router: Router,
                private formBuilder: FormBuilder,
                private EncrDecr: EncrDecrService,
                public dialogRef: MatDialogRef<DialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: DialogData) {

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
        this.web3Service.transactionMade = false;
        document.getElementById('transaction').innerHTML = "";
        this.dialogRef.close();
    }

    newTransaction() {
        // this.sendMessage();

        // this.showDialog = !this.showDialog;

    }
}
