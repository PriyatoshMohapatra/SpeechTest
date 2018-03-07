import { Component,Input} from '@angular/core';
import { Employee } from '../model/employee.model';
import { EmployeeService } from '../service/employee.service';

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html'
})

export class EmployeeComponent  {
//@Input() hero: Hero;
 private _page = '';
private registerPage = false;
private employeePage = false;
public employee:Employee;
public employeesData:Employee[];

constructor(private employeeService:EmployeeService){
  this.resetEmployee();
}
resetEmployee(){
      this.employee = { 
                  empId:'',
                  empFirstName:'',
                  empLastName:'',
                  gender:''
    };
}
  @Input()
  set page(name: string) {
    this._page = (name && name.trim()) || '<no name set>';
    this.registerPage = false;
    this.employeePage = false;
    if(this._page === 'register'){
      this.resetEmployee();
      this.registerPage = true;
      return;
    }
    if(this._page === 'employee'){
      this.employeePage = true;
      return;
    }
  }

  get page(): string { return this._page; }

  register():void{
    debugger
    if(this.employee && 
        this.employee.empFirstName !== '' && 
        this.employee.empLastName !== ''){
      this.employee.empId = Math.random().toString(36).substring(7);
      this.employeeService.registerEmployee(this.employee);
      this.registerPage = false;
      this.employeePage = true;
      this.loadEmployees();
    }
  }
  loadEmployees():void{
    this.employeesData = this.employeeService.getEmployees();
  }
  goToEdit(id:string):void{
      let tempEmp = this.employeesData.find(i=>i.empId === id);
      this.employee = JSON.parse(JSON.stringify(tempEmp));
      this.registerPage = true;
      this.employeePage = false;
  }

}