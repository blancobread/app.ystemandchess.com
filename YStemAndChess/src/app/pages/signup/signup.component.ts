import { Component, OnInit } from '@angular/core';
import { createAotUrlResolver } from '@angular/compiler';
import { isString } from 'util';
import{ HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  link = null;
  private firstNameFlag = false;
  private lastNameFlag = false;
  private emailFlag = false;
  private userNameFlag = false;
  private passwordFlag = false;
  private retypeFlag = false;
  firstNameError = "";
  lastNameError = "";
  emailError = "";
  userNameError = "";
  passwordError = "";
  retypePasswordError = "";

  parentAccountFlag: boolean = false;
  numStudents = new Array();
  newStudents: any[] = [];
  newStudentFlag = false;
  private studentFirstNameFlag = false;
  private studentLastNameFlag = false;
  private studentUserNameFlag = false;
  private studentPasswordFlag = false;
  private studentRetypeFlag = false;
  private numNewStudents = 0;
  private numStudentsDeleted = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  firstNameVerification(firstName: any) {
    firstName = this.allowTesting(firstName, 'firstName');

    if (/^[A-Za-z]{2,15}$/.test(firstName)) {
      this.firstNameFlag = true;
      this.firstNameError = ""
      return true;
    } else {
      this.firstNameFlag = false;
      this.firstNameError = "Invalid First Name";
      return false;
    }
  }

  studentFirstNameVerification(firstName: any, index: any) {
    firstName = this.allowTesting(firstName, "studentFirstName"+index);

    if (/^[A-Za-z]{2,15}$/.test(firstName)) {
      this.studentFirstNameFlag = true;
      document.getElementById("errorFirstName"+index).innerHTML = "";
      return true;
    } else {
      this.studentFirstNameFlag = false;
      document.getElementById("errorFirstName"+index).innerHTML = "Invalid First Name";
      return false;
    }
  }

  lastNameVerification(lastName: any) {

    lastName = this.allowTesting(lastName, 'lastName');

    if (/^[A-Za-z]{2,15}$/.test(lastName)) {
      this.lastNameFlag = true;
      this.lastNameError = ""
      return true;
    } else {
      this.lastNameFlag = false;
      this.lastNameError = "Invalid Last Name";
      return false;
    }
  }

  studentLastNameVerification(lastName: any, index: any) {

    lastName = this.allowTesting(lastName, "studentLastName"+index);

    if (/^[A-Za-z]{2,15}$/.test(lastName)) {
      this.studentLastNameFlag = true;
      document.getElementById("errorLastName"+index).innerHTML="";
      return true;
    } else {
      this.studentLastNameFlag = false;
      document.getElementById("errorLastName"+index).innerHTML="Invalid Last Name";
      return false;
    }
  }

  emailVerification(email: any) {

    email = this.allowTesting(email, 'email');

    if (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/.test(email)) {
      this.emailFlag = true;
      this.emailError = "";
      return true;
    } else {
      this.emailFlag = false;
      this.emailError = "Invalid Email"
      return false;
    }
  }

  usernameVerification(username: any) {
    username = this.allowTesting(username, 'username');

    if (/^[a-zA-Z](\S){1,14}$/.test(username)) {
      //check username against database
      this.userNameFlag = true;
      this.userNameError = "";
      return true;
    } else {
      this.userNameFlag = false;
      this.userNameError = "Invalid Username";
      return false;
    }
  }

  studentUsernameVerification(username: any, index: any) {
    username = this.allowTesting(username, 'studentUsername'+index);

    if (/^[a-zA-Z](\S){1,14}$/.test(username)) {
      //check username against database
      this.studentUserNameFlag = true;
      document.getElementById("errorUsername"+index).innerHTML = "";
      return true;
    } else {
      this.studentUserNameFlag = false;
      document.getElementById("errorUsername"+index).innerHTML = "Invalid Username";
      return false;
    }
  }

  passwordVerification(password: any) {
    password = this.allowTesting(password, 'password');

    if (password.length < 8) {
      this.passwordFlag = false;
      this.passwordError = "Invalid Password"
      return false;
    } else {
      //verify password with username
      this.passwordFlag = true;
      this.passwordError = "";
      return true;
    }
  }

  studentPasswordVerification(password: any, index: any) {
    password = this.allowTesting(password, 'studentPassword'+index);

    if (password.length < 8) {
      this.studentPasswordFlag = false;
      document.getElementById("errorPassword"+index).innerHTML="Invalid Password";
      return false;
    } else {
      //verify password with username
      this.studentPasswordFlag = true;
      document.getElementById("errorPassword"+index).innerHTML="";
      return true;
    }
  }

  retypePasswordVerification(retypedPassword: any, password: any) {
    retypedPassword = this.allowTesting(retypedPassword, 'retypedPassword');
    password = this.allowTesting(password, 'password');

    if (retypedPassword === password) {
      this.retypeFlag = true;
      this.retypePasswordError = "";
      return true;
    } else {
      this.retypeFlag = false;
      this.retypePasswordError = "Passwords do not match"
      return false;
    }
  }

  studentRetypePasswordVerification(retypedPassword: any, password:any, index: any) {
    retypedPassword = this.allowTesting(retypedPassword, 'studentRetypedPassword'+index);
    password = this.allowTesting(password, 'studentPassword'+index);

    if (retypedPassword === password) {
      this.studentRetypeFlag = true;
      document.getElementById("errorRetype"+index).innerHTML="";
      return true;
    } else {
      this.studentRetypeFlag = false;
      document.getElementById("errorRetype"+index).innerHTML="Passwords do not match";
      return false;
    }
  }

  checkIfValidAccount() {
    if (this.firstNameFlag === true && this.lastNameFlag === true && this.emailFlag === true
      && this.userNameFlag === true && this.passwordFlag === true && this.retypeFlag === true) {
      this.link = "/login";
      return true;
    } else {
      this.link = null;
      return false;
    }
  }

  checkIfValidStudentAccount(click, index) {
    if(this.studentFirstNameFlag === true && this.studentLastNameFlag === true && this.studentUserNameFlag === true 
      && this.studentPasswordFlag === true && this.studentRetypeFlag === true) {
        this.link="/login";
        this.newStudents.push(this.addStudentToArray(click, index));
        console.log(this.newStudents);
        //set them all to false for future students
        this.resetStudentFlags();
      } else {
        this.link = null;
      }
  }

  private resetStudentFlags() {
    this.studentFirstNameFlag = false;
    this.studentLastNameFlag = false;
    this.studentUserNameFlag = false;
    this.studentPasswordFlag = false;
    this.studentRetypeFlag = false;
  }

  private addStudentToArray(click, index) {
    var studentFirstName = (<HTMLInputElement>document.getElementById("studentFirstName"+index)).value;
    var studentLastName = (<HTMLInputElement>document.getElementById("studentLastName"+index)).value;
    var studentUserName = (<HTMLInputElement>document.getElementById("studentUsername"+index)).value;
    var studentPasssword = (<HTMLInputElement>document.getElementById("studentPassword"+index)).value;

    let student = {first: studentFirstName, last: studentLastName, username: studentUserName, passsword: studentPasssword};
    return student;
  }

  checkIfParent() {
    var accountType = (<HTMLSelectElement>document.getElementById("types")).value;
    if(accountType == "parent") {
      this.parentAccountFlag = true;
    } else {
      this.parentAccountFlag = false;
    }
    
    return this.parentAccountFlag;
  }

  checkIfCreateNewStudent(create) {
    if(create == event) {
      this.newStudentFlag = true;
      document.getElementById("create").style.display = "none";
      this.numStudents.push(0);
      this.numNewStudents++;
    }
  }

  removeNewStudent(click, index) {
    if(click == event) {
      if(this.numNewStudents == 1){
        this.newStudentFlag = false;
        this.numStudents = [];
        this.numNewStudents = 0;
        this.newStudents = [];
        document.getElementById("create").style.display = "inline";
        return;
      } else {
        document.getElementById("newStudent"+index).style.display = "none";
        this.newStudents[index] = null;
      }
    }
    console.log(this.newStudents);
    this.numNewStudents--;
  }

  addNewStudent(click, index) {
    if(click == event) {
      this.numStudents.push(index);
    }
    this.numNewStudents++;
  }

  students() {
    return this.numStudents;
  }

  clearNulls(arr) {
    let newarr = [];
    let index = 0;
      while(index < arr.length) {
        if(arr[index] != null) {
          newarr.push(arr[index]);
        }
        console.log(index);
        index++;
      }
    return newarr;
  }

  SendToDataBase() {

    if (!this.checkIfValidAccount()) {
      return;
    }
    var firstName = (<HTMLInputElement>document.getElementById("firstName")).value;
    var lastName = (<HTMLInputElement>document.getElementById("lastName")).value;
    var email = (<HTMLInputElement>document.getElementById("email")).value;
    var password = (<HTMLInputElement>document.getElementById("password")).value;
    var username = (<HTMLInputElement>document.getElementById("username")).value;
    var accountType = (<HTMLSelectElement>document.getElementById("types")).value;
    
    let url = "";

    if(accountType == 'parent' && this.newStudentFlag == true) {
      this.newStudents = this.clearNulls(this.newStudents);
      console.log(this.newStudents);
      var students = JSON.stringify(this.newStudents);
      url = `http://127.0.0.1:8000/?reason=create&first=${firstName}&last=${lastName}&email=${email}&password=${password}&username=${username}&role=${accountType}&students=${students}`;
    } else {
      url = `http://127.0.0.1:8000/?reason=create&first=${firstName}&last=${lastName}&email=${email}&password=${password}&username=${username}&role=${accountType}`;
    }
    
    this.httpGetAsync(url, (response) => {
      if (response == "This username has been taken. Please choose another.") {
        this.link = "/signup";
      }
      console.log(response);
    })
  }

  private httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
  }

  /*
    Allows a fake instance of the user input to be used for test classes
  */
  private allowTesting(userParameter, HtmlId) {
    if (userParameter == event) {
      return userParameter = (<HTMLInputElement>document.getElementById(HtmlId)).value;
    }
    return userParameter;
  }
}


