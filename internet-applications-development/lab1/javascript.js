let form = document.getElementById("xyr-form");
canvas("grid", 0, 0, 2);
form.addEventListener("input", validateX);
form.addEventListener("submit", validateX);
form.addEventListener("submit", submit);
window.onload = getSessionData;

/* --------- Submit ---------------------------*/
function submit() {
    if (validateX()){
    let formData = new FormData(form);
    event.preventDefault();
    fetch("script.php", {
        method: "POST",
        credentials: "include",
        body: formData,
    })
        .then(function (response) {
            // response.text().then(function (text) {
            //     alert(text);
            // });
            response.json().then(function (responseArray) {
                createTable();
                insertRow(responseArray);
                canvas("grid", responseArray["x"], responseArray["y"], responseArray["r"]);
            })


            //response.text().then(function (text) {
            //    let responseSpan = document.createElement("span");
            //    responseSpan.id = "response";
            //    responseSpan.innerHTML = text;
            //    document.getElementById("main").appendChild(responseSpan);
            //})
        })
        .catch(function (exception) {

        })
    }
}

function insertRow(row) {
    let resultTable = document.getElementById("result-table")
    let newRow = document.createElement("tr");
    for (let key in row) {
        let newCell = document.createElement("td");
        newCell.innerText = row[key];
        newRow.appendChild(newCell);
    }
    resultTable.appendChild(newRow);
}

function createTable() {
    let main = document.getElementById("main");
    let resultTable = document.getElementById("result-table");
    if (resultTable == undefined) {
        resultTable = document.createElement("table");
        resultTable.id = "result-table";
        let tBody = document.createElement("tbody");
        resultTable.appendChild(tBody);
        let headers = document.createElement("tr");
        headers.id = "result-table-headers";
        tBody.appendChild(headers);

        /* Adding columns */
        let columnX = document.createElement("td");
        columnX.id = "result-table-x";
        columnX.innerText = "Коор. X";
        headers.appendChild(columnX);
        let columnY = document.createElement("td");
        columnY.id = "result-table-y";
        columnY.innerText = "Коор. Y";
        headers.appendChild(columnY);
        let columnR = document.createElement("td");
        columnR.id = "result-table-r";
        columnR.innerText = "Коор. R";
        headers.appendChild(columnR);
        let columnResult = document.createElement("td");
        columnResult.id = "result-table-res";
        columnResult.innerText = "Результат";
        headers.appendChild(columnResult);
        let columnCurrentTime = document.createElement("td");
        columnCurrentTime.id = "result-table-current-time";
        columnCurrentTime.innerText = "Текущее время";
        headers.appendChild(columnCurrentTime);
        let columnExecutionTime = document.createElement("td");
        columnExecutionTime.id = "result-table-execution-time";
        columnExecutionTime.innerText = "Время выполнения";
        headers.appendChild(columnExecutionTime);

        main.appendChild(resultTable);
    }
}

/* --------- Validate ---------------------------*/
function validateX() {
    let x = form.elements["x-input"].value;
    if (!(isNaN(x)) && (x >= -5) && (x <= 3)) {
        removeErrorX();
        return true;
    } else {
        event.preventDefault();
        showErrorX();
        return false
    }
}

/*function validateY() {
    let y = form.elements["y-input"].value;
    if (!isNaN(y)) {
        removeErrorY();
        return true;
    } else {
        event.preventDefault();
        showErrorY()
        return false;
    }
}
*/

/*function validateR() {
    let r = form.elements["r-buttons"].value;
    if (!isNaN(r) && !(r == "")) {
        removeErrorR();
        return true;
    } else {
        event.preventDefault();
        showErrorR();
        return false;
    }
}*/


/* --------- Show Errors ---------------------------*/
function showErrorX() {
    let xBlock = document.getElementById("x-block");
    if (!xBlock.contains(document.getElementById("x-error"))) {
        let errorSpan = document.createElement("span");
        errorSpan.id = "x-error";
        errorSpan.classList.add("error-span");
        errorSpan.innerHTML = "<br>Неверное значение X";
        xBlock.appendChild(errorSpan);
        form.elements["x-input"].classList.add("error-input");
    }
}

/*function showErrorY() {
    let yInput = document.getElementById("y-block");
    let ySelect = document.getElementById("y-input");
    if (!yInput.contains(document.getElementById("y-error"))) {
        let errorSpan = document.createElement("span");
        errorSpan.id = "y-error";
        errorSpan.classList.add("error-span");
        errorSpan.innerHTML = "<br>Выберите значение Y";
        yInput.appendChild(errorSpan);
        ySelect.classList.add("y-error")
    }
}
*/

/*
function showErrorR() {
    let rInput = document.getElementById("r-block");
    if (!rInput.contains(document.getElementById("r-error"))) {
        let errorSpan = document.createElement("span");
        errorSpan.id = "r-error";
        errorSpan.classList.add("error-span");
        errorSpan.innerHTML = "Выберите значение R";
        rInput.appendChild(errorSpan);
    }
}
*/


/* --------- Remove Errors ---------------------------*/
function removeErrorX() {
    let xBlock = document.getElementById("x-block");
    if (xBlock.contains(document.getElementById("x-error"))) {
        xBlock.removeChild(document.getElementById("x-error"));
        form.elements["x-input"].classList.remove("error-input");
    }


}

/*function removeErrorY() {
    let yInput = document.getElementById("y-block");
    let ySelect = document.getElementById("y-input");
    if (yInput.contains(document.getElementById("y-error"))) {
        yInput.removeChild(document.getElementById("y-error"));
        ySelect.classList.remove("y-error")
    }
}
*/

/*
function removeErrorR() {
    let rInput = document.getElementById("r-block");
    if (rInput.contains(document.getElementById("r-error"))) {
        rInput.removeChild(document.getElementById("r-error"));
    }

}
*/
function getSessionData() {
    fetch("sessions.php", {
        credentials: "include"
    }).then(function (response) {
        // response.text().then(function (text) {
        //     alert(text);
        // });
        response.json().then(function (sessionRows) {
            if (sessionRows.length > 0) {
                createTable();
                for (let row in sessionRows) {
                    insertRow(sessionRows[row]);
                }
            }
        })
    });
}

function canvas(id, x, y, r) {
    var canvas = document.getElementById(id);
    if (canvas.getContext) {
        var context = canvas.getContext("2d")

        var width = canvas.width;
        var height = canvas.height;

        var half_width = width / 2;
        var half_height = height / 2;

        var quarter_width = half_width / 2 - (width / 20);
        var quarter_height = half_height / 2 - (height / 20);

        var pointer_x = (x / r) * quarter_width * 2;
        var pointer_y = (y / r) * quarter_height * 2;

        context.clearRect(0, 0, width, height);


        context.strokeStyle = "black";
        context.fillStyle = "black";
        //Create grid
        {
            context.beginPath();
            context.font = "10px sans-serif";
            context.moveTo(0, half_height);
            context.lineTo(width, half_height);
            context.lineTo(width - 8, half_height + 3);
            context.lineTo(width - 8, half_height - 3);
            context.lineTo(width, half_height);
            context.fillText("X", width - 8, half_height - 7);

            context.moveTo(half_width, 0);
            context.lineTo((half_width) - 3, 8);
            context.lineTo((half_width) + 3, 8);
            context.lineTo(half_width, 0);
            context.lineTo(half_width, height);
            context.fillText("Y", half_width + 5, 10);


            context.moveTo(half_width - 2 * quarter_width, half_height - 4);
            context.lineTo(half_width - 2 * quarter_width, half_height + 4);
            context.fillText(-r, half_width - 2 * quarter_width - 5, half_height - 6);

            context.moveTo(half_width - 1 * quarter_width, half_height - 4);
            context.lineTo(half_width - 1 * quarter_width, half_height + 4);
            context.fillText(-r / 2, half_width - 1 * quarter_width - 8, half_height - 6);

            context.moveTo(half_width + 2 * quarter_width, half_height - 4);
            context.lineTo(half_width + 2 * quarter_width, half_height + 4);
            context.fillText(r, half_width + 2 * quarter_width - 3, half_height - 6);

            context.moveTo(half_width + 1 * quarter_width, half_height - 4);
            context.lineTo(half_width + 1 * quarter_width, half_height + 4);
            context.fillText(r / 2, half_width + 1 * quarter_width - 5, half_height - 6);


            context.moveTo(half_width - 4, half_height - (2 * quarter_height));
            context.lineTo(half_width + 4, half_height - (2 * quarter_height));
            context.fillText(r, half_width + 5, half_height - 2 * quarter_height + 4);

            context.moveTo(half_width - 4, half_height - (1 * quarter_height));
            context.lineTo(half_width + 4, half_height - (1 * quarter_height));
            context.fillText(r / 2, half_width + 5, half_height - 1 * quarter_height + 4);

            context.moveTo(half_width - 4, half_height + (2 * quarter_height));
            context.lineTo(half_width + 4, half_height + (2 * quarter_height));
            context.fillText(-r, half_width + 5, half_height + 2 * quarter_height + 4);

            context.moveTo(half_width - 4, half_height + (1 * quarter_height));
            context.lineTo(half_width + 4, half_height + (1 * quarter_height));
            context.fillText(-r / 2, half_width + 5, half_height + 1 * quarter_height + 4);

            context.closePath();
            context.strokeStyle = "black";
            context.fillStyle = "black";
            context.stroke();
            context.fill();
        }

        //Create figure
        {
            context.beginPath();
            context.moveTo(half_width, half_height);
            context.ellipse(half_width, half_height, quarter_width, quarter_height, 0, 0, Math.PI * 3 / 2, true);
            context.rect(half_width - quarter_width, half_height - 2 * quarter_height, quarter_width, 2 * quarter_height);

            context.moveTo(half_width, half_height);
            context.lineTo(half_width, half_height + quarter_height);
            context.lineTo(quarter_width / 2, half_height);
            context.lineTo(half_width, half_height);

            context.closePath();
            context.fillStyle = 'rgba(0, 97, 255, 0.7)';
            context.fill();
        }
        context.strokeStyle = "orange";
        context.fillStyle = "orange";

        //Create point of answer
        {
            context.beginPath();
            context.moveTo(half_width + pointer_x - 1, half_height - pointer_y);
            context.lineTo(half_width + pointer_x + 2, half_height - pointer_y);
            context.moveTo(half_width + pointer_x, half_height - pointer_y - 1);
            context.lineTo(half_width + pointer_x, half_height - pointer_y + 2);
            context.closePath();
        }
        context.stroke();
        context.fill();
    }
}

