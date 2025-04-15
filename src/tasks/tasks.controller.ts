import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksSerive: TasksService){

    }
    @Get()
    getAllTasks() {
        return this.tasksSerive.getAllTasks();
    }
}
