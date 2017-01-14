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

            $('input#m-url').val(url);
            $('textarea#m-mis').val(mis);
            $('#m-mistake, #m-overlay').fadeIn();

        }
    });

    $('#m-clear').click(function(){
        $('#m-mistake, #m-overlay').fadeOut();
        $('input#m-url').val('');
        $('textarea#m-mis').val('');
        $('textarea#m-comment').val('');
    });

    $("#m-ajax").submit(function(){
        var form = $(this);
        var data = form.serialize();
        $.ajax({
            type: 'POST',
            url: 'typoMailer.php',  //path to your php script
            data: data,
            beforeSend: function(data) {
                form.find('input[type="submit"]').attr('disabled', 'disabled');
            },
            complete: function(data) {
                form.find('input[type="submit"]').prop('disabled', false);
                $('#m-mistake').fadeOut();
                $('input#m-url').val('');
                $('textarea#m-mis').val('');
                $('textarea#m-comment').val('');

                $('#m-thanks').fadeIn().delay(1000).fadeOut();
                $('#m-overlay').delay(1400).fadeOut();
            }

        });
        return false;
    });
});
