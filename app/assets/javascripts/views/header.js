Forerunner.Views.Header = Backbone.View.extend({
    tagName:"div",
    className:"header",
    template:JST['header'],

    initialize: function() {
        that = this;
        this.on('login',this.doLogin,this);
        this.model.on('change',this.render,this);
        if(that.model.get("current_user_model")){
          this.user_view = new Forerunner.Views.CurrentUser({model:that.model.get("current_user_model")});
        }
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

//        that.user_view.model = this.model.get("current_user_model")
        if(that.model.get("current_user_model")){
            $(this.$el.find('.user')).append(that.user_view.render().$el);
        }
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