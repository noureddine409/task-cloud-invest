import { ApiProperty } from '@nestjs/swagger';

export class Task {
  @ApiProperty({ description: 'The name of the task' })
  taskName: string;

  @ApiProperty({ description: 'The due date of the task' })
  taskDueDate: string;

  @ApiProperty({ description: 'The category of the task' })
  taskCategory: string;

  @ApiProperty({ description: 'The priority of the task' })
  taskPriority: string;

  @ApiProperty({ description: 'The date the task was created', required: false })
  createdAt?: Date;

  @ApiProperty({ description: 'The date the task was last updated', required: false })
  updatedAt?: Date;
}
