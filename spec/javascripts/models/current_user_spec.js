describe('Forerunner.Models.CurrentUser', function(){
    var user
    beforeEach(function(){
        user = new Forerunner.Models.CurrentUser
    });

    it ('should act like a backbone model',function(){

        expect(_.isFunction(user.get)).toBeTruthy();
        expect(_.isFunction(user.set)).toBeTruthy();
    });

    describe('#save', function() {
        var server = null;

        beforeEach(function() {
            server = sinon.fakeServer.create();
        });

        afterEach(function() {
            server.restore();
        });

        it('should send valid data', function() {
            user.save( {
                    "id" : "cis.MMM.RX9",
                    "links" : {
                        "self" : {
                            "href" : "https://familysearch.org/platform/users/current"
                        }
                    },
                    "contactName" : "Pete Townsend",
                    "fullName" : "Pete Townsend",
                    "email" : "peter@acme.org",
                    "treeUserId" : "PXRQ-FMXT"
            });
            var request = server.requests[0];

            var params = JSON.parse(request.requestBody);
            expect(params.contactName).toBeDefined();
            expect(params.contactName).toEqual('Pete Townsend');
            expect(params.fullName).toEqual('Pete Townsend');
            expect(params.email).toEqual("peter@acme.org");
            expect(params.treeUserId).toEqual("PXRQ-FMXT");
            expect(params.id).toEqual("cis.MMM.RX9");
        });

        describe('request', function() {
            beforeEach(function() {
                user.set({
                        "id" : "cis.MMM.RX9",
                        "links" : {
                            "self" : {
                                "href" : "https://familysearch.org/platform/users/current"
                            }
                        },
                        "contactName" : "Pete Townsend",
                        "fullName" : "Pete Townsend",
                        "email" : "peter@acme.org",
                        "treeUserId" : "PXRQ-FMXT"
                });
            });

            describe('on create', function() {
                beforeEach(function() {
                    user.set({ id: null });
                    user.save();
                    this.request = server.requests[0];
                });

                itShouldBePOST();
                itShouldBeAsync();
                itShouldHaveUrl('/current_user.json');
            });

            xdescribe('on update', function() {
                beforeEach(function() {
                    header.id = 66;
                    header.save();
                    this.request = server.requests[0];
                });

                itShouldBePUT();
                itShouldBeAsync();
                itShouldHaveUrl('/header/66.json');
            });
        });
    });
})