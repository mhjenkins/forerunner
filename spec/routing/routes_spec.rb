require "spec_helper"

describe "#Routes" do
  it "should route home to welcome" do
    {:get => "/"}.should route_to(:controller => "welcome", :action =>'index')
  end

  it "should route home to header" do
    {:get => "/header"}.should route_to(:controller => "welcome", :action =>'header')
  end

  it "should route to oauth" do
    {:get => '/oauth'}.should route_to(:controller => "oauths", :action =>'show')
  end
end