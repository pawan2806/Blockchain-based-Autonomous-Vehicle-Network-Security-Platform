//SPDX-License-Identifier: MIT

pragma solidity ^0.5.0;

contract CAVDataManagementSystem {
    string public name;
    uint public vehicleCount = 0;
    mapping(uint => Vehicle) public vehicles;

    struct Vehicle{
        uint id;
        uint dataid;
        uint timestamp; 
        uint accx;
        uint accy;
        uint accz;
        uint rollx;
        uint yawy;
        uint pitchz;
        uint latitude;
        uint longitude;
        uint price;
        address payable owner;       
    }

    event VehicleCreated(
         uint id,
        uint dataid,
        uint timestamp, 
        uint accx,
        uint accy,
        uint accz,
        uint rollx,
        uint yawy,
        uint pitchz,
        uint latitude,
        uint longitude,
        uint price,
        address payable owner 
    );  

    event VehiclePurchased(
        uint id,
        uint dataid,
        uint timestamp, 
        uint accx,
        uint accy,
        uint accz,
        uint rollx,
        uint yawy,
        uint pitchz,
        uint latitude,
        uint longitude,
        uint price,
        address payable owner 
    );

    constructor() public {
        name = "CAV Data Management System";
    }

    function createVehicle( uint _dataid,uint _timestamp,uint _accx,uint _accy,uint _accz,uint _rollx,uint _yawy,uint _pitchz,uint _latitude, uint _longitude, uint _price) public {
  
        // Require a valid price
        require(_price > 0);
        // Increment vehicle count
        vehicleCount ++;
        // Create the vehicle
        vehicles[vehicleCount] = Vehicle(vehicleCount, _dataid,_timestamp, _accx, _accy, _accz,_rollx, _yawy, _pitchz, _latitude,  _longitude,_price, msg.sender);
        // Trigger an event
        emit VehicleCreated(vehicleCount, _dataid,_timestamp, _accx, _accy, _accz,_rollx, _yawy, _pitchz, _latitude,  _longitude,_price, msg.sender);
    }

    function purchaseVehicle(uint _id) public payable {
        // Fetch the vehicle
        Vehicle memory _vehicle = vehicles[_id];
        // Fetch the owner
        address payable _seller = _vehicle.owner;
        // Make sure the vehicle has a valid id
        require(_vehicle.id > 0 && _vehicle.id <= vehicleCount);
        // Require that there is enough Ether in the transaction
        require(msg.value >= _vehicle.price);
        // Require that the buyer is not the seller
        require(_seller != msg.sender);         
        // Update the vehicle
        vehicles[_id] = _vehicle;
        // Pay the seller by sending them Ether
        address(_seller).transfer(msg.value);
        // Trigger an event
        emit VehiclePurchased(vehicleCount, _vehicle.dataid,_vehicle.timestamp, _vehicle.accx, _vehicle.accy, _vehicle.accz,_vehicle.rollx, _vehicle.yawy, _vehicle.pitchz, _vehicle.latitude,  _vehicle.longitude,_vehicle.price, msg.sender);
    }
}
