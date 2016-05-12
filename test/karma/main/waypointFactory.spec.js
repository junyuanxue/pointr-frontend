'use strict';

describe('WaypointFactory', function () {
  beforeEach(module('main'));

  var waypoint, waypointWithDesc;

  beforeEach(inject(function (WaypointFactory) {
    waypoint = new WaypointFactory(10.0, 10.1);
    waypointWithDesc = new WaypointFactory(10.0, 10.1, 'Cool spot');

  }));

  it('has a latitude', function () {
    expect(waypoint.coords.latitude).toEqual(10.0);
  });

  it('adds a longitude', function () {
    expect(waypoint.coords.longitude).toEqual(10.1);
  });

  it('starts with an empty description', function () {
    expect(waypoint.description).toEqual('');
  });

  it('adds description', function () {
    expect(waypointWithDesc.description).toEqual('Cool spot');
  });

  it('starts with an empty imageURI', function () {
    expect(waypoint.imageURI).toEqual(null);
  });

  it('updates the imageURI', function () {
    waypoint.updateImageURI('data:image/jpeg;64,/1');
    expect(waypoint.imageURI).toEqual('data:image/jpeg;64,/1');
  });

  it('is not reached by default', function () {
    expect(waypoint.reached).toBeFalse;
  });

  it('marks the waypoint as reached', function () {
    waypoint.markAsReached();
    expect(waypoint.reached).toBeTrue;
  });
});
