<?php

$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$from = 'From: loris.ca'; 
$to = 'derek.lo@mcgill.ca'; 
$subject = 'A new message from loris.ca contact form';

$human = $_POST['human'];

$body = "From: $name\n E-Mail: $email\n Message:\n $message";

if ($_POST['submit']) {
    if ($name != '' && $email != '') {
        if (mail ($to, $subject, $body, $from)) { 
            print '<p>Your message has been sent</p><p>(page will reload in 5 seconds)</p>';
            header('Refresh: 5; url=http://3design-dlo.com/test/loris/contact.html');
        } else { 
            print '<p>Something went wrong, please try again!</p><p>(page will reload in 5 seconds)</p>';
            header('Refresh: 5; url=http://3design-dlo.com/test/loris/contact.html'); 
        } 
    } else {
        print '<p>Not sent. Please fill all required fields</p><p>(page will reload in 5 seconds)</p>';
        header('Refresh: 5; url=http://3design-dlo.com/test/loris/contact.html');
    } 
} 
?>