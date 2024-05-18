import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileComponent} from "./profile.component";
import {ProfileRoutingModule} from "./profile-routing.module";
import {MatButton} from "@angular/material/button";
import {AppModule} from "../../app.module";
import {SafePipe} from "../../shared/pipes/safe.pipe";


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatButton,
    SafePipe
  ]
})
export class ProfileModule { }
