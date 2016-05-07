'use strict';

describe('WaypointFactory', function () {
  beforeEach(module('main'));

  var waypoint;

  beforeEach(inject(function (WaypointFactory) {
    waypoint = new WaypointFactory(10.0, 10.1);
  }));

  it('has a latitude', function () {
    expect(waypoint.latitude).toEqual(10.0);
  });

  it('adds a longitude', function () {
    expect(waypoint.longitude).toEqual(10.1);
  });
});
