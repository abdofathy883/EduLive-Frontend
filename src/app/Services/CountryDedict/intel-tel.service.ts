import { Injectable } from '@angular/core';
import intlTelInput from 'intl-tel-input';

@Injectable({
  providedIn: 'root'
})
export class IntelTelService {
  constructor() { }

  initializePhoneInput(element: HTMLInputElement): any {
    return intlTelInput(element, {
      initialCountry: 'auto',
      geoIpLookup: callback => {
        fetch('https://ipinfo.io/json?token=<d8dae8adf4e32d>')
        .then(res => res.json())
        .then(res => callback(res.country))
        .catch(err => console.error(err));
      },
      // utilsScript: 'assets/utils.js',
      // separateDialCode: true,
      // preferredCountries: ['eg', 'us', 'gb']
    });
  }

  isValidNumber(iti: any): boolean {
    return iti.isValidNumber();
  }

  getNumber(iti: any): string {
    return iti.getNumber();
  }

  getCountryData(iti: any): any {
    return iti.getSelectedCountryData();
  }
}
