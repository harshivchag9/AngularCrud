import { Department } from './../models/department.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  @ViewChild('employeeForm') public createEmployeeForm?: NgForm;
  previewPhoto = false;
  panelTitle?:string;
  constructor(private _employeeService: EmployeeService,
              private _router : Router,
              private _route : ActivatedRoute  ) { }
  employees?:Employee;
  departments:Department[] =[
    {id:1,name:'Help Desk'},
    {id:2,name:'HR'},
    {id:3,name:'IT'},
    {id:4,name:'Payroll'}
  ]
  ngOnInit(): void {
    this._route.paramMap.subscribe(parameterMap => {
     const id =  Number(parameterMap.get('id'));
     this.getEmployee(id);
    });
  }

  private getEmployee(id:number){
    if(id === 0){
      this.employees = {
        email:'',
        department:"",
      };
      this.panelTitle = 'Create Employee';
      this.createEmployeeForm?.reset();
    }
    else{
      this.panelTitle = 'Edit Employee';
      this.employees = Object.assign({}, this._employeeService.getEmployee(id));
    }
  }

  saveEmployee():void{
    const newEmployee: Employee = Object.assign({},this.employees);
    this._employeeService.save(newEmployee);
    this.createEmployeeForm?.reset();
    this._router.navigate(['list']);
  }

  togglePhotoPreview(){
    this.previewPhoto = !this.previewPhoto
  }
}
