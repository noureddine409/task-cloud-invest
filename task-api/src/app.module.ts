import { Module } from '@nestjs/common';
import { TaskModule } from './tasks/task.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [TaskModule, ConfigModule.forRoot()],
})
export class AppModule { }
