Forerunner.Views.CurrentUser = Backbone.View.extend({
    tagName:"div",
    className:"current_user",
    template:JST['current_user'],

    initialize: function() {
        var that = this;
        this.model.on('change',that.render,that);
    },

    render:function () {
        this.$el.html(this.template({ current_user:this.model }));
        return this;
    }
});