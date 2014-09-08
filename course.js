var CreateCoursePage = function() {
  var class_name = $(this).attr('class');
//  $(this).toggleClass('half full');
  $(this).addClass('half').removeClass('full');
  if (class_name.indexOf('half') >= 0) {
    $('database').css('width', '100%');
    $(this).addClass('full').removeClass('half');
  }
  else {
    console.log(this);
    $(this).addClass('half').removeClass('full');
    $('#database').css('width', '50%');
  }
}
