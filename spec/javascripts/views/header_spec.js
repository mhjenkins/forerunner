describe('HeaderView', function(){
   it('should be defined', function(){
     expect(Forerunner.Views.Header).toBeDefined();
   });

    var view;
    var model;

    beforeEach(function(){
       model = new Forerunner.Models.Header({
           loginLink: 'http://loginLink.com'
       });
        view = new Forerunner.Views.Header({model: model});
    });

    afterEach(function(){
        view.remove();
    });

    it('should be div.header',function(){
        expect( view.render().$el ).toBe('div.header');
    });

    it('should have a login link',function(){
        var loginBtn = view.render().$el.find('#login-btn')[0]
        expect(loginBtn).toBeDefined();
        expect($(loginBtn).attr('href')).toEqual('http://loginLink.com')
//        expect(view.render().$el.find('#login-btn').length).toBeTruthy();
    });


});