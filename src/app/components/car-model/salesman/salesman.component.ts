import { Component, OnInit } from '@angular/core';
import { CarModelService } from 'src/app/services/car-model.service';

@Component({
  selector: 'app-salesman',
  templateUrl: './salesman.component.html',
  styleUrls: ['./salesman.component.scss']
})
export class SalesmanComponent implements OnInit {

  salesmans = []
  constructor(private carModelService: CarModelService) { }

  ngOnInit(): void {
  }

  getSalesDetails(){
    this.carModelService.getSalesDetails().subscribe(response => {
      this.salesmans = response
    })
  }
}
