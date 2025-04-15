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

    getTaskById(id: string): Task {
        const task = this.tasks.find((task) => task.id === id);
        if (!task) {
            throw new Error(`Task with ID "${id}" not found`);
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

    deleteTask(id: string): string {
        try {
            const task = this.tasks.find((task) => task.id === id);
            if (!task) {
                throw new Error(`Task with ID "${id}" not found`);
            }else{
            this.tasks = this.tasks.filter((t) => t.id !== id);
            return `Task with ID "${id}" deleted successfully`;
        }
           
        }
        catch (error) {
            return `Error deleting task with ID "${id}": ${error.message}`;
        }
    
    }
}
