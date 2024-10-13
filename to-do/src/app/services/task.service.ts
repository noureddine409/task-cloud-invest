import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = environment.apiUrl + '/tasks';

  constructor(private http: HttpClient) {}

  // Add a new task by making a POST request
  addTask(task: Task): Observable<{ key: string; value: Task }> {
    return this.http.post<{ key: string; value: Task }>(this.apiUrl, task);
  }

  // Delete a task by making a DELETE request
  deleteTask(key: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${key}`);
  }

  // Update a task by making a PUT request
  updateTask(key: string, newValue: Partial<Task>): Observable<{ key: string; value: Task }> {
    return this.http.put<{ key: string; value: Task }>(`${this.apiUrl}/${key}`, newValue);
  }

  // Get all tasks by making a GET request
  getAllTasks(): Observable<{ key: string; value: Task }[]> {
    return this.http.get<{ key: string; value: Task }[]>(this.apiUrl);
  }
}
