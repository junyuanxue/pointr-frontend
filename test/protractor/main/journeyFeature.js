'use strict';

describe('journey', function () {
  it('creates a new journey', function () {
    browser.get('/#/main/home');
    $('#create-journey').click();
    var addWaypointButton = $('#add-waypoint');
    var endJourneyButton = $('#end-journey');
    expect(browser.getTitle()).toEqual('Journey');
    expect(addWaypointButton.getText()).toEqual('Add Waypoint');
    expect(endJourneyButton.getText()).toEqual('End Journey');
  });

  it('edits the journey description', function () {
    browser.get('/#/main/journey');
    $('#edit-desc').sendKeys('New journey');
    $('#save-journey-desc').click();
    var journeyDesc = $('#journey-desc');
    expect(journeyDesc.getText()).toEqual('New journey');
  });

  it('ends the journey', function () {
    browser.get('/#/main/journey');
    $('#end-journey').click();
    var wayBackButton = $('#way-back');
    expect(wayBackButton.getText()).toEqual('Find My Way Back');
  });

  it('starts the journey back', function () {
    browser.get('/#/main/transition');
    $('#way-back').click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#/main/journeyback');
  });
});
