Forerunner.Views.Main = Backbone.View.extend({
    tagName: "div",
    className: "main",
    template: JST['main'],

    render: function() {
        this.$el.html(this.template({ header: this.model }));
        return this;
    }
})