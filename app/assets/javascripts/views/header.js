Forerunner.Views.Header = Backbone.View.extend({
    tagName: "div",
    className: "header",
    template: JST['header'],

    render: function() {
        this.$el.html(this.template({ header: this.model }));

        var loginBtn = this.$el.find('#login-btn');
        var that = this;

        loginBtn.click(function(e){
            var url = that.model.get('loginLink') +"?response_type=code&&client_id="+that.model.get('devKey')+"&&redirect_uri="+that.model.get('redirect_uri');
            window.location.assign(url);
        });

        return this;
    }
})