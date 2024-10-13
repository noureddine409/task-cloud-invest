import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ModalController } from '@ionic/angular';
import { Task, TaskRecord } from '../../models/task.model';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})
export class UpdateTaskPage implements OnInit {

  @Input() task!: TaskRecord;

  categories = ['work', 'personal'];
  selectedCategory = '';

  taskName = '';
  taskDueDate: string = ''; // Keeping it as string for proper binding with ion-datetime
  taskPriority: 'low' | 'middle' | 'high' = 'high'; // Set the priority type explicitly

  newTaskObj!: Task;

  showDatepicker = false;
  isSubmitted = false; // Track submission attempt

  constructor(public modalCtrl: ModalController, public taskService: TaskService) { }

  ngOnInit(): void {
    this.taskName = this.task.value.taskName;
    this.taskPriority = this.task.value.taskPriority;
    this.taskDueDate = this.formatDateForInput(this.task.value.taskDueDate); // Format as string for date input
    this.selectedCategory = this.task.value.taskCategory;
  }

  // Helper function to format date to 'MMM D, YYYY'
  formatDateForInput(date: Date): string {
    const d = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
    return d.toLocaleDateString('en-US', options);
  }

  selectCategory(index: number) {
    this.selectedCategory = this.categories[index];
  }

  onDateSelected(event: any) {
    this.taskDueDate = this.formatDateForInput(new Date(event.detail.value)); // Format selected date
    this.showDatepicker = false; // Close the datepicker
  }

  toggleDatepicker() {
    this.showDatepicker = !this.showDatepicker;
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  async update() {
    this.isSubmitted = true; // Mark the form as submitted

    if (this.isValid()) {
      this.newTaskObj = {
        taskName: this.taskName,
        taskDueDate: new Date(this.taskDueDate), // Ensure this is a Date object
        taskPriority: this.taskPriority,
        taskCategory: this.selectedCategory
      };

      let uid = this.task.key;
      await this.taskService.updateTask(uid, this.newTaskObj).subscribe(
        response => {
          this.modalCtrl.dismiss({
            key: uid,
            value: this.newTaskObj
          })
        }
      )
      
    } else {
      console.log("Form is invalid");
      // Form is invalid, validation messages will be shown
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
