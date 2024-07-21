import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { CarModelService } from 'src/app/services/car-model.service';
import { CarModelListComponent } from '../car-model-list/car-model-list.component';

@Component({
  selector: 'app-car-model-form',
  templateUrl: './car-model-form.component.html',
  styleUrls: ['./car-model-form.component.scss'],
  providers: [
    CarModelListComponent
  ]
})
export class CarModelFormComponent implements OnInit {
  carModelForm: FormGroup;
  @Input() carDetails: any;
  @Input() id: number;
  @Output() formSubmit = new EventEmitter<any>();
  brands = ['Audi', 'Jaguar', 'Land Rover', 'Renault'];
  classes = ['A-Class', 'B-Class', 'C-Class'];

  constructor(private fb: FormBuilder, private carModelService: CarModelService, public activeModal: NgbActiveModal) {
    this.carModelForm = this.fb.group({
      brand: ['', Validators.required],
      class: ['', Validators.required],
      modelName: ['', Validators.required],
      modelCode: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      description: ['', Validators.required],
      features: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      dateOfManufacturing: ['', Validators.required],
      sortOrder: ['', Validators.pattern(/^\d+$/)],
      images: [[], !this.carDetails ? Validators.required : '']
    });
  }

  ngOnInit(): void {
    if (this.carDetails) {
      const formattedDate = this.formatDate(this.carDetails.dateOfManufacturing);
      this.carDetails.dateOfManufacturing = formattedDate;

      this.carModelForm.patchValue(this.carDetails);
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; 
  }

  
  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const files = event.target.files;
      const fileArray = Array.from(files).map((file: any) => this.convertToBase64(file));
      Promise.all(fileArray).then((base64Files) => {
        this.carModelForm.patchValue({
          images: base64Files
        });
      });
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.carModelForm.get(field);
    return control && control.invalid && (control.dirty || control.touched);
  }

  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  onSubmit() {
    if (this.carModelForm.valid) {
      let carDetail = this.carModelForm.value
      carDetail.active = true
      if(this.id){
        carDetail.id = this.id;
      }
      const url = this.carDetails ? this.carModelService.updateCarModel(carDetail) : this.carModelService.addCarModel(carDetail)

      url.subscribe(
        response => {
          alert(response);
          this.carModelForm.reset();
          this.formSubmit.emit();
          this.activeModal.close('Close click');
        },
        error => {
          alert("An error occurred while updating the car model");
          this.carModelForm.reset();
          this.activeModal.close('Close click');
        }
      );
    }
  }


}
