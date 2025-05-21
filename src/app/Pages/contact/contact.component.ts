import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactFormService } from '../../Services/Contact/contact-form.service';
import intlTelInput from 'intl-tel-input';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit, AfterViewInit {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactFormService);

  @ViewChild('phoneInput', { static: false }) phoneInput!: ElementRef;


  contactForm!: FormGroup;
  contactFormData!: FormData;


  ngOnInit(): void {
    this.initializeForm();
  }

  ngAfterViewInit(): void {
    intlTelInput(this.phoneInput.nativeElement, {
      nationalMode: false,
      autoPlaceholder: "polite",
      initialCountry: "auto",
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    } as any)
  }

  initializeForm() {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      message: ['']
    });
  }

  onSubmit() {
    if (!this.contactForm.valid) {
      return;
    }

    try {
      this.contactFormData = new FormData();
      this.contactFormData.append('name', this.contactForm.value.firstName);
      this.contactFormData.append('email', this.contactForm.value.email);
      this.contactFormData.append('phone', this.contactForm.value.phone);
      this.contactFormData.append('message', this.contactForm.value.message);
      // this.contactService.sendEntry(this.contactFormData).subscribe({
      //   next: (response) => {
      //     console.log('Entry sent successfully:', response);
      //     this.contactForm.reset();
      //   },
      //   error: (error) => {
      //     console.error('Error sending entry:', error);
      //   }
      // })
    } catch (error) {
      console.error('Error sending entry:', error);
    }
  }
}
