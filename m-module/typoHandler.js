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
            $('#m-mistake').after('<div id="m-overlay"></div>');
            $('#m-mistake, #m-overlay').fadeIn();

        }
    });
    
    $('.m-link').click(function() {
        var url = window.location;
        var mis = '';
        $('input#m-url').val(url);
        $('textarea#m-mis').val(mis);
        $('#m-mistake').after('<div id="m-overlay"></div>');
        $('#m-mistake, #m-overlay').fadeIn();
    });

    //edit all to val
    $('#m-clear').click(function(){
        $('#m-mistake, #m-overlay').fadeOut();
        $('input#m-url').val('');
        $('textarea#m-mis').val('');
        $('textarea#m-comment').val('');
        setTimeout(function(){
                $('#m-overlay').remove();
            }, 1500);
    });

    $("#m-ajax").submit(function(){
        var form = $(this);
        var data = form.serialize();
        $.ajax({
            type: 'POST',
            url: 'm-module/typoMailer.php',  //path to your php script
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
                console.log(data);
                if (data.responseText == 'error1') {
                    $('#m-mistake').after('<div id="m-error"><p>Error.<br><br>You have not filled the form!</p></div>');
                    $('#m-error').fadeIn();
                    $('#m-error').delay(2000).fadeOut();
                    var url = window.location;
                    var mis = '';
                    $('input#m-url').val(url);
                    $('textarea#m-mis').val(mis);
                    $('#m-mistake').fadeIn();
                } else {
                    $('#m-mistake').after('<div id="m-thanks"><p>Your message has been sent.<br><br> Thank you!</p></div>');
                    $('#m-thanks').fadeIn();
                    $('#m-thanks').delay(1000).fadeOut();
                    $('#m-overlay').delay(1300).fadeOut();
                    setTimeout(function(){
                        $('#m-overlay, #m-thanks').remove();
                    }, 2500)
                }
            }

        });
        return false;
    });
});
