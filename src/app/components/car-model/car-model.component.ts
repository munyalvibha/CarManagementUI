import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-car-model',
  templateUrl: './car-model.component.html',
  styleUrls: ['./car-model.component.scss']
})
export class CarModelComponent implements OnInit {

  constructor( private router: Router, private userService: UserService) { }

  userName: string = ""

  ngOnInit(): void {
    this.userName = JSON.parse(localStorage.getItem('current_user')).sub
  }

  logout() {
    this.userService.logout()
    this.router.navigateByUrl('/login')
  }

}
