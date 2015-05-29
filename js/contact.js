$(document).ready(function () {
    $("#contactForm").submit(function (e) {
        e.preventDefault();
        var form = $(this).serialize();
        $.post("../contact.php", form, function(response) {
            if (response === "1") {
                $("#contactForm").prepend('<div class="alert alert-success" role="alert">Your message was submitted. We will get back to you soon!</div>');
            } else {
                $("#contactForm").prepend('<div class="alert alert-danger" role="alert">Your message was not submitted. Please try again.</div>');
            }
        })
    })
})