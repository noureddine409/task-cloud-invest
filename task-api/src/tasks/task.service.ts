import { Injectable } from '@nestjs/common';
import { db } from 'src/firebase.service';
import { Task } from './task.model';
import { NotFoundException } from 'src/exceptions/not-found.exception';

@Injectable()
export class FirestoreService {
    async createTask(task: Task): Promise<{ key: string; value: Task }> {
        const newTask = {
          ...task,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
    
        const taskDoc = await db.collection('tasks').add(newTask);
        return { key: taskDoc.id, value: newTask };
      }
    
      async getAllTasks(): Promise<{ key: string; value: Task }[]> {
        const tasksSnapshot = await db.collection('tasks').get();
        const tasks = tasksSnapshot.docs.map(doc => ({
          key: doc.id,
          value: doc.data() as Task,
        }));
        return tasks;
      }
    
      async updateTask(key: string, task: Partial<Task>): Promise<{ key: string; value: Task }> {
        const taskDoc = await db.collection('tasks').doc(key);
        const taskExists = await taskDoc.get();
        if (!taskExists.exists) {
            throw new NotFoundException(`Task with ID ${key} not found`);
        }
        const updatedTask = {
          ...task,
          updatedAt: new Date(),
        };
        await db.collection('tasks').doc(key).update(updatedTask);
        const updatedtaskDoc = await db.collection('tasks').doc(key).get();
        return { key: updatedtaskDoc.id, value: updatedtaskDoc.data() as Task };
      }
    
      async deleteTask(key: string): Promise<void> {
        const taskDoc = await db.collection('tasks').doc(key);
        const taskExists = await taskDoc.get();
        if (!taskExists.exists) {
            throw new NotFoundException(`Task with ID ${key} not found`);
        }
        await taskDoc.delete();
    }
}
