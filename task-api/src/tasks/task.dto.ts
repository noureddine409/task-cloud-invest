import { IsString, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @ApiProperty({
    description: 'The name of the task',
    example: 'Finish project report',
  })
  @IsString()
  @IsNotEmpty({ message: 'Task name is required' })
  taskName: string;

  @ApiProperty({
    description: 'The category of the task',
    example: 'Work',
  })
  @IsString()
  @IsNotEmpty({ message: 'Category is required' })
  taskCategory: string;

  @ApiProperty({
    description: 'The priority of the task',
    example: 'High',
  })
  @IsString()
  @IsNotEmpty({ message: 'Priority is required' })
  taskPriority: string;

  @ApiProperty({
    description: 'The due date of the task in ISO format',
    example: '2024-10-20',
  })
  @IsDateString({}, { message: 'Invalid due date format' })
  taskDueDate: string;
}
