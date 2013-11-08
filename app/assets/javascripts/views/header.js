Forerunner.Views.Header = Backbone.View.extend({
    tagName:"div",
    className:"header",
    template:JST['header'],

    render:function () {
        this.$el.html(this.template({ header:this.model }));

        var loginBtn = this.$el.find('#login-btn');
        var that = this;
        var logged_in = this.model.get('logged_in');

        if (logged_in) {
            loginBtn.text('Log Out');
        }

        loginBtn.click(function (e) {
            if (!logged_in) {
                var url = that.model.get('loginLink') + "?response_type=code&&client_id=" + that.model.get('devKey') + "&&redirect_uri=" + that.model.get('redirect_uri');
                window.location.assign(url);
            }else{
                window.location.assign('/oauth?logout=true');
            }
        });

        return this;
    }
})