$(document).ready(function() {
  $('ul.nav li').each(function() {
    if ($(this).find('a').data('menu') == $('body').data('active-menu')) {
      $(this).addClass('active')
    }
  })

  var list = $('.api-docs-sidebar ul');
  $('div.doc-section').each(function() {
    list.append('<li><a href="#'+this.id+'"><i class="icon-chevron-right"></i> '+$(this).find('h2').html()+'</a></li>');
  });
});
