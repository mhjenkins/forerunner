Forerunner.Views.Header = Backbone.View.extend({
    tagName:"div",
    className:"header",
    template:JST['header'],

    initialize: function() {
        this.on('login',this.doLogin,this);
        var model = new Forerunner.Models.CurrentUser({
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
        this.user_view = Forerunner.Views.CurrentUser({model: model});
    },

    render:function () {
        this.$el.html(this.template({ header:this.model }));

        var loginBtn = this.$el.find('#login-btn');
        var that = this;
        var logged_in = this.model.get('logged_in');

        if (logged_in) {
            loginBtn.text('Log Out');
        }

        loginBtn.click(function (e) {
           that.trigger('login',logged_in, that)
        });

//
//        user_view

        return this;
    },

    doLogin: function(logged_in, that){
        if (!logged_in) {
            var url = that.model.get('loginLink') + "?response_type=code&&client_id=" + that.model.get('devKey') + "&&redirect_uri=" + that.model.get('redirect_uri');
            window.location.assign(url);
        }else{
            window.location.assign('/oauth?logout=true');
        }
    }
})