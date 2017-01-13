$(document).ready(function() {

  $(document).keydown(function (event) {
          function getSelText() {
              var text = "";
              if (window.getSelection) {
                  text = window.getSelection().toString();
              } else if (document.selection && document.selection.type != "Control") {
                  text = document.selection.createRange().text;
              }
              return text;
          }
          if ((event.keyCode == 10 || event.keyCode == 13) && event.ctrlKey) {
              var url = window.location;
              var mis = getSelText();

              $('input#murl').val(url);
              $('textarea#mmis').val(mis);
              $('#mistake, #black-back2').fadeIn();

          }
      });
      $('#mclear').click(
          function(){
              $('#mistake, #black-back2').fadeOut();
              $('input#murl').val('');
              $('textarea#mmis').val('');
              $('textarea#mmcomment').val('');

          });

      $("#majax").submit(function(){
          var form = $(this);
          var data = form.serialize();
          $.ajax({
              type: 'POST',
              url: 'errorMailer.php',  //path to your php script
              data: data,
              beforeSend: function(data) {
                  form.find('input[type="submit"]').attr('disabled', 'disabled');
              },
              complete: function(data) {
                  form.find('input[type="submit"]').prop('disabled', false);
                  $('#mistake').fadeOut();
                  $('input#murl').val('');
                  $('textarea#mmis').val('');
                  $('textarea#mmcomment').val('');

                  $('#mthanks').fadeIn();
                  $('#mthanks').delay(1000).fadeOut();
                  $('#black-back2').delay(1400).fadeOut();
              }

          });
          return false;
      });
});
