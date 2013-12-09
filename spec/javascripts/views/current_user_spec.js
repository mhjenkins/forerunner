describe('Current User View', function(){
    it('should be defined', function(){
        expect(Forerunner.Views.CurrentUser).toBeDefined();
    });

    var view;
    var model;

    beforeEach(function(){
        model = new Forerunner.Models.CurrentUser({
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
        view = new Forerunner.Views.CurrentUser({model: model});
    });

    afterEach(function(){
        view.remove();
    });

    it('should be div.current_user',function(){
        expect( view.render().$el ).toBe('div.current_user');
    });

    it('should display the user name', function(){
        var name = view.render().$el.find('span.name');
        expect($(name).text()).toEqual('Pete Townsend');
    })

    it('should render on model change', function(){
        var render_spy = spyOn(Forerunner.Views.CurrentUser.prototype, 'render');
        var change_model = new Forerunner.Models.CurrentUser({
            "contactName" : "Bob Smith"
        });
        var rerender_view = new Forerunner.Views.CurrentUser({model: change_model});
        expect(render_spy).not.toHaveBeenCalled();
        change_model.set('contactName', 'John Smith')
        expect(render_spy).toHaveBeenCalled();
    });
});