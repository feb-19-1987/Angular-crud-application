import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import {Employee} from '../shared/employee.model'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
employee: Employee[] = []

  myUrl = "http://localhost:3000/employees";
  constructor(private httpclient: HttpClient) { }

  getEmployeelist() {
    return this.httpclient.get(this.myUrl)
  }

  postEmployee(emp: Employee) {
    return this.httpclient.post(this.myUrl, emp)
  }

  updateEmployee(emp: Employee, id: Employee) {
    console.log(emp)
    return this.httpclient.put(this.myUrl + `/${id}`, emp)


  }
  deleteEmployee(id: Employee) {
    alert(id)
    console.log(id)
    alert('deleting')
    return this.httpclient.delete('http://localhost:3000/employees' + '/' + id);

  }

}
