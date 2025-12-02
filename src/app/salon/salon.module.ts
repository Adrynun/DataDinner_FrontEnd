import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalonRoutingModule } from './salon-routing.module';
import { SalonComponent } from './salon/salon.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SalonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SalonRoutingModule,
    SharedModule
  ]
})
export class SalonModule { }
