require 'spec_helper'

describe WelcomeController do

  describe "GET 'index'" do
    it "returns http success" do
      get 'index'
      response.should be_success
    end

    it 'should assign login uri' do
      mock.instance_of(FamilySearch).authorize_uri{'someUri'}
      #FamilySearch.any_instance.stub(:authorize_uri) do |args|
      #  "someUri"
      #end

      get 'index'
      assigns(:fs).authorize_uri.should == 'someUri'
    end
  end

  describe "GET 'footer'" do
    describe "rendering layout" do
      before do
        @fs = FamilySearch.new(FAMILY_SEARCH_INITIALIZER)
        @header_response = {:loginLink => @fs.authorize_uri, :devKey => @fs.dev_key, :logged_in => false}
        @header_response_not_loggedin = {:loginLink => @fs.authorize_uri, :devKey => @fs.dev_key, :logged_in => true}

      end

      it "renders no layout for json" do
        get :header, :format => :json
        response.should be_success
        response.should_not render_template 'layouts/application'
        result = response.body
        result.should == @header_response.to_json
      end

      it "should returned logged_in in if session api-key" do
        session[:access_token] = 'something'
        get :header, :format => :json
        response.should be_success
        result = response.body
        result.should == @header_response_not_loggedin.to_json
        session[:access_token] = nil
        get :header, :format => :json
        response.should be_success
        result = response.body
        result.should == @header_response.to_json
      end

      it "renders nothing html" do
        get :header
        response.body.should == " "
      end
    end


  end

end
