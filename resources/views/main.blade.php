<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Seneca</title>
        <link href="{{asset('css/app.css')}}" rel="stylesheet" type="text/css">
    </head>
    <body>
        <div style="max-width: 1440px; margin: 0 auto;">
            <nav style="padding: 12px 0; margin-bottom: 24px">Seneca</nav>
            <div id="root"></div>
        </div>
        <script src="{{asset('js/app.js')}}" ></script>
    </body>
</html>
