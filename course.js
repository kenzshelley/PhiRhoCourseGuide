var CreateCoursePage = function() {
  var class_name = $(this).attr('class');
  console.log("class_name: " + class_name);
  // Hides course detail view; returns database view to full screen.
  if (class_name.indexOf('half') >= 0) {
    $(this).addClass('full').removeClass('half');
    $('#database').css('width', '100%');
    $('#database_header').css('width', '100%');
    // Clear prof table
    $('#profs_table').find('tr:gt(0)').remove();
  }
  // Shows course detail view; brings database view to half screen.
  else {
    $(this).addClass('half').removeClass('full');
    $('#database').css('width', '48%');
    $('#database_header').css('width', '48%');
    var queryCourseProfs = new Parse.Query('Professor');
    queryCourseProfs.ascending('name');
    var cur_course_dep = $(this).find('td:first').text();
    cur_course_dep= cur_course_dep.substring(1);
    var cur_course_num = $(this).find('td:nth-child(2)').text();
    var cur_course_name = cur_course_dep + ' ' + cur_course_num;
    
    queryCourseProfs.equalTo('courses', cur_course_name); 
    queryCourseProfs.find({
      success: function(results) {
        // If there are already row's in the table, clear them.
        if ($('#profs_table tr'.length < 1)) {
          $(this).css('background-color', '#E9A9FF');
          $('#profs_table').find('tr:gt(0)').remove(); 
        }
        // Add the results to the profs table
        for (var i=0; i < results.length; ++i) {
          var object = results[i];
          var $last_row = $('#profs_table>tbody>last-child');
          var result = '';
          var r = result.concat('<tr><td>', object.get('name'), '</td>', 
            '<td>', object.get('rating'), '</td></tr>');
          $('#profs_table').append(r);
        }
       },
      error: function(error) {
               alert("Error: " + error.code + " " + error.message);
             }
    });
  }
}
