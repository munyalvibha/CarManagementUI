import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-model',
  templateUrl: './user-model.component.html',
  styleUrls: ['./user-model.component.scss']
})
export class UserModelComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  userName: string = ""

  ngOnInit(): void {
    this.userName = JSON.parse(localStorage.getItem('current_user')).sub
  }

  logout() {
    this.userService.logout()
    this.router.navigateByUrl('/login')
  }


}
