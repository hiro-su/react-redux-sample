require 'prmd/rake_tasks/combine'
require 'prmd/rake_tasks/verify'
require 'prmd/rake_tasks/doc'
require 'prmd/link'
require 'redcarpet'

schema_root = "docs/schema"

namespace :schema do
  Prmd::RakeTasks::Combine.new do |t|
    t.options[:meta] = "#{schema_root}/meta.yml"
    t.paths << "#{schema_root}/schemata"
    t.output_file = "#{schema_root}/schema.json"
  end

  Prmd::RakeTasks::Verify.new do |t|
    t.files << "#{schema_root}/schema.json"
  end

  Prmd::RakeTasks::Doc.new do |t|
    t.options[:prepend] = ["#{schema_root}/overview.md"]
    t.options[:doc] = { toc: true }
    t.files = { "#{schema_root}/schema.json" => "#{schema_root}/schema.md" }
  end

  desc "Generate HTML"
  task :html do
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, autolink: true, tables: true, fenced_code_blocks: true)
    html = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>API Spec</title></head><body>'
    html += markdown.render(File.read("#{schema_root}/schema.md"))
    html += '</body></html>'
    File.write("#{schema_root}/schema.html", html)
  end
end

desc 'Combine & Verify schema & Generate documentation'
task schema: ['schema:combine', 'schema:verify', 'schema:doc', 'schema:html']
