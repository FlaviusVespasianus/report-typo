<?php
if (!($_POST['mbot'])) {
    $url = $_POST["murl"];
    $mis = $_POST["mmis"];
    $comment = $_POST["mcomment"];

    $to = "your@mail.com";
    $subject = "Error on the webpage";

    $email_content = "Ссылка: $url\n";
    $email_content .= "Ошибка: $mis\n\n";
    $email_content .= "Сообщение:\n$comment\n";

    $sent = mail($to, $subject, $email_content);
    
    print json_encode($sent);
}
