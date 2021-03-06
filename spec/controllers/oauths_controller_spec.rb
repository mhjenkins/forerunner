require 'spec_helper'


describe OauthsController do
  before do

    module FamilyGemHelper
      alias_method :get_token_test, :get_token
      alias_method :delete_token_test, :delete_token

      def get_token code
        {"access_token" => "123456789"}
      end

      def delete_token access_token
        {"access_token" => nil}
      end
    end
  end
  after do
    module FamilyGemHelper

      alias_method :get_token, :get_token_test
      alias_method :delete_token, :delete_token_test
    end
  end
  it "should route to show" do
    get :show
    response.should be_redirect
  end

  it "should fail gracefully if no code parameter" do
    session[:access_token] = nil
    get :show
    response.should be_redirect
    session[:access_token].should be_nil
  end

  it "should finish authentication if code parameter" do

    session[:access_token] = nil
    get :show, :code => '123'
    response.should be_redirect
    session[:access_token].should == '123456789'
  end

  describe '#logout' do
    it 'should set session access_token to nil' do
      session[:access_token] = '1234'
      get :show, :logout => true
      response.should be_redirect
      session[:access_token].should be_nil
    end
  end

end
