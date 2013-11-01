require './lib/versions'
require './lib/tutorials'
require 'octokit'
require 'versionomy'
require 'open-uri'
require 'nokogiri'
require 'sinatra'

set :views_path, "views"
set :layout, "application"

cache = {}

begin
API_VERSIONS = Octokit.tags("leapmotion/leapjs").map(&:name).map{|v| Versionomy.parse(v[/^v(.*)/, 1]) }.sort.reverse
LATEST_VERSION = API_VERSIONS.first

%w(leap.js leap.min.js).each do |js|
  get "/:version/#{js}" do
    content_type "text/javascript"
    response.headers['Cache-Control'] = 'public, max-age=31536000'
    cache_key = request.path_info
    cache[cache_key] ||= begin
      if tag = API_VERSIONS.find{|v| v == "v#{params[:version]}"}
        cache[cache_key] = open("https://raw.github.com/leapmotion/leapjs/v#{tag}/#{js}").read
      else
        404
      end
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

#get '/tutorials' do
#  @active_menu = "tutorials"
#  erb :"tutorials/tutorial"
#end

#get '/tutorial1' do
#  @active_menu = "tutorial1"
#  erb :"tutorials/tutorial1"
#end

#get '/tutorial2' do
#  @active_menu = "tutorial2"
#  erb :"tutorials/tutorial2"
#end

#get '/tutorial3' do
#@active_menu = "tutorial3"
#erb :"tutorials/tutorial3"
#end



get '/development' do
  erb :development
end


get '/api_guide' do
  @active_menu = "guide"
  erb :api_guide, layout: :api_guide_layout
end

get '/api/:version/docs' do
  erb :"api/#{params[:version]}-docs", layout: :api
end

get '/api' do
  redirect "/api/#{DOC_VERSIONS.first}/docs"
end


get '/tutorials/:tutorial' do
  erb :"tutorials/#{params[:tutorial]}", layout: :tutorials
end

get '/tutorials' do
  redirect "/tutorials/#{TUTORIALS.first}"
end
