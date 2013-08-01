require 'family_search'
describe 'FamilySearch' do
  it 'should set defaults' do
    family_search = FamilySearch.new({:dev_key => '123', :env => 'sandbox', :redirect_uri => 'http://localhost:8080/oath'})
    family_search.dev_key.should == '123'
    family_search.env.should == 'sandbox'
    family_search.redirect_uri.should == 'http://localhost:8080/oath'
  end

  it 'should set base_env for all environments' do
    family_search = FamilySearch.new({:dev_key => '123', :env => 'sandbox', :redirect_uri => 'http://localhost:8080/oath'})
    family_search.base_env.should == 'sandbox'

    family_search = FamilySearch.new({:dev_key => '123', :env => 'staging', :redirect_uri => 'http://localhost:8080/oath'})
    family_search.base_env.should == 'identbeta'

    family_search = FamilySearch.new({:dev_key => '123', :env => 'production', :redirect_uri => 'http://localhost:8080/oath'})
    family_search.base_env.should == 'ident'
  end

  it 'should return correct redirect url' do
    family_search = FamilySearch.new({:dev_key => '123', :env => 'sandbox', :redirect_uri => 'http://localhost:8080/oath'})
    family_search.authorize_uri.should == "https://sandbox.familysearch.org/cis-web/oauth2/v3/authorization?response_type=code&client_id=#{family_search.dev_key}&redirect_uri=#{family_search.redirect_uri}"

    family_search.env = 'staging'
    family_search.authorize_uri.should == "https://identbeta.familysearch.org/cis-web/oauth2/v3/authorization?response_type=code&client_id=#{family_search.dev_key}&redirect_uri=#{family_search.redirect_uri}"

    family_search.env = 'production'
    family_search.authorize_uri.should == "https://ident.familysearch.org/cis-web/oauth2/v3/authorization?response_type=code&client_id=#{family_search.dev_key}&redirect_uri=#{family_search.redirect_uri}"
  end

  it 'should get access token' do
    #TO_DO test to mmake sure it is calling the right url etc... not sure how to do this just yet
    mock.instance_of(Typhoeus::Request).run {Typhoeus::Response.new({:code => 200, :body => '{"access_token":"123456789"}'})}
    code = '123'
    family_search = FamilySearch.new({:dev_key => '123', :env => 'sandbox', :redirect_uri => 'http://localhost:8080/oath'})
    family_search.get_access_token(code).should == {"access_token" =>"123456789"}
    #
    #family_search.env = 'staging'
    #family_search.get_access_token(code).should == {"access_token" =>"123456789"}
    #
    #family_search.env = 'production'
    #family_search.get_access_token(code).should == {"access_token" =>"123456789"}

  end
end