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

end
