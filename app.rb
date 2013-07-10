require 'octokit'
require 'versionomy'
require 'open-uri'
require 'nokogiri'

set :views_path, "views"
set :layout, "application"

cache = {}

API_VERSIONS = Dir[File.expand_path("../views/api/*-docs.erb", __FILE__)].sort_by{|f| File.ctime(f)}.map{|f| File.basename(f)[/^(.*)-docs.erb/, 1]}.select{|v| !v.nil?}
LATEST_VERSION = API_VERSIONS.last[1, API_VERSIONS.last.size]

%w(leap.js leap.min.js).each do |js|
  get "/:version/#{js}" do
    content_type "text/javascript"
    response.headers['Cache-Control'] = 'public, max-age=31536000'
    cache_key = request.path_info
    cache[cache_key] ||= begin
      if tag = API_VERSIONS.find{|v| v == "v#{params[:version]}"}
        cache[cache_key] = open("https://raw.github.com/leapmotion/leapjs/#{tag}/#{js}").read
      else
        404
      end
    end
  end
end

get '/' do
  erb :index
end

get '/start' do
  @active_menu = "start"
  erb :start
end

get '/examples' do
  @active_menu = "examples"
  erb :examples
end

get '/development' do
  erb :development
end

get '/api/:version/docs' do
  erb :"api/#{params[:version]}-docs", layout: :api
end

get '/api' do
  redirect "/api/#{API_VERSIONS.last}/docs"
end
