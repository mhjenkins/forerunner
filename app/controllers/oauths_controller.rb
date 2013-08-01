require 'family_search'

class OauthsController < ApplicationController
  def show
    @fs = FamilySearch.new(FAMILY_SEARCH_INITIALIZER)

    if(params[:code])
      access_token = @fs.get_access_token(params[:code])['access_token']
      puts access_token.inspect
      session[:access_token] = access_token
    end

    render :nothing => true;
  end
end
