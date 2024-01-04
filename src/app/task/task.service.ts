import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class Taskservice{


    duedate:Date=new Date('2024-01-10');
    TaskList:any=[];
    constructor(){
        this.TaskList=[
            {id:1,name:"Client Meeting",duedate:this.duedate,status:"new"}
        ];
    }

    public getAllTasks():any{
        const list=[];
        for(let i=0;i<this.TaskList.length;i++){
            if(this.TaskList[i].status=='new'){
                  list.push( this.TaskList[i]);
            }
        }
        return list;
    }

    public addTasks(task:any):any{
        this.TaskList.push({id:task.id,name:task.name,duedate:task.duedate,status:"new"});
    }


    public updateTasks(task:any):any{
        for(let i=0;i<this.TaskList.length;i++){
            if(this.TaskList[i].id==task.id){
                this.TaskList[i].name=task.name;
                this.TaskList[i].duedate=task.duedate;
                this.TaskList[i].status="new";
                break;
            }
        }
    }


    public deleteTasks(id:number){
        let i=0;
        for(;i<this.TaskList.length;i++){
            if(this.TaskList[i].id==id)
            {
              break;
            }
        }
        this.TaskList.splice(i,1);
    }
    completaskList:any=[];
    completedTask(id:number)
    {
        //debugger;
      //  var a=false
        for(let i=0;i<this.TaskList.length;i++){
            if(this.TaskList[i].id===id){
                this.TaskList[i].status="done";
                
                break
            }
        }
       
    }
   
    getcompletedlist(){
        const list=[];
        for(let i=0;i<this.TaskList.length;i++){
            if(this.TaskList[i].status=='done'){
                  list.push( this.TaskList[i]);
            }
        }
        return list;
    }
}