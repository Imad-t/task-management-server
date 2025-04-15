import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { createTaskDto } from './dto/createTaskDto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksSerive: TasksService){

    }
    @Get()
    getAllTasks():Task[] {
        return this.tasksSerive.getAllTasks();
    }

    @Post()
    createTask(@Body() createTaskDto: createTaskDto): Task {
        return this.tasksSerive.createTask(createTaskDto);
    }
}
