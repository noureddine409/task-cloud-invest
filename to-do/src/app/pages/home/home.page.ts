import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNewTaskPage } from '../add-new-task/add-new-task.page';
import { TaskService } from '../../services/task.service';
import {Task} from '../../models/task.model'
import { UpdateTaskPage } from '../update-task/update-task.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {



  taskList: {key: string, value: Task}[] = [];

  today: number = Date.now();

  constructor(public modalCtlr: ModalController, public taskService: TaskService) {}

  ngOnInit(): void {
    this.getAllTasks()
  }

  async addTask() {
    const modal = this.modalCtlr.create({
      component: AddNewTaskPage,
    });
    (await modal).onDidDismiss().then(newTask =>{
      this.getAllTasks()
    })
    return (await modal).present()
  }

  getAllTasks(){
    this.taskService.getAllTasks().subscribe(response => {
      this.taskList = response
      console.log(this.taskList)
    })
  }

  delete(key: string) {
      this.taskService.deleteTask(key).subscribe(()=> {
        this.getAllTasks();
      })
  }

  async update(selectedTask: {key: string, value: Task}) {
    const modal = await this.modalCtlr.create({
      component: UpdateTaskPage,
      componentProps: {
        task: selectedTask
      }
    })
    modal.onDidDismiss().then( ()=>
        this.getAllTasks()
    )
    return (await modal).present();
  }
}
