import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(
    private http:HttpClient
  ) { }
  
  _getAllCountries()
  {
    return this.http.get(`https://restcountries.eu/rest/v2/all`)
  }
  
  _getAllCountriesFromContinent(continent)
  {
    return this.http.get(`https://restcountries.eu/rest/v2/region/${continent}`)
  }

  _getMyIp()
  {
    return this.http.get(`http://api.ipgeolocationapi.com/geolocate`)
  }  
}
