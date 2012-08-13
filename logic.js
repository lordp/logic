var coords_regex = /grid_([0-9])_([0-9])_squares_([0-9])_([0-9])/;
$('.square').live('mouseover',function () {
  $(this).addClass('hover');
  var coords = $(this).attr("id").match(coords_regex);
  var top_title = $('#title_top_' + coords[1] + '_' + coords[3]).val();
  var left_title = $('#title_left_' + coords[2] + '_' + coords[4]).val();
  $('#info').html("<p>" + left_title + "</p><p>" + top_title + "</p>");
}).live('mouseout',function () {
  $(this).removeClass('hover');
  $('#info').empty();
}).live('click', function (e) {
  if (e.ctrlKey) {
    $(this).removeClass('red').toggleClass('green');
    var coords = $(this).attr("id").match(coords_regex);
    if (coords[2] == 0) {
      var top_title = $('#title_top_' + coords[1] + '_' + coords[3]).val();
      var left_title = $('#title_left_' + coords[2] + '_' + coords[4]).val();

      if ($(this).hasClass('green')) {
        $('#answer_' + coords[2] + '_' + coords[4]).val(left_title);
        $('#answer_' + (parseInt(coords[1]) + 1) + '_' + coords[4]).val(top_title);
      }
      else {
        $('#answer_' + coords[2] + '_' + coords[4]).val('');
        $('#answer_' + (parseInt(coords[1]) + 1) + '_' + coords[4]).val('');
      }
    }
  }
  else {
    $(this).removeClass('green').toggleClass('red');
  }
});

$(function () {
  var squares = $('#squares').val();
  var firstrow = $('#firstrow').val();

  var title_map = [];
  for (j = 0; j < squares; j++) {
    title_map.push(['top_1_' + j, 'left_2_' + j]);
    title_map.push(['top_2_' + j, 'left_1_' + j]);
  }

  $.each(title_map, function(index, map) {
    $('#title_' + map[0]).live('keyup', function() {
      $('#title_' + map[1]).val($(this).val());
    });

    $('#title_' + map[1]).live('keyup', function() {
      $('#title_' + map[0]).val($(this).val());
    });
  });

  $('#build').click(function () {
    var squares = $('#squares').val();
    var firstrow = $('#firstrow').val();

    $('#answers').empty();
    var head = $('<thead>');
    var headrow = $('<tr>');
    for (var i = 0; i < parseInt(firstrow) + 1; i++) {
      var headcell = $('<th>');
      $('<input>').attr({ "type": "text", "id": "answer_title_" + i }).appendTo(headcell);
      headcell.appendTo(headrow);
    }
    headrow.appendTo(head);
    head.appendTo('#answers');

    var body = $('<tbody>');
    for (var i = 0; i < squares; i++) {
      var bodyrow = $('<tr>');
      for (var j = 0; j < parseInt(firstrow) + 1; j++) {
        var bodycell = $('<td>');
        $('<input>').attr({ "type": "text", "id": "answer_" + j + '_' + i }).appendTo(bodycell);
        bodycell.appendTo(bodyrow);
      }
      bodyrow.appendTo(body);
    }
    body.appendTo('#answers');


    $('#puzzle').empty();

    var row = $('<tr>');
    $('<td>').addClass('solid-right').addClass('solid-bottom').addClass('titles-size').attr({ "id": "info"}).appendTo(row);
    for (var gridrowsacross = 0; gridrowsacross < firstrow; gridrowsacross++) {
      for (var squaresacross = 0; squaresacross < squares; squaresacross++) {
        var cell = $('<td>').addClass('solid-bottom').addClass('titles').addClass('top-title');
        if (squaresacross == (squares - 1)) {
          cell.addClass('solid-right');
        }

        var id = "title_top_" + gridrowsacross + '_' + squaresacross;
        $('<input>').attr({ "type": "text", "id": id }).appendTo(cell);

        cell.appendTo(row);
      }
    }

    row.appendTo('#puzzle');

    // grid rows
    for (var gridrowsdown = 0; gridrowsdown < firstrow; gridrowsdown++) {
      for (var squaresdown = 0; squaresdown < squares; squaresdown++) {
        row = $('<tr>');
        cell = $('<td>').addClass('solid-right').addClass('titles').addClass('left-title');
        if (squaresdown == (squares - 1)) {
          cell.addClass('solid-bottom');
        }

        var id = "title_left_" + gridrowsdown + '_' + squaresdown;
        $('<input>').attr({ "type": "text", "id": id}).appendTo(cell);

        cell.appendTo(row);

        for (gridrowsacross = 0; gridrowsacross < firstrow - gridrowsdown; gridrowsacross++) {
          for (squaresacross = 0; squaresacross < squares; squaresacross++) {
            var id = "grid_" + gridrowsacross + '_' + gridrowsdown + "_squares_" + squaresacross + '_' + squaresdown;
            cell = $('<td>').addClass('square').attr({ "id": id });
            if (squaresacross == (squares - 1)) {
              cell.addClass('solid-right');
            }
            if (squaresdown == (squares - 1)) {
              cell.addClass('solid-bottom');
            }
            cell.appendTo(row);
          }
        }

        row.appendTo('#puzzle');
      }
    }
  });
});
