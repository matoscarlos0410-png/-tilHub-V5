/* =========================================================
   ÚTILHUB V4
   JAVASCRIPT
========================================================= */


/* =========================================================
   ELEMENTOS PRINCIPALES
========================================================= */

const modal =
    document.getElementById("toolModal");

const modalBody =
    document.getElementById("modalBody");

const modalClose =
    document.getElementById("modalClose");

const mainSearch =
    document.getElementById("mainSearch");

const searchBtn =
    document.getElementById("searchBtn");

const toolCards =
    document.querySelectorAll(".tool-card");


/* =========================================================
   MODAL
========================================================= */

function openModal(content) {

    modalBody.innerHTML = content;

    modal.classList.add("active");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

}


function closeModal() {

    modal.classList.remove("active");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

}


modalClose.addEventListener(
    "click",
    closeModal
);


modal.addEventListener(
    "click",
    function(event) {

        if (
            event.target === modal
        ) {

            closeModal();

        }

    }
);


document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeModal();

        }

    }
);


/* =========================================================
   BÚSQUEDA PRINCIPAL
========================================================= */

function searchTools() {

    const query =
        mainSearch.value
        .trim()
        .toLowerCase();


    if (!query) {

        document
            .getElementById("herramientas")
            .scrollIntoView({
                behavior: "smooth"
            });

        return;

    }


    let found = false;


    toolCards.forEach(card => {

        const name =
            card.dataset.name
            .toLowerCase();


        if (
            name.includes(query)
        ) {

            card.style.display = "";

            if (!found) {

                card.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

                found = true;

            }

        } else {

            card.style.display = "none";

        }

    });


    if (!found) {

        alert(
            "No encontramos una herramienta con ese nombre."
        );

        toolCards.forEach(
            card => {
                card.style.display = "";
            }
        );

    }

}


searchBtn.addEventListener(
    "click",
    searchTools
);


mainSearch.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter"
        ) {

            searchTools();

        }

    }
);


/* =========================================================
   ABRIR HERRAMIENTAS
========================================================= */

toolCards.forEach(card => {

    card.addEventListener(
        "click",
        function(event) {

            if (
                !event.target.matches("button")
            ) {
                return;
            }


            const tool =
                card.dataset.tool;


            openTool(tool);

        }
    );

});


function openTool(tool) {

    switch (tool) {

        case "calculator":
            calculator();
            break;

        case "percentage":
            percentage();
            break;

        case "discount":
            discount();
            break;

        case "converter":
            converter();
            break;

        case "temperature":
            temperature();
            break;

        case "average":
            average();
            break;

        case "stopwatch":
            stopwatch();
            break;

        case "timer":
            timer();
            break;

        case "notes":
            notes();
            break;

        case "tasks":
            tasks();
            break;

        case "shoppingList":
            shoppingList();
            break;

        case "expenses":
            expenses();
            break;

        case "dateCounter":
            dateCounter();
            break;

        case "random":
            randomNumber();
            break;

        case "dice":
            dice();
            break;

        case "password":
            passwordGenerator();
            break;

        case "qr":
            qrGenerator();
            break;

        case "dictionary":
            dictionary();
            break;

        case "study":
            studyOrganizer();
            break;

        case "tips":
            tips();
            break;

    }

}


/* =========================================================
   1. CALCULADORA
========================================================= */

function calculator() {

    openModal(`

        <h2 class="modal-title">
            🧮 Calculadora
        </h2>

        <div class="form-group">

            <label>
                Operación
            </label>

            <input
                id="calcInput"
                class="modal-input"
                placeholder="Ej.: 25 + 8 * 2"
            >

        </div>

        <button
            class="modal-action"
            id="calcButton"
        >
            Calcular
        </button>

        <div
            class="result"
            id="calcResult"
        >
            Resultado: —
        </div>

    `);


    document
        .getElementById("calcButton")
        .addEventListener(
            "click",
            function() {

                const input =
                    document
                    .getElementById("calcInput")
                    .value
                    .trim();


                const result =
                    safeCalculate(input);


                document
                    .getElementById("calcResult")
                    .textContent =
                    "Resultado: " +
                    result;

            }
        );

}


/* Calculadora segura básica */

function safeCalculate(expression) {

    if (!expression) {

        return "Escribe una operación.";

    }


    if (
        !/^[0-9+\-*/().%\s]+$/.test(
            expression
        )
    ) {

        return "Operación no válida.";

    }


    try {

        const clean =
            expression.replace(
                /(\d+(?:\.\d+)?)%/g,
                "($1/100)"
            );


        const tokens =
            clean.match(
                /(\d+(?:\.\d+)?)|[()+\-*/]/g
            );


        if (!tokens) {

            return "Operación no válida.";

        }


        const values = [];

        const operators = [];


        const precedence = {
            "+": 1,
            "-": 1,
            "*": 2,
            "/": 2
        };


        function applyOperator() {

            const operator =
                operators.pop();

            const b =
                values.pop();

            const a =
                values.pop();


            if (
                a === undefined ||
                b === undefined
            ) {

                throw new Error();

            }


            if (
                operator === "/" &&
                b === 0
            ) {

                throw new Error();

            }


            if (operator === "+") {
                values.push(a + b);
            }

            if (operator === "-") {
                values.push(a - b);
            }

            if (operator === "*") {
                values.push(a * b);
            }

            if (operator === "/") {
                values.push(a / b);
            }

        }


        for (
            let i = 0;
            i < tokens.length;
            i++
        ) {

            const token =
                tokens[i];


            if (
                !isNaN(token)
            ) {

                values.push(
                    Number(token)
                );

                continue;

            }


            if (
                token === "("
            ) {

                operators.push(
                    token
                );

                continue;

            }


            if (
                token === ")"
            ) {

                while (
                    operators.length &&
                    operators[
                        operators.length - 1
                    ] !== "("
                ) {

                    applyOperator();

                }


                if (
                    operators.pop() !== "("
                ) {

                    throw new Error();

                }

                continue;

            }


            while (

                operators.length &&

                operators[
                    operators.length - 1
                ] !== "(" &&

                precedence[
                    operators[
                        operators.length - 1
                    ]
                ] >=
                precedence[token]

            ) {

                applyOperator();

            }


            operators.push(token);

        }


        while (
            operators.length
        ) {

            if (
                operators[
                    operators.length - 1
                ] === "("
            ) {

                throw new Error();

            }


            applyOperator();

        }


        if (
            values.length !== 1 ||
            !Number.isFinite(values[0])
        ) {

            throw new Error();

        }


        return Number(
            values[0].toFixed(8)
        );

    } catch {

        return "Operación no válida.";

    }

}


/* =========================================================
   2. PORCENTAJES
========================================================= */

function percentage() {

    openModal(`

        <h2 class="modal-title">
            % Porcentajes
        </h2>

        <div class="form-group">

            <label>
                Porcentaje
            </label>

            <input
                id="percentValue"
                class="modal-input"
                type="number"
                placeholder="Ej.: 20"
            >

        </div>

        <div class="form-group">

            <label>
                Número
            </label>

            <input
                id="percentNumber"
                class="modal-input"
                type="number"
                placeholder="Ej.: 500"
            >

        </div>

        <button
            class="modal-action"
            id="percentButton"
        >
            Calcular
        </button>

        <div
            class="result"
            id="percentResult"
        >
            Resultado: —
        </div>

    `);


    document
        .getElementById("percentButton")
        .onclick = function() {

            const p =
                Number(
                    document
                    .getElementById(
                        "percentValue"
                    ).value
                );


            const n =
                Number(
                    document
                    .getElementById(
                        "percentNumber"
                    ).value
                );


            if (
                !Number.isFinite(p) ||
                !Number.isFinite(n)
            ) {

                return;

            }


            document
                .getElementById(
                    "percentResult"
                )
                .textContent =
                `Resultado: ${(
                    n * p / 100
                ).toFixed(2)}`;

        };

}


/* =========================================================
   3. DESCUENTO
========================================================= */

function discount() {

    openModal(`

        <h2 class="modal-title">
            🏷️ Descuento
        </h2>

        <div class="form-group">

            <label>
                Precio
            </label>

            <input
                id="discountPrice"
                class="modal-input"
                type="number"
                placeholder="100"
            >

        </div>

        <div class="form-group">

            <label>
                Descuento %
            </label>

            <input
                id="discountPercent"
                class="modal-input"
                type="number"
                placeholder="20"
            >

        </div>

        <button
            class="modal-action"
            id="discountButton"
        >
            Calcular
        </button>

        <div
            class="result"
            id="discountResult"
        >
            Resultado: —
        </div>

    `);


    document
        .getElementById(
            "discountButton"
        )
        .onclick = function() {

            const price =
                Number(
                    document
                    .getElementById(
                        "discountPrice"
                    ).value
                );


            const percent =
                Number(
                    document
                    .getElementById(
                        "discountPercent"
                    ).value
                );


            const saved =
                price * percent / 100;


            const finalPrice =
                price - saved;


            document
                .getElementById(
                    "discountResult"
                )
                .innerHTML =

                `Ahorras: <strong>${saved.toFixed(2)}</strong><br>
                 Precio final: <strong>${finalPrice.toFixed(2)}</strong>`;

        };

}


/* =========================================================
   4. CONVERSOR
========================================================= */

function converter() {

    openModal(`

        <h2 class="modal-title">
            🔄 Convertidor
        </h2>

        <div class="form-group">

            <label>
                Tipo
            </label>

            <select
                id="convertType"
                class="modal-input"
            >
                <option value="km">
                    Kilómetros → metros
                </option>

                <option value="m">
                    Metros → kilómetros
                </option>

                <option value="kg">
                    Kilogramos → gramos
                </option>

                <option value="g">
                    Gramos → kilogramos
                </option>

                <option value="l">
                    Litros → mililitros
                </option>

                <option value="ml">
                    Mililitros → litros
                </option>

            </select>

        </div>

        <div class="form-group">

            <label>
                Valor
            </label>

            <input
                id="convertValue"
                class="modal-input"
                type="number"
            >

        </div>

        <button
            class="modal-action"
            id="convertButton"
        >
            Convertir
        </button>

        <div
            class="result"
            id="convertResult"
        >
            Resultado: —
        </div>

    `);


    document
        .getElementById(
            "convertButton"
        )
        .onclick = function() {

            const type =
                document
                .getElementById(
                    "convertType"
                ).value;


            const value =
                Number(
                    document
                    .getElementById(
                        "convertValue"
                    ).value
                );


            const conversions = {

                km: [
                    value * 1000,
                    "m"
                ],

                m: [
                    value / 1000,
                    "km"
                ],

                kg: [
                    value * 1000,
                    "g"
                ],

                g: [
                    value / 1000,
                    "kg"
                ],

                l: [
                    value * 1000,
                    "ml"
                ],

                ml: [
                    value / 1000,
                    "l"
                ]

            };


            const result =
                conversions[type];


            document
                .getElementById(
                    "convertResult"
                )
                .textContent =

                `Resultado: ${result[0]} ${result[1]}`;

        };

}


/* =========================================================
   5. TEMPERATURA
========================================================= */

function temperature() {

    openModal(`

        <h2 class="modal-title">
            🌡️ Temperatura
        </h2>

        <div class="form-group">

            <label>
                Grados
            </label>

            <input
                id="tempValue"
                class="modal-input"
                type="number"
                placeholder="25"
            >

        </div>

        <div class="form-group">

            <label>
                Convertir desde
            </label>

            <select
                id="tempType"
                class="modal-input"
            >

                <option value="c">
                    Celsius → Fahrenheit
                </option>

                <option value="f">
                    Fahrenheit → Celsius
                </option>

            </select>

        </div>

        <button
            class="modal-action"
            id="tempButton"
        >
            Convertir
        </button>

        <div
            class="result"
            id="tempResult"
        >
            Resultado: —
        </div>

    `);


    document
        .getElementById(
            "tempButton"
        )
        .onclick = function() {

            const value =
                Number(
                    document
                    .getElementById(
                        "tempValue"
                    ).value
                );


            const type =
                document
                .getElementById(
                    "tempType"
                ).value;


            let result;


            if (
                type === "c"
            ) {

                result =
                    (value * 9 / 5) + 32;

                result =
                    result.toFixed(2) +
                    " °F";

            } else {

                result =
                    (value - 32) * 5 / 9;

                result =
                    result.toFixed(2) +
                    " °C";

            }


            document
                .getElementById(
                    "tempResult"
                )
                .textContent =
                "Resultado: " + result;

        };

}


/* =========================================================
   6. PROMEDIO
========================================================= */

function average() {

    openModal(`

        <h2 class="modal-title">
            📊 Promedio
        </h2>

        <div class="form-group">

            <label>
                Números separados por coma
            </label>

            <input
                id="averageInput"
                class="modal-input"
                placeholder="15, 17, 18, 20"
            >

        </div>

        <button
            class="modal-action"
            id="averageButton"
        >
            Calcular promedio
        </button>

        <div
            class="result"
            id="averageResult"
        >
            Promedio: —
        </div>

    `);


    document
        .getElementById(
            "averageButton"
        )
        .onclick = function() {

            const values =
                document
                .getElementById(
                    "averageInput"
                )
                .value
                .split(",")
                .map(Number)
                .filter(Number.isFinite);


            if (
                values.length === 0
            ) {

                return;

            }


            const sum =
                values.reduce(
                    (a,b) => a + b,
                    0
                );


            const result =
                sum / values.length;


            document
                .getElementById(
                    "averageResult"
                )
                .textContent =
                `Promedio: ${result.toFixed(2)}`;

        };

}


/* =========================================================
   7. CRONÓMETRO
========================================================= */

let stopwatchInterval = null;

let stopwatchStart = 0;

let stopwatchElapsed = 0;


function stopwatch() {

    openModal(`

        <h2 class="modal-title">
            ⏱️ Cronómetro
        </h2>

        <div
            class="result"
            id="stopwatchDisplay"
            style="font-size:2rem;text-align:center"
        >
            00:00:00
        </div>

        <button
            class="modal-action"
            id="stopwatchStart"
        >
            Iniciar
        </button>

        <br><br>

        <button
            class="modal-action"
            id="stopwatchReset"
        >
            Reiniciar
        </button>

    `);


    clearInterval(
        stopwatchInterval
    );


    stopwatchElapsed = 0;


    updateStopwatch();


    document
        .getElementById(
            "stopwatchStart"
        )
        .onclick = function() {

            if (
                stopwatchInterval
            ) {

                clearInterval(
                    stopwatchInterval
                );

                stopwatchInterval =
                    null;

                this.textContent =
                    "Continuar";

                return;

            }


            stopwatchStart =
                Date.now() -
                stopwatchElapsed;


            stopwatchInterval =
                setInterval(
                    updateStopwatch,
                    100
                );

            this.textContent =
                "Pausar";

        };


    document
        .getElementById(
            "stopwatchReset"
        )
        .onclick = function() {

            clearInterval(
                stopwatchInterval
            );

            stopwatchInterval =
                null;

            stopwatchElapsed =
                0;

            updateStopwatch();

            document
                .getElementById(
                    "stopwatchStart"
                )
                .textContent =
                "Iniciar";

        };

}


function updateStopwatch() {

    stopwatchElapsed =
        Date.now() -
        stopwatchStart;


    if (
        !stopwatchInterval &&
        stopwatchElapsed < 0
    ) {

        stopwatchElapsed = 0;

    }


    const totalSeconds =
        Math.floor(
            stopwatchElapsed / 1000
        );


    const hours =
        Math.floor(
            totalSeconds / 3600
        );


    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );


    const seconds =
        totalSeconds % 60;


    const display =
        document.getElementById(
            "stopwatchDisplay"
        );


    if (!display) {
        return;
    }


    display.textContent =
        `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

}


function pad(number) {

    return String(number)
        .padStart(2, "0");

}


/* =========================================================
   8. TEMPORIZADOR
========================================================= */

let timerInterval = null;


function timer() {

    openModal(`

        <h2 class="modal-title">
            ⏳ Temporizador
        </h2>

        <div class="form-group">

            <label>
                Minutos
            </label>

            <input
                id="timerMinutes"
                class="modal-input"
                type="number"
                min="1"
                value="5"
            >

        </div>

        <button
            class="modal-action"
            id="timerButton"
        >
            Iniciar
        </button>

        <div
            class="result"
            id="timerDisplay"
            style="font-size:2rem;text-align:center"
        >
            05:00
        </div>

    `);


    clearInterval(
        timerInterval
    );


    let remaining =
        0;


    document
        .getElementById(
            "timerButton"
        )
        .onclick = function() {

            clearInterval(
                timerInterval
            );


            const minutes =
                Number(
                    document
                    .getElementById(
                        "timerMinutes"
                    ).value
                );


            if (
                !Number.isFinite(minutes) ||
                minutes <= 0
            ) {

                return;

            }


            remaining =
                Math.floor(
                    minutes * 60
                );


            updateTimer();


            timerInterval =
                setInterval(
                    function() {

                        remaining--;

                        updateTimer();


                        if (
                            remaining <= 0
                        ) {

                            clearInterval(
                                timerInterval
                            );

                            alert(
                                "⏰ ¡El temporizador terminó!"
                            );

                        }

                    },
                    1000
                );

        };


    function updateTimer() {

        const display =
            document.getElementById(
                "timerDisplay"
            );


        if (!display) {
            return;
        }


        const minutes =
            Math.floor(
                remaining / 60
            );


        const seconds =
            remaining % 60;


        display.textContent =
            `${pad(minutes)}:${pad(seconds)}`;

    }

}


/* =========================================================
   9. NOTAS
========================================================= */

function notes() {

    const saved =
        localStorage.getItem(
            "utilhub_notes"
        ) || "";


    openModal(`

        <h2 class="modal-title">
            📝 Mis notas
        </h2>

        <textarea
            id="notesInput"
            class="modal-input"
            rows="12"
            placeholder="Escribe tus notas..."
        ></textarea>

        <br><br>

        <button
            class="modal-action"
            id="saveNotes"
        >
            💾 Guardar notas
        </button>

        <div
            class="result"
            id="notesResult"
        >
            Tus notas se guardan en este dispositivo.
        </div>

    `);


    document
        .getElementById(
            "notesInput"
        )
        .value =
        saved;


    document
        .getElementById(
            "saveNotes"
        )
        .onclick = function() {

            localStorage.setItem(
                "utilhub_notes",
                document
                .getElementById(
                    "notesInput"
                )
                .value
            );


            document
                .getElementById(
                    "notesResult"
                )
                .textContent =
                "✓ Notas guardadas.";

        };

}


/* =========================================================
   10. TAREAS
========================================================= */

function tasks() {

    let list =
        JSON.parse(
            localStorage.getItem(
                "utilhub_tasks"
            ) || "[]"
        );


    openModal(`

        <h2 class="modal-title">
            ✅ Mis tareas
        </h2>

        <div class="form-group">

            <input
                id="taskInput"
                class="modal-input"
                placeholder="Ej.: terminar proyecto"
            >

        </div>

        <button
            class="modal-action"
            id="addTask"
        >
            Agregar tarea
        </button>

        <div id="taskList"></div>

    `);


    const render =
        document.getElementById(
            "taskList"
        );


    function draw() {

        render.innerHTML = "";


        list.forEach(
            (task, index) => {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "list-item";


                item.innerHTML = `

                    <span>
                        ${escapeHTML(task)}
                    </span>

                    <button
                        data-index="${index}"
                    >
                        Eliminar
                    </button>

                `;


                item
                    .querySelector("button")
                    .onclick =
                    function() {

                        list.splice(
                            index,
                            1
                        );

                        save();

                        draw();

                    };


                render.appendChild(
                    item
                );

            }
        );

    }


    function save() {

        localStorage.setItem(
            "utilhub_tasks",
            JSON.stringify(list)
        );

    }


    document
        .getElementById(
            "addTask"
        )
        .onclick = function() {

            const input =
                document
                .getElementById(
                    "taskInput"
                );


            const value =
                input.value.trim();


            if (!value) {
                return;
            }


            list.push(value);

            input.value = "";

            save();

            draw();

        };


    draw();

}


/* =========================================================
   11. LISTA DE COMPRAS
========================================================= */

function shoppingList() {

    let list =
        JSON.parse(
            localStorage.getItem(
                "utilhub_shopping"
            ) || "[]"
        );


    openModal(`

        <h2 class="modal-title">
            🛒 Lista de compras
        </h2>

        <input
            id="shoppingInput"
            class="modal-input"
            placeholder="Ej.: arroz"
        >

        <br><br>

        <button
            class="modal-action"
            id="addShopping"
        >
            Agregar producto
        </button>

        <div id="shoppingItems"></div>

    `);


    const container =
        document.getElementById(
            "shoppingItems"
        );


    function draw() {

        container.innerHTML = "";


        list.forEach(
            (item, index) => {

                const row =
                    document.createElement(
                        "div"
                    );


                row.className =
                    "list-item";


                row.innerHTML = `

                    <span>
                        ${escapeHTML(item)}
                    </span>

                    <button>
                        ✓
                    </button>

                `;


                row
                    .querySelector("button")
                    .onclick =
                    function() {

                        list.splice(
                            index,
                            1
                        );

                        save();

                        draw();

                    };


                container.appendChild(
                    row
                );

            }
        );

    }


    function save() {

        localStorage.setItem(
            "utilhub_shopping",
            JSON.stringify(list)
        );

    }


    document
        .getElementById(
            "addShopping"
        )
        .onclick = function() {

            const input =
                document
                .getElementById(
                    "shoppingInput"
                );


            const value =
                input.value.trim();


            if (!value) {
                return;
            }


            list.push(value);

            input.value = "";

            save();

            draw();

        };


    draw();

}


/* =========================================================
   12. GASTOS
========================================================= */

function expenses() {

    openModal(`

        <h2 class="modal-title">
            💰 Calculadora de gastos
        </h2>

        <div class="form-group">

            <label>
                Gastos separados por coma
            </label>

            <input
                id="expenseInput"
                class="modal-input"
                placeholder="20, 15.50, 8, 30"
            >

        </div>

        <button
            class="modal-action"
            id="expenseButton"
        >
            Calcular total
        </button>

        <div
            class="result"
            id="expenseResult"
        >
            Total: —
        </div>

    `);


    document
        .getElementById(
            "expenseButton"
        )
        .onclick = function() {

            const values =
                document
                .getElementById(
                    "expenseInput"
                )
                .value
                .split(",")
                .map(Number)
                .filter(
                    n =>
                        Number.isFinite(n)
                );


            const total =
                values.reduce(
                    (a,b) => a + b,
                    0
                );


            document
                .getElementById(
                    "expenseResult"
                )
                .textContent =
                `Total: ${total.toFixed(2)}`;

        };

}


/* =========================================================
   13. CONTADOR DE DÍAS
========================================================= */

function dateCounter() {

    openModal(`

        <h2 class="modal-title">
            📅 Contador de días
        </h2>

        <div class="form-group">

            <label>
                Fecha inicial
            </label>

            <input
                id="dateOne"
                class="modal-input"
                type="date"
            >

        </div>

        <div class="form-group">

            <label>
                Fecha final
            </label>

            <input
                id="dateTwo"
                class="modal-input"
                type="date"
            >

        </div>

        <button
            class="modal-action"
            id="dateButton"
        >
            Calcular
        </button>

        <div
            class="result"
            id="dateResult"
        >
            Días: —
        </div>

    `);


    document
        .getElementById(
            "dateButton"
        )
        .onclick = function() {

            const a =
                new Date(
                    document
                    .getElementById(
                        "dateOne"
                    ).value
                );


            const b =
                new Date(
                    document
                    .getElementById(
                        "dateTwo"
                    ).value
                );


            if (
                isNaN(a) ||
                isNaN(b)
            ) {

                return;

            }


            const difference =
                Math.abs(
                    b - a
                );


            const days =
                Math.round(
                    difference /
                    (1000 * 60 * 60 * 24)
                );


            document
                .getElementById(
                    "dateResult"
                )
                .textContent =
                `Hay ${days} días de diferencia.`;

        };

}


/* =========================================================
   14. NÚMERO ALEATORIO
========================================================= */

function randomNumber() {

    openModal(`

        <h2 class="modal-title">
            🎲 Número aleatorio
        </h2>

        <div class="form-group">

            <label>
                Mínimo
            </label>

            <input
                id="randomMin"
                class="modal-input"
                type="number"
                value="1"
            >

        </div>

        <div class="form-group">

            <label>
                Máximo
            </label>

            <input
                id="randomMax"
                class="modal-input"
                type="number"
                value="100"
            >

        </div>

        <button
            class="modal-action"
            id="randomButton"
        >
            Generar
        </button>

        <div
            class="result"
            id="randomResult"
        >
            Resultado: —
        </div>

    `);


    document
        .getElementById(
            "randomButton"
        )
        .onclick = function() {

            const min =
                Number(
                    document
                    .getElementById(
                        "randomMin"
                    ).value
                );


            const max =
                Number(
                    document
                    .getElementById(
                        "randomMax"
                    ).value
                );


            if (
                min > max
            ) {

                return;

            }


            const result =
                Math.floor(
                    Math.random() *
                    (max - min + 1)
                ) + min;


            document
                .getElementById(
                    "randomResult"
                )
                .textContent =
                `Resultado: ${result}`;

        };

}


/* =========================================================
   15. DADO
========================================================= */

function dice() {

    openModal(`

        <h2 class="modal-title">
            🎲 Lanzar dado
        </h2>

        <button
            class="modal-action"
            id="diceButton"
        >
            Lanzar dado
        </button>

        <div
            class="result"
            id="diceResult"
            style="text-align:center;font-size:4rem"
        >
            🎲
        </div>

    `);


    document
        .getElementById(
            "diceButton"
        )
        .onclick = function() {

            const result =
                Math.floor(
                    Math.random() * 6
                ) + 1;


            document
                .getElementById(
                    "diceResult"
                )
                .textContent =
                `🎲 ${result}`;

        };

}


/* =========================================================
   16. CONTRASEÑA
========================================================= */

function passwordGenerator() {

    openModal(`

        <h2 class="modal-title">
            🔐 Contraseña segura
        </h2>

        <div class="form-group">

            <label>
                Longitud
            </label>

            <input
                id="passwordLength"
                class="modal-input"
                type="number"
                min="8"
                max="64"
                value="16"
            >

        </div>

        <button
            class="modal-action"
            id="passwordButton"
        >
            Generar contraseña
        </button>

        <div
            class="result"
            id="passwordResult"
        >
            —
        </div>

    `);


    document
        .getElementById(
            "passwordButton"
        )
        .onclick =
        function() {

            const length =
                Number(
                    document
                    .getElementById(
                        "passwordLength"
                    ).value
                );


            const chars =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
                "abcdefghijklmnopqrstuvwxyz" +
                "0123456789" +
                "!@#$%^&*";


            let password =
                "";


            const array =
                new Uint32Array(
                    length
                );


            crypto.getRandomValues(
                array
            );


            for (
                let i = 0;
                i < length;
                i++
            ) {

                password +=
                    chars[
                        array[i] %
                        chars.length
                    ];

            }


            document
                .getElementById(
                    "passwordResult"
                )
                .textContent =
                password;

        };

}


/* =========================================================
   17. QR
========================================================= */

function qrGenerator() {

    openModal(`

        <h2 class="modal-title">
            ▦ Código QR
        </h2>

        <div class="form-group">

            <label>
                Texto o enlace
            </label>

            <input
                id="qrInput"
                class="modal-input"
                placeholder="https://ejemplo.com"
            >

        </div>

        <button
            class="modal-action"
            id="qrButton"
        >
            Crear QR
        </button>

        <div id="qrResult"></div>

    `);


    document
        .getElementById(
            "qrButton"
        )
        .onclick =
        function() {

            const text =
                document
                .getElementById(
                    "qrInput"
                )
                .value
                .trim();


            if (!text) {
                return;
            }


            const encoded =
                encodeURIComponent(
                    text
                );


            const url =
                "https://api.qrserver.com/v1/create-qr-code/?" +
                "size=220x220&data=" +
                encoded;


            document
                .getElementById(
                    "qrResult"
                )
                .innerHTML = `

                    <img
                        class="qr-image"
                        src="${url}"
                        alt="Código QR generado"
                    >

                    <p class="result">
                        El código QR fue generado.
                    </p>

                `;

        };

}


/* =========================================================
   18. DICCIONARIO
========================================================= */

function dictionary() {

    openModal(`

        <h2 class="modal-title">
            📖 Diccionario
        </h2>

        <div class="form-group">

            <input
                id="dictionaryInput"
                class="modal-input"
                placeholder="Escribe una palabra"
            >

        </div>

        <button
            class="modal-action"
            id="dictionaryButton"
        >
            Buscar significado
        </button>

        <div
            class="result"
            id="dictionaryResult"
        >
            —
        </div>

    `);


    document
        .getElementById(
            "dictionaryButton"
        )
        .onclick =
        async function() {

            const word =
                document
                .getElementById(
                    "dictionaryInput"
                )
                .value
                .trim()
                .toLowerCase();


            const result =
                document
                .getElementById(
                    "dictionaryResult"
                );


            if (!word) {
                return;
            }


            result.textContent =
                "Buscando...";


            try {

                const response =
                    await fetch(
                        "https://api.dictionaryapi.dev/api/v2/entries/es/" +
                        encodeURIComponent(
                            word
                        )
                    );


                if (
                    !response.ok
                ) {

                    throw new Error();

                }


                const data =
                    await response.json();


                const meanings =
                    data[0].meanings || [];


                let html =
                    `<strong>${escapeHTML(word)}</strong><br><br>`;


                meanings
                    .slice(0, 3)
                    .forEach(
                        meaning => {

                            html +=
                                `<strong>${escapeHTML(meaning.partOfSpeech || "")}</strong><br>`;

                            (
                                meaning.definitions || []
                            )
                            .slice(0, 2)
                            .forEach(
                                definition => {

                                    html +=
                                        `• ${escapeHTML(definition.definition)}<br>`;

                                }
                            );

                            html += "<br>";

                        }
                    );


                result.innerHTML =
                    html;

            } catch {

                result.textContent =
                    "No se encontró la palabra o el servicio no está disponible.";

            }

        };

}


/* =========================================================
   19. ORGANIZADOR DE ESTUDIO
========================================================= */

function studyOrganizer() {

    const saved =
        JSON.parse(
            localStorage.getItem(
                "utilhub_study"
            ) || "{}"
        );


    openModal(`

        <h2 class="modal-title">
            📚 Organizador de estudio
        </h2>

        <div class="form-group">

            <label>
                Curso o tema
            </label>

            <input
                id="studySubject"
                class="modal-input"
                value="${escapeAttribute(
                    saved.subject || ""
                )}"
                placeholder="Ej.: Historia"
            >

        </div>

        <div class="form-group">

            <label>
                Fecha
            </label>

            <input
                id="studyDate"
                class="modal-input"
                type="date"
                value="${escapeAttribute(
                    saved.date || ""
                )}"
            >

        </div>

        <div class="form-group">

            <label>
                Objetivo
            </label>

            <textarea
                id="studyGoal"
                class="modal-input"
                rows="5"
                placeholder="¿Qué quieres aprender?"
            >${escapeHTML(
                saved.goal || ""
            )}</textarea>

        </div>

        <button
            class="modal-action"
            id="saveStudy"
        >
            Guardar planificación
        </button>

        <div
            class="result"
            id="studyResult"
        >
            —
        </div>

    `);


    document
        .getElementById(
            "saveStudy"
        )
        .onclick =
        function() {

            const data = {

                subject:
                    document
                    .getElementById(
                        "studySubject"
                    ).value,

                date:
                    document
                    .getElementById(
                        "studyDate"
                    ).value,

                goal:
                    document
                    .getElementById(
                        "studyGoal"
                    ).value

            };


            localStorage.setItem(
                "utilhub_study",
                JSON.stringify(data)
            );


            document
                .getElementById(
                    "studyResult"
                )
                .textContent =
                "✓ Planificación guardada.";

        };

}


/* =========================================================
   20. CONSEJOS
========================================================= */

function tips() {

    const tipsList = [

        "Organiza tus tareas por prioridad.",

        "Guarda tus gastos para saber en qué utilizas tu dinero.",

        "Divide una sesión de estudio en objetivos pequeños.",

        "Compara precios antes de realizar una compra.",

        "Revisa la información de un establecimiento antes de hacer un pedido.",

        "Utiliza una lista de compras para evitar olvidar productos.",

        "Guarda información importante en tus notas.",

        "Usa el temporizador para organizar tus actividades."

    ];


    const random =
        tipsList[
            Math.floor(
                Math.random() *
                tipsList.length
            )
        ];


    openModal(`

        <h2 class="modal-title">
            💡 Consejo útil
        </h2>

        <div
            class="result"
            style="font-size:1.15rem"
        >
            ${escapeHTML(random)}
        </div>

        <br>

        <button
            class="modal-action"
            id="newTip"
        >
            🔄 Otro consejo
        </button>

    `);


    document
        .getElementById(
            "newTip"
        )
        .onclick =
        tips;

}


/* =========================================================
   COMIDA
========================================================= */

document
    .getElementById(
        "foodBtn"
    )
    .addEventListener(
        "click",
        function() {

            const food =
                document
                .getElementById(
                    "foodSearch"
                )
                .value
                .trim();


            const location =
                document
                .getElementById(
                    "foodLocation"
                )
                .value
                .trim();


            if (!food) {

                alert(
                    "Escribe qué comida estás buscando."
                );

                return;

            }


            const query =
                `${food} restaurantes ${location}`;


            const url =
                "https://www.google.com/search?q=" +
                encodeURIComponent(
                    query
                );


            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

        }
    );


/* =========================================================
   COMPRAS
========================================================= */

document
    .getElementById(
        "productBtn"
    )
    .addEventListener(
        "click",
        function() {

            const product =
                document
                .getElementById(
                    "productSearch"
                )
                .value
                .trim();


            const location =
                document
                .getElementById(
                    "productLocation"
                )
                .value
                .trim();


            if (!product) {

                alert(
                    "Escribe qué producto buscas."
                );

                return;

            }


            const query =
                `${product} comprar ${location}`;


            const url =
                "https://www.google.com/search?q=" +
                encodeURIComponent(
                    query
                );


            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

        }
    );


/* =========================================================
   CERCA DE MÍ
========================================================= */

document
    .querySelectorAll(
        ".near-card"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                function() {

                    const place =
                        this.dataset.place;


                    const url =
                        "https://www.google.com/maps/search/" +
                        encodeURIComponent(
                            place
                        );


                    window.open(
                        url,
                        "_blank",
                        "noopener,noreferrer"
                    );

                }
            );

        }
    );


/* =========================================================
   BOTÓN MI ESPACIO
========================================================= */

document
    .getElementById(
        "loginBtn"
    )
    .addEventListener(
        "click",
        function() {

            openModal(`

                <h2 class="modal-title">
                    👤 Mi espacio
                </h2>

                <p style="color:#94a3b8;line-height:1.7">
                    Esta versión de ÚtilHUb guarda tus
                    notas, tareas, compras y planificación
                    directamente en este dispositivo.
                </p>

                <br>

                <div class="result">

                    🔐 El inicio de sesión con Google
                    requiere configurar un sistema de
                    autenticación externo como Firebase.

                </div>

            `);

        }
    );


/* =========================================================
   SEGURIDAD DEL TEXTO
========================================================= */

function escapeHTML(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


function escapeAttribute(value) {

    return escapeHTML(value);

}
