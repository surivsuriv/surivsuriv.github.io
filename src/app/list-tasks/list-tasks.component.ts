import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css']
})
export class ListTasksComponent implements OnInit {
  tasks: any;
  page: number;
  params: any;
  totalTaskCount: number;
  sortAsc: boolean;
  sortField: string;

  constructor(private router: Router, private taskSerivice: TaskService) {
    this.tasks = [];
    this.params = {
      developer: 'ArtemAvanesyan'
    };
    this.page = 1;
    this.sortAsc = true;
    this.sortField = 'username';
  }


  ngOnInit() {
    this.params.page = 1;
    this.params.sort_field = this.sortField;
    this.params.sort_direction = this.sortAsc ? 'asc' : 'desc';
    this.taskSerivice.get(this.params).then((data) => {
      this.tasks = data.tasks;
      this.totalTaskCount = data.total_task_count;
    });
  }

  previousPage() {
    if (this.page - 1 === 0) {
      return;
    }

    this.page -= 1;
    this.params.page = this.page;
    this.params.sort_field = this.sortField;
    this.params.sort_direction = this.sortAsc ? 'asc' : 'desc';
    this.taskSerivice.get(this.params).then((data) => {
      this.tasks = data.tasks;
    });
  }

  nextPage() {
    let totalPages = Math.ceil(this.totalTaskCount / 3);

    if (totalPages === this.page) {
      return;
    }

    this.page += 1;
    this.params.page = this.page;
    this.params.sort_field = this.sortField;
    this.params.sort_direction = this.sortAsc ? 'asc' : 'desc';

    this.taskSerivice.get(this.params).then((data) => {
      this.tasks = data.tasks;
    });
  }

  getStatusTask(item) {
    return item.status === 10 ? 'Выполнена' : 'Невыполнена';
  }

  sort(field) {
    if (field === this.sortField) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortAsc = true;
    }

    this.page = 1;
    this.sortField = field;
    this.params.page = 1;
    this.params.sort_field = field;
    this.params.sort_direction = this.sortAsc ? 'asc' : 'desc';
    this.taskSerivice.get(this.params).then((data) => {
      this.tasks = data.tasks;
    });
  }

  toEditTask(item) {
    this.router.navigate(['/editTask/' + item.id], { queryParams: { text: item.text } })
  }
}
