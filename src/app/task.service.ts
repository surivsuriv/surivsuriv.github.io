import { Injectable } from '@angular/core';
import { Task } from './task'
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable()

export class TaskService {

    constructor(private http: Http) { }


    get(params) {

        return this.http.get('https://uxcandy.com/~shapoval/test-task-backend/', {
            params
        })
            .toPromise()
            .then((response) => response.json().message)
            .catch(this.handleError);
    }

    create(task) {

        const headers = new Headers({});
        let options = new RequestOptions({ headers });
        const formData = new FormData();
        formData.append('username', task.username);
        formData.append('email', task.email);
        formData.append('text', task.text);
        formData.append('image', task.image);

        return this.http
            .post('https://uxcandy.com/~shapoval/test-task-backend/create?developer=ArtemAvanesyan',
            formData, options)
            .toPromise()
            .then((res) => {
                let data = res.json();
                if (data.status === 'error') {
                    alert("Ошибка при создании записи");
                }
            })
            .catch(this.handleError);
    }

    update(task, taskId) {
        let params_string = Md5.hashStr('status=' + task.status + '&text=' + task.text + '&token=beejee')+'';
        
        const headers = new Headers({});
        let options = new RequestOptions({ headers });
        const formData = new FormData();
        
        formData.append('token', 'beejee');
        formData.append('signature', params_string);
        formData.append('text', task.text);
        formData.append('status', task.status);

        return this.http
            .put("https://uxcandy.com/~shapoval/test-task-backend/edit/" + taskId + 
            '/?developer=ArtemAvanesyan',
            formData, options)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }


    private handleError(error: any): Promise<any> {
        console.error('Ошибка', error);
        return Promise.reject(error.message || error);
    }
}