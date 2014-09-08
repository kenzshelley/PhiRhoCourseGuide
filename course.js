var CreateCoursePage = function() {
  var class_name = $(this).attr('class');
  console.log("class_name: " + class_name);
  if (class_name.indexOf('half') >= 0) {
    $('#database').css('width', '100%');
//    $('#header_table').css('width', '100%');
    $(this).addClass('full').removeClass('half');
  }
  else {
    $(this).addClass('half').removeClass('full');
    $('#database').css('width', '50%');
    var window_width = $(window).width();
    //$('.h').css('width', window_width/10 + 'px');
  }
}
