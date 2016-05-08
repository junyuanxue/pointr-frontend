'use strict';

describe('JourneyFactory', function () {
  beforeEach(module('main'));

  var journey;

  beforeEach(inject(function (JourneyFactory) {
    journey = new JourneyFactory();
  }));

  it('starts with an empty array of waypoints', function () {
    expect(journey.waypoints).toEqual([]);
  });

  it('adds a waypoint', function () {
    var waypoint;
    journey.addWaypoint(waypoint);
    expect(journey.waypoints[0]).toEqual(waypoint);
  });
});
