import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";

import { ListTasksComponent } from './list-tasks/list-tasks.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
    { path: '', component: ListTasksComponent, data: { title: 'Список' } },
    { path: 'addTask', component: AddTaskComponent, data: { title: 'Добавление' } },
    { path: 'editTask/:id', component: EditTaskComponent, data: { title: 'Редактирование' } },
    { path: 'auth', component: AuthComponent, data: { title: 'Авторизация' } }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
