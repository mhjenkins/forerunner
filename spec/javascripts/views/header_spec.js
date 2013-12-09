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
           redirect_uri: 'localhost:8080'
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

    it('should change login to log out if :logged_in is true',function(){
        model.set({'logged_in':true})
        var loginBtn = view.render().$el.find('#login-btn')[0]
        expect(loginBtn).toBeDefined();
        expect($(loginBtn).text()).toEqual('Log Out')
    });

    it('should log out if logged in', function(){
        model.set({'logged_in':true})
        var locationSpy = spyOn(window.location, 'assign');
        var loginBtn = view.render().$el.find('#login-btn')[0];
        $(loginBtn).click();
        expect(locationSpy).toHaveBeenCalled();
        expect(locationSpy).toHaveBeenCalledWith('/oauth?logout=true');
    });

    describe('currentUserView',function(){
       it('should render a user name if CurrentUserModel', function(){
           var new_model = new Forerunner.Models.Header({
               loginLink: 'http://loginLink.com',
               devKey: '123',
               redirect_uri: 'localhost:8080',
               current_user_model: { "contactName" : "Pete Townsend"}
           });
           var new_view = new Forerunner.Views.Header({model: model});
           var user_name = view.render().$el.find('span.name');
           console.log(user_name)
           expect($(user_name).length).toBeGreaterThan(0);
           expect($(user_name).text()).toEqual('Pete Townsend')


       });

       it('should not render a user name if CurrentUserModel', function(){

       });
    });

});