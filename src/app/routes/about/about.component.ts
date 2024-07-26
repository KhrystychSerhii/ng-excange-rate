import { Component } from "@angular/core";
import {CommonModule} from "@angular/common";
import {Observable, of} from "rxjs";

import {SubTask, Task, TaskService} from "../../services";

import {get} from "../../libs/helpers";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  tasks$: Observable<Array<Task>> = of([]);

  constructor(
    private taskService: TaskService,
  ) {
    this.createTasksFlow();
  }


  trackById(index: number, item: any): number {
    return item.id;
  }

  isTaskFullyCompleted(task: Task | SubTask): boolean {
    const subTasks: Array<SubTask> = get(task, ['subTasks'], []);
    if (subTasks.length === 0) {
      return false;
    }
    return subTasks.filter((s: SubTask) => s.completed).length === subTasks.length;
  }

  private createTasksFlow(): void {
    this.tasks$ = this.taskService.getTasks();
  }
}
