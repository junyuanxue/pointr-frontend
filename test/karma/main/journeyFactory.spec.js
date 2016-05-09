'use strict';

describe('JourneyFactory', function () {
  beforeEach(module('main'));

  var journey, journey_with_desc;

  beforeEach(inject(function (JourneyFactory) {
    journey = new JourneyFactory();
    journey_with_desc = new JourneyFactory('New journey');
  }));

  it('starts with an empty array of waypoints', function () {
    expect(journey.waypoints).toEqual([]);
  });

  it('starts with an empty description', function () {
    expect(journey.description).toEqual('');
  });

  it('adds description', function () {
    expect(journey_with_desc.description).toEqual('New journey');
  });

  it('adds a waypoint', function () {
    var waypoint;
    journey.addWaypoint(waypoint);
    expect(journey.waypoints[0]).toEqual(waypoint);
  });
});
