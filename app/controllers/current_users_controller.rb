require "family_gem_helper"
class CurrentUsersController < ApplicationController

  include FamilyGemHelper

  def show
    current_user = get_current_user
    #respond_to do |format|
    #  format.html do
    #    render :nothing => true
    #  end
    #  format.json do
    #    render :json => current_user
    #  end
    #end
  end
end