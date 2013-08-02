Forerunner.Views.Header = Backbone.View.extend({
    tagName: "div",
    className: "header",
    template: JST['header'],

    render: function() {
        console.log(this.model)
        this.$el.html(this.template({ header: this.model }));
        return this;
    }
})