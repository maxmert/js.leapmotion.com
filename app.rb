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
  API_VERSIONS = ['v0.2.1']
#API_VERSIONS = Octokit.tags("leapmotion/leapjs").map(&:name).map{|v| Versionomy.parse(v[/^v(.*)/, 1]) }.sort.reverse
  LATEST_VERSION = API_VERSIONS.first
  set :javascripts, [:bootstrap, :prettify, :underscore, '/js/main.js']
  set :dev_scripts, true

#%w(leap.js leap.min.js).each do |js|
#  get "/:version/#{js}" do
#    content_type "text/javascript"
#    response.headers['Cache-Control'] = 'public, max-age=31536000'
#    cache_key = request.path_info
#    cache[cache_key] ||= begin
#      if tag = API_VERSIONS.find{|v| v == "v#{params[:version]}"}
#       # cache[cache_key] = open("https://raw.github.com/leapmotion/leapjs/v#{tag}/#{js}").read
#      else
#        404
#      end
#    end
#  end
# end
end

helpers do
  def js *scripts
    @js ||= []
    @js = scripts
  end

  def javascripts(*args)
    js = []
    js << settings.javascripts if settings.respond_to?('javascripts')
    js << args
    js << @js if @js
    js.flatten.uniq.map do |script|
      "<script src=\"#{path_to script}\"></script>"
    end.join
  end

  def path_to script
    case script
      when :jquery then
        'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js'
      when :rightjs then
        'http://cdn.rightjs.org/right-2.3.0.js'
      when :backbone then
        'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.0/backbone-min.js'
      when :underscore then
        'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.1/underscore-min.js'
      when :bootstrap then
        '//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/js/bootstrap.min.js'
      when :prettify then
        '//twitter.github.io/bootstrap/assets/js/google-code-prettify/prettify.js'
      when :angular then
        settings.dev_scripts ? '/js/vendor/angular-1.1.5/angular.js' : '/js/vendor/angular-1.1.5/angular.min.js'
      when :angular_http then
        settings.dev_scripts ? '/js/vendor/angular-1.1.5/angular-resource.js' : '/js/vendor/angular-1.1.5/angular-resource.min.js'
      when :async then
        '/js/vendor/async.js'
      when :marked then '/js/vendor/marked.js'
      else
        script.to_s
    end
  end
end

get '/' do
  @active_menu = "index"
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

get '/what_is_leap_motion' do
  @active_menu = "what_is_leap_motion"
  erb :what_is_leap_motion
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

get '/api/:version/docs' do
  erb :"api/#{params[:version]}-docs", layout: :api
end

get '/api_guide' do
  @active_menu = "api_guide"
  @js = [:angular, :angular_http, :async, :marked,
         '/js/doc/app.js',
         '/js/doc/directives/repeatInside.js',
         '/js/doc/factories/docData.js',
         '/js/doc/directives/manifest.js',
         '/js/doc/directives/propExpression.js',
         '/js/doc/directives/argument.js',
         '/js/doc/directives/methods.js',
         '/js/doc/directives/properties.js',
         '/js/doc/directives/docSection.js',
         '/js/doc/directives/tableOfContents.js',
         '/js/doc/controller.js']
  erb :api_guide
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
