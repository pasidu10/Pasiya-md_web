<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST["name"]));
    $email = htmlspecialchars(trim($_POST["email"]));
    $message = htmlspecialchars(trim($_POST["message"]));

    $to = "pasidusampath808@gmail.com"; // Feedback එක යැවිය යුතු email
    $subject = "PASIYA-MD Feedback from $name";
    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "Thank you for your feedback!";
    } else {
        echo "Sorry, there was a problem sending your feedback.";
    }
} else {
    echo "Invalid request.";
}
?>
