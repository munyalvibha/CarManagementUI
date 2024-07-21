import { Component, OnInit } from '@angular/core';
import { CarModelService } from 'src/app/services/car-model.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  carData = []
  viewMode: string = 'card';
  baseUrl = environment.baseUrl
  searchQuery = '';
  filteredCarData = [];


  constructor(private carService: CarModelService) { }

  ngOnInit() {
    this.getCardData()
  }

  getCardData() {
    this.carService.getCarModels().subscribe(response => {
      if (response) {
        this.carData = response
        this.filteredCarData = [...this.carData]
        this.sortFilteredData();
      }
    })
  }

  performSearch() {
    const query = this.searchQuery.toLowerCase();
    this.filteredCarData = this.carData.filter(car =>
      car.modelName.toLowerCase().includes(query) ||
      car.modelCode.toLowerCase().includes(query)
    );
    this.sortFilteredData();
  }

  sortFilteredData() {
    this.filteredCarData.sort((a, b) => {
      const dateA = new Date(a.dateOfManufacturing).getTime();
      const dateB = new Date(b.dateOfManufacturing).getTime();
      if (dateB === dateA) {
        return b.sortOrder - a.sortOrder;
      }
      return dateB - dateA;
    });
  }
}


