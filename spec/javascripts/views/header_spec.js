describe('HeaderView', function(){
   it('should be defined', function(){
     expect(Forerunner.Views.Header).toBeDefined();
   });

    var view;
    var model;

    beforeEach(function(){
       model = new Forerunner.Models.Header({
           loginLink: 'http://loginLink.com',
           devKey: '123',
           redirectUri: 'localhost:8080'
       });
        view = new Forerunner.Views.Header({model: model});
    });

    afterEach(function(){
        view.remove();
    });

    it('should be div.header',function(){
        expect( view.render().$el ).toBe('div.header');
    });

    it('should have a login link event', function(){
        var locationSpy = spyOn(window.location, 'assign');
        var loginBtn = view.render().$el.find('#login-btn')[0];
        $(loginBtn).click();
        expect(locationSpy).toHaveBeenCalled();
        expect(locationSpy).toHaveBeenCalledWith('http://loginLink.com?response_type=code&&client_id=123&&redirect_uri=localhost:8080');

    });

    xit('should have a login link',function(){
        var loginBtn = view.render().$el.find('#login-btn')[0]
        expect(loginBtn).toBeDefined();
        expect($(loginBtn).attr('href')).toEqual('http://loginLink.com')
//        expect(view.render().$el.find('#login-btn').length).toBeTruthy();
    });


});