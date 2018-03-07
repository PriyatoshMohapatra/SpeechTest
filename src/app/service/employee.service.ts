import { Injectable, NgZone } from '@angular/core';
import { Employee } from '../model/Employee';


@Injectable()
export class EmployeeService {
public employees:Employee[] = [];
  registerEmployee(employee:Employee):void{
      this.employees.push(employee);
  }

  getEmployees():Employee[] {
    return this.employees;
  }
  reset():void{
    this.employees = [];
  }
}