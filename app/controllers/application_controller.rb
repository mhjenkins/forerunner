class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :is_logged_in

  def is_logged_in
    @logged_in = session[:access_token].nil? ? false : true
  end
end
