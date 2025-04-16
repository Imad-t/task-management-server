import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from "uuid";
import { createTaskDto } from './dto/createTaskDto';
import { GetFilteredTasksDto } from './dto/getFilteredTasks';
@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }
    
    getFilteredTasks(filterDto: GetFilteredTasksDto): Task[] {
        const { status, search } = filterDto;
        let tasks = this.getAllTasks();
        if(status){
            tasks = tasks.filter((task) => task.status === status);
        }
        if (search) {
            tasks = tasks.filter(task => 
                task.title.includes(search) || task.description.includes(search)
            )
        }
        return tasks;
    }

    getTaskById(id: string): Task {
        const task = this.tasks.find((task) => task.id === id);
        if (!task) {
            throw new NotFoundException(`Task with Id ${id} not found`);
        }
        return task;
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

    updateTaskStatus(id: string, status: TaskStatus): void {
        const task = this.getTaskById(id);
        task.status = status; // update the status of the task

    }

    deleteTask(id: string) {
        const task = this.getTaskById(id);
        this.tasks = this.tasks.filter((t) => t.id !== id);
    }
}
