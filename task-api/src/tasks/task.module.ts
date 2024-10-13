import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { FirestoreService } from './task.service';

@Module({
  controllers: [TaskController],
  providers: [FirestoreService],
})
export class TaskModule {}
