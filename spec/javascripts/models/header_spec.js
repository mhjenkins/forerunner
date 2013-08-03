describe('Forerunner.Models.Header', function(){
   var header
   beforeEach(function(){
       header = new Forerunner.Models.Header
   });

   it ('should act like a backbone model',function(){

      expect(_.isFunction(header.get)).toBeTruthy();
      expect(_.isFunction(header.set)).toBeTruthy();
   });

   it ('should have the correct default values', function(){
       expect(header.get('loginLink')).toEqual('')
   })

    describe('#save', function() {
        var server = null;

        beforeEach(function() {
            server = sinon.fakeServer.create();
        });

        afterEach(function() {
            server.restore();
        });

        it('should send valid data', function() {
            header.save({loginLink: 'http://login.com'});
            var request = server.requests[0];

            var params = JSON.parse(request.requestBody);
            expect(params.loginLink).toBeDefined();
            expect(params.loginLink).toEqual('http://login.com');
        });

        describe('request', function() {
            beforeEach(function() {
                header.set({ name: 'New header to do' });
            });

            describe('on create', function() {
                beforeEach(function() {
                    header.set({ id: null });
                    header.save();
                    this.request = server.requests[0];
                });

                itShouldBePOST();
                itShouldBeAsync();
                itShouldHaveUrl('/header.json');
            });

            xdescribe('on update', function() {
                beforeEach(function() {
                    header.id = 66;
                    header.save();
                    this.request = server.requests[0];
                });

                itShouldBePUT();
                itShouldBeAsync();
                itShouldHaveUrl('/header/66.json');
            });
        });
    });
});