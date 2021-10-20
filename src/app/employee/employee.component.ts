import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { EmployeeService } from '../shared/employee.service';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../shared/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  isEdit: boolean = false
  empObj: any = new Employee()
  
  empData: Employee[] = []
  
  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private http: HttpClient) { }

  ngOnInit(): void {

    this.loademployees()
    this.reset()
  }

  empForm = this.fb.group({
    _id: [''],
    name: [''],
    position: [''],
    office: [''],
    salary: []
  })

  onSubmit() {
    //if isEdit true , then submit button works
    if (!this.isEdit) {
      console.log("this.empObj._id ")
      this.empObj.name = this.empForm.value.name
      this.empObj.position = this.empForm.value.position
      this.empObj.office = this.empForm.value.office
      this.empObj.salary = this.empForm.value.salary
      this.employeeService.postEmployee(this.empObj)
        .subscribe(
          (res) => {
            alert('inserted'),
              // loading new form data details
              this.loademployees()
          },
          (err) => { alert('not inserted') }

        )
    }
    else {

      //to get data for edit
      this.empObj.name = this.empForm.value.name
      this.empObj.position = this.empForm.value.position
      this.empObj.office = this.empForm.value.office
      this.empObj.salary = this.empForm.value.salary


      this.onEdit(this.empObj)
      alert('updated')

      //to make isEdit false then  buttton save will appear
      this.isEdit = false

      //to make form empty
      this.empObj.name = ""
      this.empObj.position = ""
      this.empObj.office = ""
      this.empObj.salary = ""

      this.loademployees()


    }
    this.reset()

  }
  loademployees() {
    this.employeeService.getEmployeelist().subscribe(
      (result) => {
        console.log("result")
        this.empData = result as Employee[]
      }
    )
  }

  //to delete data with given form data id 
  onDelete(pers: any) {
    this.employeeService.deleteEmployee(pers._id)
      .subscribe((res) => {
        console.log("deleted")
        alert('deleted'), this.loademployees()
      })
  }

  // make form data details empty
  reset() {
    this.empForm.controls[""]
    this.empForm.controls['name'].setValue("")
    this.empForm.controls['position'].setValue("")
    this.empForm.controls['office'].setValue("")
    this.empForm.controls['salary'].setValue("")

  }

  onEdit(pers: any) {

    this.isEdit = true
    this.employeeService.updateEmployee(pers, pers._id).
      subscribe((response) => {
        this.empObj._id = pers._id
        this.empForm.controls['name'].setValue(pers.name)
        this.empForm.controls['position'].setValue(pers.position)
        this.empForm.controls['office'].setValue(pers.offce)
        this.empForm.controls['salary'].setValue(pers.salary)
        this.loademployees()

      })

  }

}




