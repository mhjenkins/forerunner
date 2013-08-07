class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :is_logged_in

  def is_logged_in
    @logged_in = session[:access_token].nil? ? false : true
  end
end
