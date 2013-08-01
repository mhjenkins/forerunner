window.Forerunner = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
     this.headerModel = {
          loginLink: 'http://loginLink.com'
      }
    this.headerView = new Forerunner.Views.Header({model: this.headerModel});
    this.mainView = new Forerunner.Views.Main({});

      $("body").append(  this.headerView.render().$el);
      $("body").append(  this.mainView.render().$el);
  }
};

$(document).ready(function(){
    Forerunner.initialize();
});
