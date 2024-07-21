import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarModelFormComponent } from '../car-model-form/car-model-form.component';
import { CarModelService } from 'src/app/services/car-model.service';

@Component({
  selector: 'app-car-model-list',
  templateUrl: './car-model-list.component.html',
  styleUrls: ['./car-model-list.component.scss']
})
export class CarModelListComponent implements OnInit {

  carData = []
  viewMode: string = 'card';
  baseUrl = "https://localhost:7102"

  constructor(private modalService: NgbModal, private carService: CarModelService) { }

  ngOnInit() {
    this.getCardData()
  }

  getCardData() {
    this.carService.getCarModels().subscribe(response => {
      if (response) {
        this.carData = response
      }
    })
  }

  openModal() {
    const modalRef = this.modalService.open(CarModelFormComponent);
    modalRef.componentInstance.formSubmit.subscribe(
      () => {
        this.getCardData()
      }
    );
  }

  editCar(id) {
    this.carService.getCarModel(id).subscribe(response => {
      if (response) {
        const modalRef = this.modalService.open(CarModelFormComponent);
        modalRef.componentInstance.carDetails = response;
        modalRef.componentInstance.id = id;

        modalRef.componentInstance.formSubmit.subscribe(
          () => {
            this.getCardData()
          }
        );
      }
    })
  }

  deleteCar(id) {
    this.carService.deleteCarModel(id).subscribe(response => {
      this.getCardData()
    })
  }
}
