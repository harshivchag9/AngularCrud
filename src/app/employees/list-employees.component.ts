import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  // employeeToDisplay?: Employee;
  // private arrayIndex:number = 1;
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];

  private _searchTerm: string = "";
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.filtereEmployees(value);
  }

  filtereEmployees(searchString: string) {
    return this.employees.filter(employee => employee.name?.toLocaleLowerCase()
      .indexOf(searchString.toLocaleLowerCase()) !== -1);
  }

  constructor(
    private _router: Router,
    private _route: ActivatedRoute) {
    this.employees = this._route.snapshot.data['employeeList'];
    if (this._route.snapshot.queryParamMap.has('searchTerm')) {
      this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm') as string;
    }
    else {
      this.filteredEmployees = this.employees;
    }
  }

  onDeleteNotification(id: number) {
    const i = this.filteredEmployees.findIndex(e => e.id === id);
    if (i !== -1) {
      this.filteredEmployees.splice(i, 1);
    }
  }

  ngOnInit() {

  }


  // this.employeeToDisplay = this.employees[0];
  //}
  // nextEmployee():void{
  //   if(this.arrayIndex <=2 ){
  //     this.employeeToDisplay = this.employees[this.arrayIndex];
  //     this.arrayIndex++;
  //   }
  //   else{
  //     this.employeeToDisplay=this.employees[0];
  //     this.arrayIndex  = 1;
  //   }
  // }
}
