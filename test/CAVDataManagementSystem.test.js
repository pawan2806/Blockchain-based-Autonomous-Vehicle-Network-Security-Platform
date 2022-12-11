const CAVDataManagementSystem = artifacts.require('./CAVDataManagementSystem.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('CAVDataManagementSystem', ([deployer, seller, buyer]) => {
  let cavdatamanagementsystem

  before(async () => {
    cavdatamanagementsystem = await CAVDataManagementSystem.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await cavdatamanagementsystem.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await cavdatamanagementsystem.name()
      assert.equal(name, 'CAV Data Management System')
    })
  })

  describe('vehicles', async () => {
    let result, vehicleCount

    before(async () => {
      result = await cavdatamanagementsystem.createVehicle( 1,1,1,1,1,1,1,1,1,1,web3.utils.toWei('1', 'Ether'))
      vehicleCount = await cavdatamanagementsystem.vehicleCount()
    })

    it('creates vehicles', async () => {
      // SUCCESS
      assert.equal(vehicleCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), vehicleCount.toNumber(), 'id is correct')
      assert.equal(event.timestamp.toNumber(), 1, 'timestamp is correct')
      assert.equal(event.accx.toNumber(), 1, 'accx is correct')
      assert.equal(event.accy.toNumber(), 1, 'accy is correct')
      assert.equal(event.accz.toNumber(), 1, 'accz is correct')
      assert.equal(event.rollx.toNumber(), 1, 'rollx is correct')
      assert.equal(event.yawy.toNumber(), 1, 'yawy is correct')
      assert.equal(event.pitchz.toNumber(), 1, 'pitchz is correct')
      assert.equal(event.latitude.toNumber(), 1, 'latitude is correct')
      assert.equal(event.longitude.toNumber(), 1, 'longitude is correct')
      assert.equal(event.timestamp.toNumber(), 1, 'timestamp is correct')
      assert.equal(event.price, '1000000000000000000', 'price is correct') 
  
      // FAILURE: vehicle must have a price
      await await cavdatamanagementsystem.createVehicle(1,1,1,1,1,1,1,1,1,1,0).should.be.rejected;
    })

    it('lists vehicles', async () => {
      const vehicle = await cavdatamanagementsystem.vehicles(vehicleCount)
      assert.equal(vehicle.id.toNumber(), vehicleCount.toNumber(), 'id is correct')
      assert.equal(vehicle.timestamp.toNumber(), 1, 'timestamp is correct')
      assert.equal(vehicle.accx.toNumber(), 1, 'accx is correct')
      assert.equal(vehicle.accy.toNumber(), 1, 'accy is correct')
      assert.equal(vehicle.accz.toNumber(), 1, 'accz is correct')
      assert.equal(vehicle.rollx.toNumber(), 1, 'rollx is correct')
      assert.equal(vehicle.yawy.toNumber(), 1, 'yawy is correct')
      assert.equal(vehicle.pitchz.toNumber(), 1, 'pitchz is correct')
      assert.equal(vehicle.latitude.toNumber(), 1, 'latitude is correct')
      assert.equal(vehicle.longitude.toNumber(), 1, 'longitude is correct')
      assert.equal(vehicle.timestamp.toNumber(), 1, 'timestamp is correct')
      assert.equal(vehicle.price, '1000000000000000000', 'price is correct')
    
    
    })

    it('sells vehicles', async () => {
      // Track the seller balance before purchase
      let oldSellerBalance
      oldSellerBalance = await web3.eth.getBalance(seller)
      oldSellerBalance = new web3.utils.BN(oldSellerBalance)

      // SUCCESS: Buyer makes purchase
      result = await cavdatamanagementsystem.purchaseVehicle(vehicleCount, { from: buyer, value: web3.utils.toWei('1', 'Ether')})

      // Check logs
      const event = result.logs[0].args
    assert.equal(event.id.toNumber(), vehicleCount.toNumber(), 'id is correct')
    assert.equal(event.timestamp.toNumber(), 1, 'timestamp is correct')
    assert.equal(event.accx.toNumber(), 1, 'accx is correct')
    assert.equal(event.accy.toNumber(), 1, 'accy is correct')
    assert.equal(event.accz.toNumber(), 1, 'accz is correct')
    assert.equal(event.rollx.toNumber(), 1, 'rollx is correct')
    assert.equal(event.yawy.toNumber(), 1, 'yawy is correct')
    assert.equal(event.pitchz.toNumber(), 1, 'pitchz is correct')
    assert.equal(event.latitude.toNumber(), 1, 'latitude is correct')
    assert.equal(event.longitude.toNumber(), 1, 'longitude is correct')
    assert.equal(event.timestamp.toNumber(), 1, 'timestamp is correct')
    // assert.equal(event.price, '1000000000000000000', 'price is correct') 

      // Check that seller received funds
      let newSellerBalance
      newSellerBalance = await web3.eth.getBalance(seller)
      newSellerBalance = new web3.utils.BN(newSellerBalance)

      let price
      price = web3.utils.toWei('1', 'Ether')
      price = new web3.utils.BN(price)

      const exepectedBalance = oldSellerBalance.add(price)

      // assert.equal(newSellerBalance.toString(), exepectedBalance.toString())

    })

  })
})
