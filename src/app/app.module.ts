import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Routes,RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { routing } from './app.routing';
import { FormsModule }   from '@angular/forms';
import { AuthGuard } from './_guards/index';
import { customHttpProvider, NullDefaultValueDirective } from './_helpers/index';
import { AuthenticationService,AlertService, NoteBookService } from './_services/index'

import { AlertComponent } from './_directives/index';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminNavbarComponent } from './admin/layout/admin-navbar/admin-navbar.component';
import { AddFileComponent } from './admin/add-file/add-file.component';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { NoteDetailComponent } from './admin/note-detail/note-detail.component';
import { NoteActionComponent } from './admin/note-action/note-action.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    
    HomeComponent,
    LoginComponent,
    AdminNavbarComponent,
    AddFileComponent,
    FileSelectDirective,
    NoteDetailComponent,
    NoteActionComponent 
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
  ],
  providers: [
 
    AuthGuard,
    AuthenticationService,
    NoteBookService,
    AlertService,
    customHttpProvider,
    NullDefaultValueDirective,
    {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})


export class AppModule { }
