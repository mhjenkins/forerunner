require 'spec_helper'

describe CurrentUsersController do
  describe "rendering layout" do
    before do

      @response = {"users" => [{"id" => "cis.MMM.RX9", "links" => {"self" => {"href" => "https://familysearch.org/platform/users/current"}}, "contactName" => "Pete Townsend", "fullName" => "Pete Townsend", "email" => "peter@acme.org", "treeUserId" => "PXRQ-FMXT"}]}
      module FamilyGemHelper
        alias_method :get_current_user_test, :get_current_user

        def get_current_user
          @response
        end
      end
    end

    after do
      module FamilyGemHelper
        alias_method :get_current_user, :get_current_user_test
      end
    end

    it "renders no layout for json" do
      get :show, :format => :json
      response.should be_success
      response.should_not render_template 'layouts/application'
      result = response.body
      result.should == @response.to_json
    end

    it "renders nothing html" do
      get :show
      response.body.should == " "
    end
  end
end
