// ==============================
// CURRENCY INFORMATION
// ==============================

const currencyInfo = {
    USD: {
        name: "US Dollar",
        flag: "🇺🇸"
    },
    EUR: {
        name: "Euro",
        flag: "🇪🇺"
    },
    GBP: {
        name: "British Pound",
        flag: "🇬🇧"
    },
    JPY: {
        name: "Japanese Yen",
        flag: "🇯🇵"
    },
    CAD: {
        name: "Canadian Dollar",
        flag: "🇨🇦"
    },
    AUD: {
        name: "Australian Dollar",
        flag: "🇦🇺"
    },
    CHF: {
        name: "Swiss Franc",
        flag: "🇨🇭"
    },
    CNY: {
        name: "Chinese Yuan",
        flag: "🇨🇳"
    },
    INR: {
        name: "Indian Rupee",
        flag: "🇮🇳"
    },
    JOD: {
        name: "Jordanian Dinar",
        flag: "🇯🇴"
    }
};


// ==============================
// GET HTML ELEMENTS
// ==============================

const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");

const convertButton = document.getElementById("convertButton");
const swapButton = document.getElementById("swapButton");

const originalResult = document.getElementById("originalResult");
const convertedResult = document.getElementById("convertedResult");
const exchangeRate = document.getElementById("exchangeRate");
const updatedTime = document.getElementById("updatedTime");

const historyTable = document.getElementById("historyTable");


// ==============================
// UPDATE CURRENCY FLAGS
// ==============================

function updateFlags() {

    const from = fromCurrency.value;
    const to = toCurrency.value;

    const fromFlag = document.getElementById("fromFlag");
    const toFlag = document.getElementById("toFlag");

    if (fromFlag && currencyInfo[from]) {
        fromFlag.textContent = currencyInfo[from].flag;
    }

    if (toFlag && currencyInfo[to]) {
        toFlag.textContent = currencyInfo[to].flag;
    }
}


// ==============================
// FORMAT NUMBERS
// ==============================

function formatNumber(number) {

    return Number(number).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}


function formatRate(rate) {

    return Number(rate).toLocaleString(undefined, {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4
    });
}


// ==============================
// FORMAT DATE
// ==============================

function formatDate(date) {

    return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
}


// ==============================
// CONVERT CURRENCY
// ==============================

async function convertCurrency() {

    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    // Validate amount
    if (isNaN(amount) || amount <= 0) {

        alert("Please enter an amount greater than zero.");

        amountInput.focus();

        return;
    }

    try {

        // Disable button while request is running
        convertButton.disabled = true;

        convertButton.innerHTML = "Converting...";


        // Call Spring Boot backend
        const response = await fetch(
            `http://localhost:8080/api/convert?from=${from}&to=${to}&amount=${amount}`
        );


        // Check for HTTP errors
        if (!response.ok) {

            throw new Error(
                `Conversion request failed: ${response.status}`
            );
        }


        // Convert response to JSON
        const data = await response.json();


        // ==============================
        // DISPLAY CONVERSION RESULT
        // ==============================

        originalResult.textContent =
            `${formatNumber(data.originalAmount)} ${data.fromCurrency}`;


        convertedResult.textContent =
            `${formatNumber(data.convertedAmount)} ${data.toCurrency}`;


        exchangeRate.textContent =
            `Exchange Rate: 1 ${data.fromCurrency} = ${formatRate(data.exchangeRate)} ${data.toCurrency}`;


        updatedTime.textContent =
            "◷ Updated just now";


        // ==============================
        // REFRESH HISTORY
        // ==============================

        await loadHistory();


    } catch (error) {

        console.error("Conversion error:", error);

        alert(
            "Unable to convert currency. Make sure the Spring Boot server is running."
        );


    } finally {

        // Re-enable button
        convertButton.disabled = false;

        convertButton.innerHTML = "<span>⇄</span> Convert";
    }
}


// ==============================
// LOAD CONVERSION HISTORY
// ==============================

async function loadHistory() {

    try {

        const response = await fetch(
            "http://localhost:8080/api/history",
            {
                cache: "no-store"
            }
        );

        if (!response.ok) {
            throw new Error(
                `History request failed: ${response.status}`
            );
        }

        const history = await response.json();

        console.log("History received:", history);

        historyTable.innerHTML = "";

        history.forEach(transaction => {
            addHistoryRow(transaction);
        });

    } catch (error) {

        console.error("History error:", error);

    }
}

// ==============================
// ADD HISTORY ROW
// ==============================

function addHistoryRow(transaction) {

    const from = transaction.fromCurrency;
    const to = transaction.toCurrency;

    const amount = transaction.originalAmount;
    const convertedAmount = transaction.convertedAmount;

    // Calculate rate from stored values
    const rate = convertedAmount / amount;

    const date = new Date(transaction.timestamp);


    const row = document.createElement("tr");


    row.innerHTML = `
        <td>
            <div class="currency-cell">

                <span class="table-flag">
                    ${currencyInfo[from]?.flag || "🌐"}
                </span>

                <div>
                    <strong>${from}</strong>
                    <small>
                        ${currencyInfo[from]?.name || from}
                    </small>
                </div>

            </div>
        </td>


        <td>
            <div class="currency-cell">

                <span class="arrow-right">
                    →
                </span>

                <span class="table-flag">
                    ${currencyInfo[to]?.flag || "🌐"}
                </span>

                <div>
                    <strong>${to}</strong>
                    <small>
                        ${currencyInfo[to]?.name || to}
                    </small>
                </div>

            </div>
        </td>


        <td>
            ${formatNumber(amount)} ${from}
        </td>


        <td class="success-text">
            ${formatNumber(convertedAmount)} ${to}
        </td>


        <td>
            1 ${from} = ${formatRate(rate)} ${to}
        </td>


        <td>
            ${formatDate(date)}
        </td>


        <td></td>
    `;


    historyTable.appendChild(row);
}


// ==============================
// SWAP CURRENCIES
// ==============================

function swapCurrencies() {

    const currentFrom = fromCurrency.value;
    const currentTo = toCurrency.value;

    fromCurrency.value = currentTo;
    toCurrency.value = currentFrom;

    updateFlags();
}


// ==============================
// EVENT LISTENERS
// ==============================

convertButton.addEventListener(
    "click",
    convertCurrency
);


swapButton.addEventListener(
    "click",
    swapCurrencies
);


fromCurrency.addEventListener(
    "change",
    updateFlags
);


toCurrency.addEventListener(
    "change",
    updateFlags
);


// ==============================
// INITIAL PAGE LOAD
// ==============================

updateFlags();

loadHistory();