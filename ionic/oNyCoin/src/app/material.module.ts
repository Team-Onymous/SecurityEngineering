/**
 * Created by bryan on 4-12-2018.
 */
import {NgModule} from '@angular/core';
import {
    MatButtonModule, MatCheckboxModule, MatAutocompleteModule, MatDatepickerModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatMenuModule, MatSidenavModule, MatToolbarModule, MatCardModule, MatTabsModule,
    MatChipsModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatDialogModule, MatTooltipModule,
    MatSnackBarModule, MatTableModule, MatSortModule, MatPaginatorModule, MatGridListModule, MatListModule
} from '@angular/material';

@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatAutocompleteModule, MatDatepickerModule, MatFormFieldModule,
        MatInputModule, MatSelectModule, MatMenuModule, MatSidenavModule, MatToolbarModule, MatCardModule, MatTabsModule,
        MatChipsModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatDialogModule, MatTooltipModule,
        MatSnackBarModule, MatTableModule, MatSortModule, MatPaginatorModule, MatGridListModule, MatListModule],
    exports: [MatButtonModule, MatCheckboxModule, MatAutocompleteModule, MatDatepickerModule, MatFormFieldModule,
        MatInputModule, MatSelectModule, MatMenuModule, MatSidenavModule, MatToolbarModule, MatCardModule, MatTabsModule,
        MatChipsModule, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatDialogModule, MatTooltipModule,
        MatSnackBarModule, MatTableModule, MatSortModule, MatPaginatorModule, MatGridListModule, MatListModule],
})
export class MaterialModule {
}
