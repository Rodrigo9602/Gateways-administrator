import { Component, OnInit } from '@angular/core';
import { Gateway } from 'src/app/models/gateway.model';
import { Device } from 'src/app/models/device.model';
import { GatewayService } from 'src/app/services/gateway.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.css'],
  providers: [GatewayService],
})
export class GatewayComponent implements OnInit {
  public gateway;
  public date = new Date();
  public devices: Device[];

  constructor(
    private _gatewayService: GatewayService,
  ) {
    this.devices = [new Device(0, '', this.date, '')];
    this.gateway = new Gateway('', '', '', this.devices);

  }

  ngOnInit(): void {
  }
  onSubmit() {

    this._gatewayService.save(this.gateway).subscribe(
      res => {
        console.log(res);
        if(res.status=='success'){
          Swal.fire('Saved!', '', 'success');
         }  
      },
      err => {
        console.log(err);
        if(err.status==400){
          Swal.fire('Changes are not saved','wrong or missing data' , 'info');
         }
      }
    )

  }

}
