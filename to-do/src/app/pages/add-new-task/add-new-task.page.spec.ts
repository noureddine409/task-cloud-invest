import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNewTaskPage } from './add-new-task.page';

describe('AddNewTaskPage', () => {
  let component: AddNewTaskPage;
  let fixture: ComponentFixture<AddNewTaskPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
