require "family_gem_helper"
class CurrentUsersController < ApplicationController
  include FamilyGemHelper
  def show
    current_user = {}
    begin
      current_users = get_current_user(session[:access_token])
      if current_users && current_users['errors']
        error = current_users['errors'].first
        current_user = {:error => 'error',:code => error['code'], :message => error['message']}
      elsif current_users && current_users['users']
        current_user = current_users['users'].first

      end
    rescue FamilyConnect::Error::BadAccessToken
      current_user = {:error => 'error', :message => 'Bad access token'}
    end

    respond_to do |format|
      format.html do
        render :nothing => true
      end
      format.json do
        render :json => current_user
      end
    end
  end
end
