<?php
$resetUrl = $data['is_not_admin_panel'] ? \App\URLModel::FRONT_URL : \App\URLModel::DASH_URL;
$resetUrl .= '/do_password_reset/' . $data['token'];
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Activation Code</title>
</head>
<body style="padding: 40px 100px; background: #EEEEEE; width: 100%;">
    <table cellpadding="0" cellspacing="0" style="min-width: 300px; max-width: 600px; background: white; margin-left: auto; margin-right: auto;">
        <tbody>
            <tr>
                <td colspan="2" style="height: 20px; background-color: #8037B7;"></td>
            </tr>
            <tr>
                <td style="text-align: left;padding: 0px 10px;">
                    <img src="https://learn.myedugami.com/assets/img/logo.png" alt="Edugami Logo" style="max-width: 450px; max-height: 45px;">
                </td>
                <td style="padding: 0px 10px;text-transform: uppercase; text-align: right;">PASSWORD RESET</td>
            </tr>
            <tr>
                <td colspan="2" style="text-align: center;padding: 0px 10px;">
                    <h2 style="text-transform: uppercase; margin-top: 30px; margin-bottom: 50px;">Hello {{$data['user']->name}}</h2>
                    <p style="margin-bottom: 50px;">Someone recently requested that the password be reset for your account.</p>
                    <p style="margin-bottom: 50px;">To reset your password please click this button:</p>

                    <p style="margin-bottom: 50px;">
                        <a style="color: white; text-decoration: none; padding: 10px 20px; width: 170px;height: 36px;background: #F3821E;box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);border-radius: 2px;" href="{{ $resetUrl  }}">Reset Password</a>
                    </p>

                    <p style="margin-bottom: 10px;"><strong>Important:</strong> If this is a mistake just ignore this email - your password will not be changed.</p>
                </td>
            </tr>
            <tr>
                <td colspan="2" style="background: lightgray; height: 2px;"></td>
            </tr>
            <tr>
                <td colspan="2" style="text-align: center;padding: 0px 10px;">
                    <p><strong>Trouble Clicking?</strong> Copy and paste the following URL into your browser:</p>
                    <p style="color: #0000EE; margin-top: 10px; margin-bottom: 20px;">
                        <small>{{ $resetUrl  }}</small>
                    </p>
                </td>
            </tr>
            <tr>
                <td colspan="2" style="height: 20px; background-color: #8037B7;"></td>
            </tr>
        </tbody>
    </table>
</body>
</html>