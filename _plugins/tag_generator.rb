module FrancisJournal
  class TagPageGenerator < Jekyll::Generator
    safe false 
    priority :low

    def generate(site)
      return unless site.layouts.key?('tag')

      site.tags.each_key do |tag|
        site.pages << TagPage.new(site, site.source, tag)
      end
    end
  end

  class TagPage < Jekyll::Page
    def initialize(site, base, tag)
      @site = site
      @base = base
      @dir  = File.join('tags', Jekyll::Utils.slugify(tag))
      @name = 'index.html'

      process(@name)
      read_yaml(File.join(base, '_layouts'), 'tag.html')
      data['tag'] = tag
      data['title'] = "##{tag}"
      data['permalink'] = File.join('/tags', Jekyll::Utils.slugify(tag), '/')
    end
  end
end
