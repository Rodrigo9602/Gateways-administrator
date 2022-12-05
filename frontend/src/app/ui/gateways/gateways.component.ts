import { Component, OnInit } from '@angular/core';
import { GatewayService } from 'src/app/services/gateway.service';
import { Device } from 'src/app/models/device.model';
import { Gateway } from 'src/app/models/gateway.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gateways',
  templateUrl: './gateways.component.html',
  styleUrls: ['./gateways.component.css'],
  providers: [GatewayService],
})
export class GatewaysComponent implements OnInit {
public devices= Device;
public date = new Date();
public gateways: Gateway[];
public addDevice;
public delDevice;

  constructor(
    private _gatewayService:GatewayService,

  ) {  
    
    
    this.gateways = [
      new Gateway('', '','',[]),
      
    ]
    this.addDevice='';
    this.delDevice='';
   }

  ngOnInit(): void {        
    this._gatewayService.getGateways().subscribe(
      res =>{
        this.gateways = res.gateways;
        if(this.gateways.length==0){
          Swal.fire('Ops', 'It seems you dont have any gateway saved...for now', 'info');
        }
      },
      err=>{
       alert(err.message);
      }
    )
    
  }
  select(event: any, gate: Gateway){
   this.addDevice = '/add-device/'+gate.serial;
   this.delDevice = '/del-device/'+gate.serial;
   
  }

}
