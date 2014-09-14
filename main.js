$(document).ready(function() {
  // Load all Course entries from parse into database table.
  Parse.initialize("Ja95BMYq8EWBbF0bsGFsQUjpHqcRXl81eoTr6WRW",
    "DSHMNswCbwANFJ6SyWKVmI3AdfdsQI9FwOYDJ7gc");
  $('#temp').hide();
  window_width = $(window).width();
  $('.h').css('width', window_width/5);
  $('#profs_table>tbody>tr>th').css('width', window_width*.24);
  console.log($(window).height());
  $('#database').css('height', $(window).height());
  LoadAll();
  $('input').keyup(AddFilter);
  // Add box if enter key is pressed

});

var LoadAll = function() {
  var queryAll =  new Parse.Query('Course');
  queryAll.ascending("name");
  queryAll.find({
    success: function(results) {
               // Add the results to the table
               for (var i = 0; i < results.length; i++) {
                 var object = results[i];
                 var $last_row = $('#entries>tbody:last-child');
                 var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
                 var rand_id = randLetter + Date.now(); 
                 var result = '';
                 var r = result.concat('<tr class="full" id=', rand_id, '><td> ',
                   object.get('department'),
                   '</td><td>', object.get('number'), '</td><td>',
                   object.get('difficulty'), '</td><td>', object.get('workload'),
                   '</td><td>', object.get('overall'), '</td></tr>');
                 $('#entries').append(r);
                 $('#entries>tbody>tr>td').css('width', $(window).width()/5); 
                 $('#'+ rand_id).click(CreateCoursePage);
               }
             },
    error: function(error) {
             alert("Error: " + error.code + " " + error.message); 
           }
  });
}

var AddFilter = function(event) {
  var filter = $('input').val().toUpperCase();
  // Put all table rows in an array
  var rows = GetRows();
  // If the backspace key was pressed, show all entries again and refilter
  if (event.keyCode == 8) {
    ShowAllRows(rows);
    ReFilter();
  }
  // Hide any rows that do not match the filter
  Filter(filter, rows);
  
  if (event.keyCode == 13) {
    var filter = $('input').val().toUpperCase();
    $('input').val('');
    CreateFilterBox(filter);  
  }
  
}

var GetRows = function() {
  var rows = Array();
  $("#entries tr").each(function(i, v){
    rows[i] = this;
  });
  return rows;
}

var Filter = function(filter, rows) {
  for (var i = 0; i < rows.length; ++i) {
    var row = rows[i];
    var test = $(row).context.textContent;
    test.indexOf(filter);
    if ($(row).context.textContent.indexOf(filter) < 0) {
     $(row).hide(); 
    }
  }
}

var CreateFilterBox = function(filter) {
  var box = '';
  box = box.concat('<button type="button" id="but" class="btn btn-primary btn-xs">',
                   filter, '</button>');
  $('#filters').append(box);
  $('button').on('click', RemoveFilter); 
}

var ShowAllRows = function(rows) {
  for (var i = 0; i < rows.length; ++i) {
    $(rows[i]).show();
  }
}

var RemoveFilter = function() {
  $(this).remove();
  ReFilter();
}

var ReFilter = function() {
  var rows = GetRows();
  // show all rows again
  ShowAllRows(rows);
  // ADD functionality to actually stop filtering those elements.
  $('#filters button').each(function(rows){
    Filter($(this).text(), rows); 
  });
}
