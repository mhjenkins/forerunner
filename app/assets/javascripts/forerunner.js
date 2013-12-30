window.Forerunner = {
    Models:{},
    Collections:{},
    Views:{},
    Routers:{},
    initialize:function () {
        var that = this
        this.headerModel = new Forerunner.Models.Header();
        this.currentUserModel = new Forerunner.Models.CurrentUser();

        this.headerModel.fetch().done(function () {
            if (that.headerModel.get('logged_in')) {
              that.currentUserModel.fetch();
            }
            that.headerModel.set({'current_user_model':that.currentUserModel})
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
