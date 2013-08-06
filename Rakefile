require './lib/versions'
require 'octokit'
require 'nokogiri'
require 'versionomy'

namespace :docs do
  desc "rebuild docs"
  task :rebuild do
    Rake::Task["docs:generate"].invoke
    Rake::Task["docs:compile"].invoke
  end

  desc "generate api docs"
  task :generate do
    unless File.directory?("leapjs")
      system("git clone https://github.com/leapmotion/leapjs.git") or raise
    end
    Dir.chdir('leapjs') do
      system("git reset --hard") or raise
      system("git checkout master") or raise
      system("git pull") or raise
      # iterate through all the tags, doing a checkout
      tags = Octokit.tags("leapmotion/leapjs")

      DOC_VERSIONS.each do |tag|
        output_dir = "./api-docs/#{tag}"
        system("git clean -f") or raise
        system("git reset --hard") or raise
        system("git checkout #{tag}") or raise
        system("npm install") or raise
        system("mkdir -p #{output_dir}") or raise
        system("cp ../INDEX.md README.md") or raise
        system("cp ../jsdoc_conf.json jsdoc_conf.json") or raise
        system("./node_modules/jsdoc/jsdoc -c jsdoc_conf.json lib README.md -d #{output_dir}") or raise
      end
    end
  end

  desc "compile"
  task :compile do
    Dir['leapjs/api-docs/*'].each do |dir|
      tag = File.basename(dir)
      output_dir = "./leapjs/api-docs/#{tag}"
      # put them all together!
      files = Dir[output_dir + "/*.html"].sort_by{|f| File.size(f) }.map {|f| File.basename(f) }
      # we'll treat these specially
      special_files = ['index.html', 'Leap.html']
      special_files.each {|f| files.delete(f)}
      files.delete_if {|f| !f[/^Leap/]}
      parts = (special_files + files).map do |f|
        doc = Nokogiri::HTML(File.read("#{output_dir}/#{f}"))
        main_node = doc.css("div#main").last
        main_node['id'] = File.basename(f, ".*").downcase.gsub('.', '-')
        main_node['class'] = "doc-section"
        5.downto(1) do |h|
          main_node.css("h#{h}").to_a.each do |node|
            node.name = "h#{h.succ}"
          end
        end

        main_node.css('img').each do |img|
          img['src'] = "/#{img['src']}"
        end

        if special_files.first != f
          main_node.css('a').each do |a|
            new_node = doc.create_element "span"
            new_node.inner_html = a.inner_html
            a.replace new_node
          end
        end
        main_node.to_s
      end

      File.open("./views/api/#{tag}-docs.erb", "w") do |f|
        f << "<h1>Docs for #{tag}</h1>\n"
        f << parts.join("\n")
      end
    end
  end
end