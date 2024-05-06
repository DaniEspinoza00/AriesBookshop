import { NgIf } from '@angular/common';
import { KeysService } from './../../services/keys.service';
import { Component, OnInit, inject } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [GoogleMapsModule, NgIf],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  mapUrl: SafeResourceUrl | null = null;

  constructor(private keysService: KeysService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.keysService.getKey('Google').subscribe(
      {
        next: (response: string) => {
          const placeId = encodeURIComponent("Ek0yNSBkZSBNYXlvIDMxMDgsIEI3NjAwR1dOIE1hciBkZWwgUGxhdGEsIFByb3ZpbmNpYSBkZSBCdWVub3MgQWlyZXMsIEFyZ2VudGluYSIxEi8KFAoSCR08ipgB3ISVERcciMdTu6cPEKQYKhQKEglzLeruVdiElRGHxHIV_bNniA");
          const mapUrl = `https://www.google.com/maps/embed/v1/place?q=place_id:${placeId}&key=${response}`;
          this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(mapUrl);
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }

}
