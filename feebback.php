<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = htmlspecialchars($_POST['name']);
  $email = htmlspecialchars($_POST['email']);
  $message = htmlspecialchars($_POST['message']);

  $to = "pasidusampath808@gmail.com"; // ✅ මෙතන දැන් ඔයාගෙ email
  $subject = "New Feedback from $name";
  $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";

  if (mail($to, $subject, $body)) {
    echo "ඔයාගෙ අදහස සාර්ථකව එවලා තියෙනවා! 📨";
  } else {
    echo "Message එක යැවීමේදී දෝෂයක් වුණා 😢";
  }
}
?>
