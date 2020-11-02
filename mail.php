<?php 

if (isset($_POST)) {
	
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$form = $_POST['form_name'];

$form_date_in = $_POST['in-date'];
$form_date_out = $_POST['out-date'];

// несколько получателей
$to = 'andrewlap1@gmail.com'; // обратите внимание на запятую
//$to = 'sahar108@gmail.com'; // обратите внимание на запятую

// тема письма
$subject = 'На сайте заполнена форма';

// текст письма
$message = '
<html>
<head>
  <title>Заявка с сайта</title>
</head>
<body>
  <p><strong>Форма:</strong> '.$form.'</p>
  <p><strong>Телефон:</strong> '.$phone.'</p>
';
if ($name) {
  $message .= '<p><strong>Имя:</strong> '.$name.'</p>';
}
if($form_date_in) {
  $message .= '<p><strong>Дата заселения:</strong> '.$form_date_in.'</p>';
}
if($form_date_out) {
  $message .= '<p><strong>Дата выселения:</strong> '.$form_date_out.'</p>';
}

$message .= '</body>
</html>';
// Для отправки HTML-письма должен быть установлен заголовок Content-type
$headers  = 'MIME-Version: 1.0' . "\r\n".
		'Content-type: text/html; charset=utf-8' . "\r\n".
		'From: Reka <noreply@reka.com>' . "\r\n" .
    'Reply-To: Reka <noreply@reka.com>' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

// Отправляем
mail($to, $subject, $message, $headers);

}
?>