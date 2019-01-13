<?php
$loginUrl = \App\URLModel::FRONT_URL . '/login';
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
        <td style="padding: 0px 10px;text-transform: uppercase; text-align: right;">Welcome!</td>
    </tr>
    <tr>
        <td colspan="2" style="text-align: center;padding: 0px 10px; line-height: 1.2em;">
            <h2 style="text-transform: uppercase; margin-top: 50px; margin-bottom: 50px;">Hello {{$data['name']}}</h2>
            <p>Here is your login information:</p>
            <p>username: <strong>{{ $data['email']  }}</strong></p>
            <p>Password: <strong>{{ $data['password']  }}</strong></p>
            <p style="text-align: center; padding-top: 50px;">
                <a href="{{ $loginUrl  }}" style="
                        width: 300px;
                        height: 40px;
                        background-color: #ff6600;
                        color: #ffffff;
                        -webkit-border-radius: 0px;
                        -moz-border-radius: 0px;
                        border-radius: 0px;
                        border: none;
                        padding: 15px 25px;
                        text-decoration: none;
                    ">Login</a>
            </p>
            <br>
            <p>If you didn't create this account, please inform us immediately by replying to this email.</p>
        </td>
    </tr>
    <tr>
        <td colspan="2" style="height: 20px; background-color: #8037B7;"></td>
    </tr>
    </tbody>
</table>
</body>
</html>