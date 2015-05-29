<?php

$to = 'info-loris.mni' . '@mcgill.ca';
$name = $_POST['name'];
$from = $_POST['email'];
$subject = 'Message from loris.ca from ' . $name;
$message = wordwrap($_POST['message'], 70, "\r\n");
$headers = 'From: ' . $name . "\r\n" .
           'Reply-To' . $from . "\r\n" .
           'X-Mailer: PHP/' . phpversion();

if (!$name) {
    print "name";
}
else if (!$from || !filter_var($from, FILTER_VALIDATE_EMAIL)) {
    print "email";
}
else if (!$message) {
    print "message";
}
else {
    $success = mail($to, $subject, $message, $headers);
    if ($success) {
        print "1";
    } else {
        print "notSent";
    }
}

?>