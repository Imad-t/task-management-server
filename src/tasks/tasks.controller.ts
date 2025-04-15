import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

    @Get('/:id')
    getTaskbyId(@Param('id') id:string ): Task {
        return this.tasksSerive.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: createTaskDto): Task {
        return this.tasksSerive.createTask(createTaskDto);
    }
    
}
