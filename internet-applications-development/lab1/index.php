<?php
session_start();
if ($_SESSION["rows"] == null)
$_SESSION["rows"] = array(); ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="shortcut icon" href="/img/favicon.ico">
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="styles.css">
    <title>Лабораторная 1</title>
</head>
<body>
<div class="container">
    <header id="header" class="contentBlock">
        <ul class="about">
            <li><span class="name">Даниил Толстов</span></li>
            <li><span class="group">P3200</span></li>
            <li><span class="variant">Вариант 18018</span></li>

        </ul>
    </header>
    <main id="main" class="contentBlock">
        <div id="form-and-grid">
        <form id="xyr-form" name="xyr" action="/script.php" method="post">
            <div id="x-block">
                <input id="x-input" type="text" name="x-input" placeholder="Введите координату Х"
                       required="Введите Х" oninvalid="this.setCustomValidity('Введите Х')"
                       oninput="setCustomValidity('')">
            </div>
            <br>

            <div id="y-block">
                <select id="y-input" name="y-input" required oninvalid="this.setCustomValidity('Выберите Y из списка')"
                        oninput="setCustomValidity('')">
                    <option value="" selected disabled>Выберите координату Y</option>
                    <option value="-2">-2</option>
                    <option value="-1.5">-1.5</option>
                    <option value="-1">-1</option>
                    <option value="-0.5">-0.5</option>
                    <option value="0">0</option>
                    <option value="0.5">0.5</option>
                    <option value="1">1</option>
                    <option value="1.5">1.5</option>
                    <option value="2">2</option>
                </select>
            </div>
            <br>


            <div id="r-block">
                <span class="enter-r">Выберите масштаб R:</span><br>
                <input name="r-buttons" type="radio" value="1" required
                       oninvalid="this.setCustomValidity(this.willValidate ? '' : 'Выберите R')">1<br>
                <input name="r-buttons" type="radio" value="1.5">1.5<br>
                <input name="r-buttons" type="radio" value="2">2<br>
                <input name="r-buttons" type="radio" value="2.5">2.5<br>
                <input name="r-buttons" type="radio" value="3">3<br>
                <br><input type="submit" value="Проверить">
            </div>
            <br>
        </form>
        <div id="canvas-frame"><canvas id="grid"></canvas></div>
        </div>
    </main>
</div>
<script type="text/javascript" src="javascript.js"></script>
</body>
</html>