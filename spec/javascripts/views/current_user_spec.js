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
        expect($(name).text()).toEqual('Pete Townsend')
    })
});