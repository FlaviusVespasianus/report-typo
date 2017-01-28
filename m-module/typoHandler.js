$(document).ready(function() {

    var $mUrl = $('#m-url');
    var $mMis = $('#m-mis');
    var $mCom = $('#m-comment');
    var $mMistake = $('#m-mistake');

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
            $mUrl.val(url);
            $mMis.val(mis);
            $mMistake.after('<div id="m-overlay"></div>');
            $mMistake.add('#m-overlay').fadeIn();
        }
    });
    
    $('.m-link').click(function() {
        var url = window.location;
        var mis = '';
        $mUrl.val(url);
        $mMis.val(mis);
        $mMistake.after('<div id="m-overlay"></div>');
        $mMistake.add('#m-overlay').fadeIn();
    });

    $('#m-clear').click(function() {
        var $mOverlay = $('#m-overlay');

        $mMistake.add($mOverlay).fadeOut();
        $mUrl.add($mMis).add($mCom).val('');
        setTimeout(function(){
                $mOverlay.remove();
            }, 1500);
    });

    $("#m-ajax").submit(function() {
        var form = $(this);
        var data = form.serialize();

        $.ajax({
            type: form.attr('method'),
            url: 'm-module/typoMailer.php',  //path to your php script
            data: data,
            beforeSend: function(data) {
                form.find('input[type="submit"]').attr('disabled', 'disabled');
            },
            complete: function(data) {
                form.find('input[type="submit"]').prop('disabled', false);
                $mMistake.fadeOut();
                $mUrl.add($mMis).add($mCom).val('');

                if (data.responseText == 'error1') {
                    $mMistake.after('<div id="m-error"><p>Error.<br><br>You have not filled the form!</p></div>');
                    var $mError = $('#m-error');

                    $mError.fadeIn();
                    $mError.delay(2000).fadeOut();

                    var url = window.location;
                    var mis = '';
                    $mUrl.val(url);
                    $mMis.val(mis);
                    $mMistake.fadeIn();
                } else {
                    $mMistake.after('<div id="m-thanks"><p>Your message has been sent.<br><br> Thank you!</p></div>');
                    var $mThanks = $('#m-thanks');
                    var $mOverlay = $('#m-overlay');

                    $mThanks.fadeIn();
                    $mThanks.delay(1000).fadeOut();
                    $mOverlay.delay(1300).fadeOut();
                    setTimeout(function() {
                        $mThanks.add($mOverlay).remove();
                    }, 2500)
                }
            }
        });
        return false;
    });
});
