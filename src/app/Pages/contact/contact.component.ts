import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactFormService } from '../../Services/Contact/contact-form.service';
import intlTelInput from 'intl-tel-input';
import { IntelTelService } from '../../Services/CountryDedict/intel-tel.service';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('phoneInput', { static: false }) phoneInput!: ElementRef;
  loading: boolean = false;
  contactForm!: FormGroup;
  contactFormData!: FormData;
  // iti: intlTelInput.Plugin | undefined;
  constructor(
    private fb: FormBuilder,
    private contactService: ContactFormService,
    private intelTelService: IntelTelService
  ) {}

  ngOnDestroy(): void {
    // if (this.iti) {
    //   this.iti.destroy();
    // }
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngAfterViewInit(): void {
    // this.iti = intlTelInput(this.phoneInput.nativeElement, {
    //   initialCountry: 'auto',
    //   geoIpLookup: callback => {
    //     fetch('https://ipinfo.io/json?token=<d8dae8adf4e32d>')
    //       .then(res => res.json())
    //       .then(res => callback(res.country))
    //       .catch(err => console.error(err));
    //   },
    //   utilsScript: 'assets/utils.js',
    // })
    // this.phoneInput.nativeElement.addEventListener('countrychange', () => {
    //   this.contactForm.patchValue({
    //     phone: this.iti?.getNumber()
    //   });
    // });
  }

  initializeForm() {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      message: [''],
    });
  }

  onSubmit() {
    this.loading = true;
    if (!this.contactForm.valid) {
      this.loading = false;
      return;
    }

    try {
      this.loading = true;
      this.contactFormData = new FormData();
      this.contactFormData.append('name', this.contactForm.value.firstName);
      this.contactFormData.append('email', this.contactForm.value.email);
      this.contactFormData.append('phone', this.contactForm.value.phone);
      this.contactFormData.append('message', this.contactForm.value.message);
      this.contactService.sendEntry(this.contactFormData).subscribe({
        next: (response) => {
          console.log('Entry sent successfully:', response);
          // Swal.fire({
          //   icon: 'success',
          //   title: 'Success',
          //   text: 'Your message has been sent successfully.',
          //   showConfirmButton: true,
          // });
          this.contactForm.reset();
        },
        error: (error) => {
          this.loading = false;
          console.error('Error sending entry:', error);
        },
      });
    } catch (error) {
      console.error('Error sending entry:', error);
    }
  }
}
