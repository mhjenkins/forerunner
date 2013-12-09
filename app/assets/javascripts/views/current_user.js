Forerunner.Views.CurrentUser = Backbone.View.extend({
    tagName:"div",
    className:"current_user",
    template:JST['current_user'],

    initialize: function() {
        this.model.on('change',this.render,this);
    },

    render:function () {
        this.$el.html(this.template({ current_user:this.model }));
        return this;
    }
});