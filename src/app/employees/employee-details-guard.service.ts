import { Injectable } from '@angular/core';
import { EmployeeService } from './employee.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";

@Injectable()
export class EmployeeDetailsGuardService implements CanActivate{
  constructor(private _employeeService: EmployeeService,
              private _router : Router){

  }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const employeeExist = !!this._employeeService.getEmployee(Number(route.paramMap.get('id')));

        if(employeeExist){
          return true;
        }
        else{
          this._router.navigate(['notfound']);
          return false;
        }
    }
}
