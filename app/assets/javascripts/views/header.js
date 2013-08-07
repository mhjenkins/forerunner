Forerunner.Views.Header = Backbone.View.extend({
    tagName: "div",
    className: "header",
    template: JST['header'],

    render: function() {
        this.$el.html(this.template({ header: this.model }));
        return this;
    }
})