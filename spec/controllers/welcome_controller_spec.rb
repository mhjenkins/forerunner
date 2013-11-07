require 'spec_helper'

describe WelcomeController do
  before do
    #TODO mock FamilyConnect so it dosn't make any calls
    #stub(FamilyConnect::Client).discover.with_any_args { NewcastleClient::FakeClientApi.new(:passkey => ('1234567890')) }
    discovery = File.read(File.join('spec/sampledata/discovery.response'))

    mock.instance_of(FamilyConnect::Client).discover{discovery}
  end
  describe "GET 'index'" do
    before do

      module FamilyGemHelper
        alias_method :authorize_test, :authorize

        def authorize
          'http://authorizeURL.com'
        end
      end
      #WebMock.allow_net_connect!
    end
    after do
      module FamilyGemHelper

        alias_method :authorize, :authorize_test
      end
    end
    it "returns http success" do
      get 'index'
      response.should be_success
    end

    it 'should assign login uri' do
      #mock.instance_of(FamilySearch).authorize_uri{'someUri'}

      get 'index'
      assigns(:authorize_uri).should == 'http://authorizeURL.com'
    end
  end

  describe "GET 'header'" do
    describe "rendering layout" do
      before do
        @fs = FamilyConnect::Client.new(FAMILY_SEARCH_INITIALIZER)
        @header_response = {:loginLink => @fs.authorize_url, :devKey => @fs.dev_key, :logged_in => false}
        @header_response_not_loggedin = {:loginLink => @fs.authorize_url, :devKey => @fs.dev_key, :logged_in => true}

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
