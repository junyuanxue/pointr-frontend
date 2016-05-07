describe('Wayback', function () {
  it('creates a new journey', function () {
    browser.get('/');
    $('#create-journey').click();
    var addWaypointButton = $('#add-waypoint');
    var endJourneyButton = $('#end-journey');
    expect(addWaypointButton.getText()).toEqual('Add Waypoint');
    expect(endJourneyButton.getText()).toEqual('End Journey');
  });
});
