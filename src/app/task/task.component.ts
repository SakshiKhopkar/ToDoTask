import { Component, OnInit } from '@angular/core';
import { FormBuilder ,Validators} from '@angular/forms';
import{Taskservice} from './task.service'
import {  Router } from '@angular/router';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private fb:FormBuilder,private taskservice:Taskservice,private router:Router) { }

  ngOnInit(): void {
    this.getAllTasks();
    this.isNewList=true;
  }

  isNewList:boolean=true;
  TaskForm=this.fb.group({
    id:[,Validators.required],
    name:['',Validators.required],
    duedate:['',Validators.required]
   });

   isUpdatebtn:boolean=false;

   get id(){
    return this.TaskForm.get('id');
  }
  get name(){
    return this.TaskForm.get('name');
  }
  get duedate(){
    return this.TaskForm.get('duedate');
  }
  TaskList:any=[];


  getAllTasks(){
    this.isNewList=true;
    this.TaskList=[];
    this.TaskList=this.taskservice.getAllTasks();
    }
  edit(task:any){

      this.isUpdatebtn=true;
      this.TaskForm.setValue({
        id:task.id,
        name:task.name,
        duedate:task.duedate
        
      });
      
    }

    delete(id:number){
      let result=confirm('Do you want to delete id '+id+' ?');
      if(result==true)
      {
        this.taskservice.deleteTasks(id);
        this.getAllTasks();
      }
    
    }

    saveData(){
      let task=this.TaskForm.value;
      if(!this.isUpdatebtn){
        this.taskservice.addTasks(task);
      }
     else{
        this.taskservice.updateTasks(task);
        this.isUpdatebtn=false;
     }
     this.TaskForm.reset();
     this.getAllTasks();
    }


    completed(id:number){
       this.taskservice.completedTask(id);

        
          alert("added to completed Task list");
        
        this.getAllTasks();
    }

    clearForm()
  {
    this.TaskForm.reset();
    this.isUpdatebtn=false;
  }


  Showcompleted(){
    this.isNewList=false;
    this.TaskList=[];
   this.TaskList=this.taskservice.getcompletedlist();
  }
}
