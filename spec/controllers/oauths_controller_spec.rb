require 'spec_helper'


describe OauthsController do
  it "should route to show" do
    get :show
    response.should be_redirect
  end
  it "should fail gracefully if no code parameter"

  it "should finish authentication if code parameter" do
    mock.instance_of(Typhoeus::Request).run {Typhoeus::Response.new({:code => 200, :body => '{"access_token":"123456789"}'})}

    session[:access_token] = nil
    get :show, :code => '123'
    response.should be_redirect
    session[:access_token].should == '123456789'
  end

end
