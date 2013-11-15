Forerunner.Views.CurrentUser = Backbone.View.extend({
    tagName:"div",
    className:"current_user",
    template:JST['current_user'],

    render:function () {
        this.$el.html(this.template({ current_user:this.model }));

//        var that = this;


        return this;
    }
});