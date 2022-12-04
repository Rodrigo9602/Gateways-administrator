import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GatewayService } from 'src/app/services/gateway.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-devices-del',
  templateUrl: './devices-del.component.html',
  styleUrls: ['./devices-del.component.css'],
  providers: [GatewayService],
})
export class DevicesDelComponent implements OnInit {
  public serialNumber;
  public UID;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _gatewayService: GatewayService,
  ) {
    this.serialNumber = '';
    this.UID = '';
  }

  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      this.serialNumber = params['serial'];

    });

  }
  onSubmit() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',        
      },
      buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._gatewayService.delDevices(this.serialNumber, this.UID).subscribe(
          res => {
            console.log(res);
            if (res.status == 'success') {
              Swal.fire('Success, device deleted!', 'Another one bite the dust', 'success');
            }
          },
          err => {
            Swal.fire('Fail, device was not deleted!', 'Missing data', 'info');
            console.log(err.message);
          }
        )
      }
      else if(result.dismiss === Swal.DismissReason.cancel) {
        {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Device was not eliminated, it will live another day. :)',
            'error'
          )
        }
      }

    });

  }
}
