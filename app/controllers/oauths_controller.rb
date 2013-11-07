
class OauthsController < ApplicationController
  def show
    @fs = FamilySearch.new(FAMILY_SEARCH_INITIALIZER)

    if(params[:code])
      puts "**********************#{params[:code]}"
      response = @fs.get_access_token(params[:code])
      access_token = response['access_token']
      session[:access_token] = access_token
    end

    #redirect_to :action => :index, :page => params['page']
    redirect_to '/'
  end
end
