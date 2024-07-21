import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CarModelFormComponent } from '../car-model-form/car-model-form.component';
import { CarModelService } from 'src/app/services/car-model.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car-model-list',
  templateUrl: './car-model-list.component.html',
  styleUrls: ['./car-model-list.component.scss']
})
export class CarModelListComponent implements OnInit {

  carData = []
  viewMode: string = 'card';
  baseUrl = environment.baseUrl
  searchQuery = '';
  filteredCarData = [];


  constructor(private modalService: NgbModal, private carService: CarModelService, private router: Router) { }

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

  openModal() {
    const modalOptions: NgbModalOptions = {
      backdrop: 'static', 
      keyboard: false 
    };
    const modalRef = this.modalService.open(CarModelFormComponent, modalOptions);
    modalRef.componentInstance.formSubmit.subscribe(
      () => {
        this.getCardData()
        this.searchQuery = '';
      }
    );
  }

  editCar(id) {
    this.carService.getCarModel(id).subscribe(response => {
      if (response) {
        const modalOptions: NgbModalOptions = {
          backdrop: 'static', 
          keyboard: false 
        };
        const modalRef = this.modalService.open(CarModelFormComponent, modalOptions);
        modalRef.componentInstance.carDetails = response;
        modalRef.componentInstance.id = id;

        modalRef.componentInstance.formSubmit.subscribe(
          () => {
            this.getCardData()

            this.searchQuery = '';
          }
        );
      }
    })
  }

  deleteCar(id) {
    if (confirm('Are you sure you want to delete?')) {
      this.carService.deleteCarModel(id).subscribe(response => {
        this.getCardData()
        this.searchQuery = '';
      })
    }
  }

  salesmanReport() {
    this.router.navigateByUrl('/admin/salesman')
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
