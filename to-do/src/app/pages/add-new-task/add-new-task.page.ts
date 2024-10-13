import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model'; // Import the Task interface
import { response } from 'express';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.page.html',
  styleUrls: ['./add-new-task.page.scss'],
})
export class AddNewTaskPage {

  categories = ['work', 'personal'];
  selectedCategory = '';

  taskName = '';
  taskDueDate: string = ''; // Keeping it as string for binding initially
  displayTaskDueDate = '';
  taskPriority: 'low' | 'middle' | 'high' = 'high'; // Set the priority type explicitly

  newTaskObj!: Task; // Explicitly type as Task

  showDatepicker = false;
  isSubmitted = false; // Flag to track if the form has been submitted

  constructor(public modalCtrl: ModalController, public taskService: TaskService) {}

  selectCategory(index: number) {
    this.selectedCategory = this.categories[index];
  }

  toggleDatepicker() {
    this.showDatepicker = !this.showDatepicker;
  }

  formatTaskDueDate() {
    if (this.taskDueDate) {
      const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      };
      this.displayTaskDueDate = new Date(this.taskDueDate).toLocaleDateString('en-US', options);
      this.showDatepicker = false;
    }
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  async addTask() {
    this.isSubmitted = true; // Mark as submitted to show validation errors

    if (this.isValid()) {
      this.newTaskObj = {
        taskName: this.taskName,
        taskDueDate: new Date(this.taskDueDate), // Ensure this is a Date object
        taskPriority: this.taskPriority,
        taskCategory: this.selectedCategory
      };

      console.log(this.newTaskObj);

      // Call the backend service to add the task
    this.taskService.addTask(this.newTaskObj).subscribe({
      next: (response) => {
        console.log('Task added:', response);
        // Dismiss modal and return the task data to parent component
        this.modalCtrl.dismiss(response);
      },
      error: (error) => {
        console.error("Error adding task:", error);
      },
      complete: () => {
        console.log('Task addition completed');
      }
    });
      
      
    } else {
      console.log("Form is invalid");
      // No need to submit the task if the form is invalid
    }
  }

  isValid(): boolean {
    return (
      this.taskName.trim() !== '' && // Task name should not be empty
      this.taskDueDate !== '' && // Due date must be selected
      this.selectedCategory !== '' // Category must be selected
    );
  }
}
