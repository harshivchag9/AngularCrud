import { Injectable } from '@angular/core';
import { EmployeeService } from './employee.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, catchError, of } from 'rxjs';

@Injectable()
export class EmployeeDetailsGuardService implements CanActivate{
  constructor(private _employeeService: EmployeeService,
              private _router : Router){

  }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this._employeeService.getEmployee(Number(route.paramMap.get('id'))).pipe(
          map(employee => {
            const employeeExist = !!employee;

            if(employeeExist){
              return true;
            }
            else{
              this._router.navigate(['notfound']);
              return false;
            }
          }),
          catchError((err) => {
            console.log(err);
            return of(false);
          })
        );
    }
}
