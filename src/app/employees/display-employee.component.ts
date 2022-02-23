import { EmployeeService } from './employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from './../models/employee.model';
import { Component, Input, OnInit, Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {
  @Input() employee?: Employee;
  @Input() searchTerm?: string;
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();
  confirmDelete = false;


  selectedEmployeeId?: number;

  constructor(private _route: ActivatedRoute,
              private _router : Router,
              private _emplyeeService: EmployeeService) { }

  ngOnInit(): void {
    this.selectedEmployeeId=Number(this._route.snapshot.paramMap.get('id'));
  }

  viewEmployee(){
    this._router.navigate(['/employees', this.employee?.id],{
      queryParams: { 'searchTerm':this.searchTerm}
    });
  }

  editEmployee(){
    this._router.navigate(['/edit', this.employee?.id]);
  }

  deleteEmployee(){
    this._emplyeeService.deleteEmployee(this.employee?.id!);
    this.notifyDelete.emit(this.employee?.id);
  }

}
