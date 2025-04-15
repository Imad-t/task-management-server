import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from "uuid";
import { createTaskDto } from './dto/createTaskDto';
@Injectable()
export class TasksService {
   private tasks: Task[] = [];

   getAllTasks(): Task[] {
    return this.tasks;
   }

   createTask(createTaskDto: createTaskDto): Task {
    const { title, description } = createTaskDto; // destructure the properties from the DTO
    const task: Task = {
        id: uuid(),
        title,
        description,
        status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;// return the created task to the client
   }
}
