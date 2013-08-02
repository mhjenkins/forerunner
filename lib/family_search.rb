
class FamilySearch
  attr_accessor :dev_key, :redirect_uri, :base_env

  SANDBOX = 'sandbox'.freeze
  STAGING = 'identbeta'.freeze
  PRODUCTION = 'ident'.freeze

  #SANDBOX_AUTHORIZATION_ENDPOINT = 'https://sandbox.familysearch.org/cis-web/oauth2/v3/authorization'.freeze
  #STAGING_AUTHORIZATION_ENDPOINT = 'https://identbeta.familysearch.org/cis-web/oauth2/v3/authorization'.freeze
  #PRODUCTION_AUTHORIZATION_ENDPOINT = 'https://ident.familysearch.org/cis-web/oauth2/v3/authorization'.freeze



  def initialize args
    @dev_key = args[:dev_key]
    self.env = args[:env].downcase
    @redirect_uri = args[:redirect_uri].downcase
  end

  def env=(env)
    @env = env
    @base_env = SANDBOX
    if (@env == 'staging')
      @base_env = STAGING
    elsif (@env == 'production')
      @base_env = PRODUCTION
    end
  end

  def env
    @env
  end

  def authorize_uri
    "https://#{@base_env}.familysearch.org/cis-web/oauth2/v3/authorization?response_type=code&client_id=#{@dev_key}&redirect_uri=#{@redirect_uri}"
  end

  def get_access_token code
    response = Typhoeus::Request.new(
        "https://#{@base_env}.familysearch.org/cis-web/oauth2/v3/token",
        method: :post,
        body: "",
        params: { grant_type: "authorization_code", code: code, client_id: @dev_key },
        headers: { Accept: "text/html" }
    ).run

    JSON.parse(response.body)
  end
end