'use strict'

let Gateway = require('../models/gateway.model');
let Device = require('../models/device.model');

const del = async (serialNumber, UID) => {
    let gateway = new Gateway();   
    let gatewayDevices = [];
    let i;

    
    gateway = await Gateway.find({ serial: serialNumber }).populate('devices');   
    if (gateway.length == 0) {
        return ['Gateway not found'];
    } else {
        gatewayDevices = gateway[0].devices;
        for (i = 0; i < gatewayDevices.length; i++) {
            if (gatewayDevices[i].uid == UID) {
                break;
            }
            if (i == gatewayDevices.length - 1 && gatewayDevices[i].uid != UID) {
                return ['Device not found'] ;
            }
        }
        gatewayDevices.splice(i, 1);
        
        Device.findOneAndDelete({ uid: UID });
       
            
       


        return gatewayDevices;
    }
}

module.exports = del;