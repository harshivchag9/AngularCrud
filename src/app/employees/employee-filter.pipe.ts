import { Employee } from './../models/employee.model';
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name:'employeeFilter',
  pure: true
})
export class  EmployeeFilterPipe implements PipeTransform{
  transform(employees:Employee[], searchTerm:string):Employee[] {
      if(!employees || !searchTerm){
        return employees;
      }

      return employees.filter(employee => employee.name?.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) !== -1);
  }
}
