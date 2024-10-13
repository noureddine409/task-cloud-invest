import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { FirestoreService } from './task.service';
import { Task } from './task.model';
import { TaskDto } from './task.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('tasks') // Group the routes under "tasks" in Swagger
@Controller('tasks')
export class TaskController {
  constructor(private readonly firestoreService: FirestoreService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: TaskDto }) // Add the body schema for Swagger
  @ApiResponse({ status: 201, description: 'The task has been successfully created.' })
  async createTask(@Body() task: TaskDto): Promise<{ key: string; value: Task }> {
    return this.firestoreService.createTask(task);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all tasks' })
  @ApiResponse({ status: 200, description: 'List of all tasks.', type: [Task] })
  async getAllTasks(): Promise<{ key: string; value: Task }[]> {
    return this.firestoreService.getAllTasks();
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Update a specific task' })
  @ApiParam({ name: 'id', description: 'ID of the task to update' }) // Specify the param in Swagger
  @ApiBody({ type: TaskDto }) // Add the body schema for Swagger
  @ApiResponse({ status: 200, description: 'The task has been successfully updated.' })
  async updateTask(@Param('id') id: string, @Body() task: TaskDto): Promise<{ key: string; value: Task }> {
    return this.firestoreService.updateTask(id, task);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific task' })
  @ApiParam({ name: 'id', description: 'ID of the task to delete' }) // Specify the param in Swagger
  @ApiResponse({ status: 204, description: 'The task has been successfully deleted.' })
  async deleteTask(@Param('id') id: string): Promise<void> {
    return this.firestoreService.deleteTask(id);
  }
}
