import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';




@NgModule({
    declarations: [UserComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2SearchPipeModule
    ],
    exports: [UserComponent]
})
export class UserModule { }
