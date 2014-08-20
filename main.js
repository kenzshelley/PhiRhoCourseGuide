$(document).ready(function() {
  // Load all Course entries from parse into database table.
  Parse.initialize("Ja95BMYq8EWBbF0bsGFsQUjpHqcRXl81eoTr6WRW",
    "DSHMNswCbwANFJ6SyWKVmI3AdfdsQI9FwOYDJ7gc");
  LoadAll();
  $('input').keyup(function(event) {
    var filter = $('input').val().toUpperCase();
    // Put all table rows in an array
    var rows = Array();
    $("#entries tr").each(function(i, v){
      rows[i] = this;
    });
    // If the backspace key was pressed, show all entries again and refilter
    if (event.keyCode == 8) {
      for (var i = 0; i < rows.length; ++i) {
        $(rows[i]).show();
      }
    }
    // Hide any rows that do not match the filter
    for (var i = 0; i < rows.length; ++i) {
      var row = rows[i];
      var test = $(row).context.textContent;
      test.indexOf(filter);
      if ($(row).context.textContent.indexOf(filter) < 0) {
       $(row).hide(); 
      }
    }
    // Add box if enter key is pressed
    if (event.keyCode == 13) {
      $('input').val('');

    }
  });
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
                 var result = '';
                 var r = result.concat('<tr><td> ',
                   object.get('department'),
                   '</td><td>', object.get('number'), '</td><td>',
                   object.get('difficulty'), '</td><td>', object.get('workload'),
                   '</td><td>', object.get('overall'), '</td></tr>');
                 $('#entries').append(r);
               }
             },
    error: function(error) {
             alert("Error: " + error.code + " " + error.message); 
           }
  });
}

