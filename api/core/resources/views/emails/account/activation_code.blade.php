<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Activation Code</title>
</head>
<body>
    <table cellpadding="10" cellspacing="0">
        <tbody>
        <tr>
            <td style="background: #5fba7d;">
                <h1>Welcome to Individufy!</h1>
            </td>
        </tr>
        <tr>
            <td>
                <p>Hello {{$data['user']->name}}, please use the following link to verify your account:</p>
                <a href="https://myedugami.com/activate/{{ $data['activation_key']  }}">https://myedugami.com/activate/{{ $data['activation_key']  }}</a>
                <br>
                <p><strong>Important:</strong> You can only login in your account once you have verified it.</p>
            </td>
        </tr>
        <tr>
            <td></td>
        </tr>
        </tbody>
    </table>
</body>
</html>