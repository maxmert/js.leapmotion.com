$(document).ready(function() {
  var list = $('.api-docs-sidebar ul');
  $('div.doc-section').each(function() {
    list.append('<li><a href="#'+this.id+'"><i class="icon-chevron-right"></i> '+$(this).find('h2').html()+'</a></li>');
  });

  $('ul.nav li').each(function() {
    if ($(this).find('a').data('menu') == $('body').data('active-menu')) {
      $(this).addClass('active')
    }
  })
});
