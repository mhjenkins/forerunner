require "family_gem_helper"
class OauthsController < ApplicationController
  include FamilyGemHelper
  def show

    if(params[:code])
      response = get_token params[:code]
      access_token = response['access_token']
      session[:access_token] = access_token
    end

    if(params[:logout])
      #response = delete_token session[:access_token]
      #session[:access_token] = response['access_token']
      session[:access_token] = nil
    end

    redirect_to '/'
  end
end
