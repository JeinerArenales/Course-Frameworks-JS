import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  user: any = {};

  constructor() { 
    this.user = {
      name: '',
      lastname: '',
      bio: '',
      gender: ''
    }
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.user)
  }

}
