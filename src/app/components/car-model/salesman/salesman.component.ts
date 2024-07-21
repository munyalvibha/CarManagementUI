import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarModelService } from 'src/app/services/car-model.service';

@Component({
  selector: 'app-salesman',
  templateUrl: './salesman.component.html',
  styleUrls: ['./salesman.component.scss']
})
export class SalesmanComponent implements OnInit {

  salesmans = []
  constructor(private carModelService: CarModelService, private router: Router) { }

  ngOnInit(): void {
    this.getSalesDetails();
  }

  getSalesDetails(){
    this.carModelService.getSalesDetails().subscribe(response => {
      this.salesmans = response
    })
  }

  goBack(){
    this.router.navigateByUrl('/admin/car-list')
  }
}
