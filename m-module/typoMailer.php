<?php
if (!isset($_POST["m-bot"])) {
    if (($_POST['m-comment']) || ($_POST['m-mis'])) {
        $url = $_POST["m-url"];
        $mis = $_POST["m-mis"];
        $comment = $_POST["m-comment"];

        $to = "your@mail.com";
        $subject = "Error on the webpage";

        $email_content = "Adress: $url\n\n";
        $email_content .= "Error: $mis\n\n";
        $email_content .= "Message:\n$comment\n";

        $sent = mail($to, $subject, $email_content);
        print json_encode($sent);
    } else {
        print 'error1';
    }
}
