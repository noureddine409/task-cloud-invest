export interface Task {
    taskName: string;       // Name of the task
    taskDueDate: Date;     // Due date of the task
    taskPriority: 'low' | 'middle' | 'high'; // Priority can only be one of these values
    taskCategory: string;   // Category of the task
}

export interface TaskRecord {
  key: string;
  value: Task;
}