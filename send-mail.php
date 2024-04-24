<?php

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require "PHPMailer/src/Exception.php";
    require "PHPMailer/src/PHPMailer.php";

    $mail = new PHPMailer(true); /* Создаем объект MAIL */
    $mail->CharSet = "UTF-8"; /* Задаем кодировку UTF-8 */
    $mail->IsHTML(true); /* Разрешаем работу с HTML */

    $message = $_POST["message"]; /* Сообщение с формы */

    $body = $message.;
    $theme = "[Заявка с формы]";

    $mail->addAddress("nik.zagibalov.00@mail.ru");

    $mail->Subject = $theme;
    $mail->Body = $body;
    $mail->send():