import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule, MatMenuTrigger} from "@angular/material/menu";
import {MatListItem, MatListOption, MatNavList, MatSelectionList} from "@angular/material/list";
import {MatLine} from "@angular/material/core";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import {AngularFireModule} from "@angular/fire/compat";
import { UploadComponent } from './pages/upload/upload.component';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {SafePipe} from "./shared/pipes/safe.pipe";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    UploadComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatMenuTrigger,
        MatMenuModule,
        MatSelectionList,
        MatListOption,
        MatNavList,
        MatListItem,
        MatLine,
        AngularFireModule.initializeApp({
            "projectId": "video-megoszto",
            "appId": "1:565113204742:web:3cb0fa410cae7b01295387",
            "storageBucket": "video-megoszto.appspot.com",
            "apiKey": "AIzaSyBX-BvuUjJlp_c9M7JGCe-NmXT8PNA01IE",
            "authDomain": "video-megoszto.firebaseapp.com",
            "messagingSenderId": "565113204742",
            "measurementId": "G-FMG7JN3VSV"
        }),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage()),
        ReactiveFormsModule,
        MatCard,
        MatCardActions,
        MatCardContent,
        MatCardTitle,
        MatFormField,
        MatInput,
        MatLabel,
        MatSuffix
    ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
