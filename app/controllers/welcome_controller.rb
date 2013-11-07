require "family_gem_helper"
class WelcomeController < ApplicationController
  include FamilyGemHelper
  def index
    @authorize_uri = authorize
  end

  def header
    respond_to do |format|
      format.html do
        render :nothing => true
      end
      format.json do
        render :json => { :loginLink =>  authorize_url, :devKey => get_dev_key, :logged_in => @logged_in}
      end
    end
  end
end
