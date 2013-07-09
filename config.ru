require 'sinatra'
require './app'

use Rack::Logger
run Sinatra::Application
