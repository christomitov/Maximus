'use strict';

describe('Controller: InvoicesCtrl', function () {

  // load the controller's module
  beforeEach(module('maximalistApp'));

  var InvoicesCtrl, scope, FileUploaderMock;

  // var selectedItem = {
  //   originalObject: {
  //     sku:'12345'
  //   }
  // };

  // var item = {
  //   sku: '12345'
  // };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, FileUploader) {
    FileUploaderMock = FileUploader;
    scope = $rootScope.$new();
    InvoicesCtrl = $controller('InvoicesCtrl', {
      $scope: scope
    });
  }));

  it('should create FileUploader object', function () {
    expect(scope.uploader).toEqual(new FileUploaderMock({
      url: '/api/invoices/upload/'
    }));
  });

  it('should have empty current item', function() {
    expect(scope.currentItem.item).toBe('');
  });

  it('should have empty invoice items', function() {
    expect(scope.invoice.items).toEqual([]);
  });

  // it('should select the matching item', function() {
  //   spyOn(scope, 'itemSelected');
  //   scope.itemSelected(selectedItem);
  //   expect(scope.itemSelected).toHaveBeenCalledWith(selectedItem);
  // });

});
