describe('HeaderView', function(){
   it('should be defined', function(){
     expect(Forerunner.Views.Header).toBeDefined();
   });

    var view;
    var model;

    beforeEach(function(){
//        var locationSpy = spyOn(window.location, 'assign');
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
           current_user_model = new Forerunner.Models.CurrentUser({
               "id" : "cis.MMM.RX9",
               "links" : {
                   "self" : {
                       "href" : "https://familysearch.org/platform/users/current"
                   }
               },
               "contactName" : "Pete Townsend",
               "fullName" : "Pete Townsend",
               "email" : "peter@acme.org",
               "treeUserId" : "PXRQ-FMXT"
           });


           var new_model = new Forerunner.Models.Header({
               loginLink: 'http://loginLink.com',
               devKey: '123',
               redirect_uri: 'localhost:8080',
               current_user_model:current_user_model
           })


           var new_view = new Forerunner.Views.Header({model: new_model});
           var user_name = new_view.render().$el.find('span.name');
           expect($(user_name).length).toBeGreaterThan(0);
           expect($(user_name).text()).toEqual('Pete Townsend')


       });

       it('should not render a user name if no CurrentUserModel', function(){
           current_user_model = new Forerunner.Models.CurrentUser({
               "id" : "cis.MMM.RX9",
               "links" : {
                   "self" : {
                       "href" : "https://familysearch.org/platform/users/current"
                   }
               },
               "contactName" : "Pete Townsend",
               "fullName" : "Pete Townsend",
               "email" : "peter@acme.org",
               "treeUserId" : "PXRQ-FMXT"
           });


           var new_model = new Forerunner.Models.Header({
               loginLink: 'http://loginLink.com',
               devKey: '123',
               redirect_uri: 'localhost:8080',
           })


           var new_view = new Forerunner.Views.Header({model: new_model});
           var user_name = new_view.render().$el.find('span.name');
           expect($(user_name).length).toEqual(0);
           expect(new_view.render().$el.find('.user').is(':empty')).toEqual(true)
       });
    });

});