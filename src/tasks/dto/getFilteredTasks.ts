import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../task.model";

export class GetFilteredTasksDto {
    @IsOptional() @IsIn([TaskStatus.OPEN,TaskStatus.OPEN,TaskStatus.IN_PROGRESS]) status: string;
    @IsOptional() @IsNotEmpty() search: string;
}