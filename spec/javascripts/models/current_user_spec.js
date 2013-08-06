describe('Forerunner.Models.CurrentUser', function(){
    var user
    beforeEach(function(){
        user = new Forerunner.Models.CurrentUser
    });

    it ('should act like a backbone model',function(){

        expect(_.isFunction(user.get)).toBeTruthy();
        expect(_.isFunction(user.set)).toBeTruthy();
    });
})