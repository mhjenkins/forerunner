require "family_gem_helper"
class OauthsController < ApplicationController
  include FamilyGemHelper
  def show

    if(params[:code])
      response = get_token params[:code]
      access_token = response['access_token']
      session[:access_token] = access_token
    end

    #redirect_to :action => :index, :page => params['page']
    redirect_to '/'
  end
end
