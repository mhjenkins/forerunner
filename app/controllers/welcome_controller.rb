require 'family_search'
class WelcomeController < ApplicationController

  def index
    @fs = FamilySearch.new(FAMILY_SEARCH_INITIALIZER)
  end

  def header
    @fs = FamilySearch.new(FAMILY_SEARCH_INITIALIZER)
    respond_to do |format|
      format.html do
        render :nothing => true
      end
      format.json do
        render :json => { :loginLink =>  @fs.authorize_uri, :devKey => @fs.dev_key , :logged_in => @logged_in}
      end
    end
  end
end
