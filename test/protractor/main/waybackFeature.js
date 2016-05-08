'use strict';

describe('Wayback', function () {
  it('creates a new journey', function () {
    browser.get('/');
    $('#create-journey').click();
    var addWaypointButton = $('#add-waypoint');
    var endJourneyButton = $('#end-journey');
    expect(browser.getTitle()).toEqual('Journey');
    expect(addWaypointButton.getText()).toEqual('Add Waypoint');
    expect(endJourneyButton.getText()).toEqual('End Journey');
  });

  it('end the journey', function () {
    browser.get('/#/main/journey');
    $('#end-journey').click();
    var wayBackButton = $('#way-back');
    expect(wayBackButton.getText()).toEqual('Find My Way Back');
  });
});
