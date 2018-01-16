import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng2ImgToolsModule } from 'ng2-img-tools'

import { AppComponent } from './app.component';
import { ListTasksComponent } from './list-tasks/list-tasks.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { AuthComponent } from './auth/auth.component';

import { routing, appRoutingProviders } from './app.routing';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { TaskService } from './task.service';
import { AuthService } from './auth.service';
import {Md5} from 'ts-md5/dist/md5';

@NgModule({
  declarations: [
    AppComponent,
    ListTasksComponent,
    AddTaskComponent,
    EditTaskComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    ReactiveFormsModule,
    Ng2ImgToolsModule
  ],
  providers: [appRoutingProviders, TaskService, AuthService,
    Md5 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
