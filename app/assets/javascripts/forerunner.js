window.Forerunner = {
    Models:{},
    Collections:{},
    Views:{},
    Routers:{},
    initialize:function () {
        var that = this
        this.headerModel = new Forerunner.Models.Header();

        this.headerModel.fetch().done(function () {
            that.headerView = new Forerunner.Views.Header({model:that.headerModel});
            that.mainView = new Forerunner.Views.Main({});
            $("body").append(that.headerView.render().$el);
            $("body").append(that.mainView.render().$el);
        })


    }
};

$(document).ready(function () {
    Forerunner.initialize();
});
