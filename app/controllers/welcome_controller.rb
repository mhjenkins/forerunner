require 'family_search'
class WelcomeController < ApplicationController

  def index
    @fs = FamilySearch.new(FAMILY_SEARCH_INITIALIZER)
    dev_key = 'WCQY-7J1Q-GKVV-7DNM-SQ5M-9Q5H-JX3H-CMJK'
  end

  def header
    @fs = FamilySearch.new(FAMILY_SEARCH_INITIALIZER)
    respond_to do |format|
      format.html do
        render :nothing => true
      end
      format.json do
        render :json => { :loginLink =>  @fs.authorize_uri, :devKey => @fs.dev_key }
      end
    end
  end
end
