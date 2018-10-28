<html>
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
        <form id="xyr-form" name="xyr"  method="post">
            <br>

            <div id="x-block">
                <select id="x-input" name="x-input" required oninvalid="this.setCustomValidity('Выберите X из списка')"
                        oninput="setCustomValidity('')">
                    <option value="" selected disabled>Выберите координату X</option>
                    <option value="-5">-5</option>
                    <option value="-4">-4</option>
                    <option value="-3">-3</option>
                    <option value="-2">-2</option>
                    <option value="-1">-1</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>
            <br>

            <div id="y-block">
                <input id="y-input" type="text" name="y-input" placeholder="Введите координату Y"
                       required="Введите Х" oninvalid="this.setCustomValidity('Введите Y')"
                       oninput="setCustomValidity('')">
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