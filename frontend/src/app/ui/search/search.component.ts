import { Component, OnInit } from '@angular/core';
import { Gateway } from 'src/app/models/gateway.model';
import { GatewayService } from 'src/app/services/gateway.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [GatewayService],
})
export class SearchComponent implements OnInit {
  public serialNumber;
  public gateway: Gateway;
  constructor(
    private _gatewayService: GatewayService,
  ) {
    this.serialNumber = '';
    this.gateway = new Gateway('', '', '', []);
  }

  ngOnInit(): void {

  }
  onSubmit() {
    if (this.serialNumber === '') {
      Swal.fire('You need to enter some data first', 'Missing gateways serial', 'info');
    } else {
      this._gatewayService.getGatewayBySerial(this.serialNumber).subscribe(
        res => {
          if (res.status == 'success') {
            Swal.fire('Founded!', '', 'success');
          }
          this.gateway = res.gateway[0];
        },
        err => {
          console.log(err);
          if (err.status == 404) {
            Swal.fire('Gateway not found!', 'Missing or wrong data', 'error');
          }
        }
      )
    }
  }
}
