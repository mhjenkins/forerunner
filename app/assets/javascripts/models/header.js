Forerunner.Models.Header = Backbone.Model.extend({
    defaults: {
        loginLink: '',
        loggedIn: false
    },
    url: '/header.json'
});