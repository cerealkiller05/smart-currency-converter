// TEMPORARY SAMPLE exchange rates, real exchange rates to be added from Spring Boot Api.

const exchangeRates = {

    USD: {
        USD: 1,
        EUR: 0.9235,
        GBP: 0.788,
        JPY: 156.20,
        CAD: 1.35,
        JOD: 0.709
    },

    EUR: {
        USD: 1.0828,
        EUR: 1,
        GBP: 0.847,
        JPY: 169.20,
        CAD: 1.462,
        JOD: 0.768
    },

    GBP: {
        USD: 1.269,
        EUR: 1.1817,
        GBP: 1,
        JPY: 198.2,
        CAD: 1.716,
        JOD: 0.899
    },

    JPY: {
        USD: 0.006402,
        EUR: 0.00591,
        GBP: 0.00505,
        JPY: 1,
        CAD: 0.00864,
        JOD: 0.00454
    },

    CAD: {
        USD: 0.7407,
        EUR: 0.684,
        GBP: 0.583,
        JPY: 115.7,
        CAD: 1,
        JOD: 0.525
    },

    JOD: {
        USD: 1.4104,
        EUR: 1.302,
        GBP: 1.112,
        JPY: 220.3,
        CAD: 1.905,
        JOD: 1
    }
};


// CURRENCY INFORMATION

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

    JOD: {
        name: "Jordanian Dinar",
        flag: "🇯🇴"
    }
};


// GET HTML ELEMENTS

const amountInput = document.getElementById("amount");

const fromCurrency =
    document.getElementById("fromCurrency");

const toCurrency =
    document.getElementById("toCurrency");

const fromFlag =
    document.getElementById("fromFlag");

const toFlag =
    document.getElementById("toFlag");

const convertButton =
    document.getElementById("convertButton");

const swapButton =
    document.getElementById("swapButton");

const originalResult =
    document.getElementById("originalResult");

const convertedResult =
    document.getElementById("convertedResult");

const exchangeRate =
    document.getElementById("exchangeRate");

const updatedTime =
    document.getElementById("updatedTime");

const historyTable =
    document.getElementById("historyTable");


// UPDATE FLAGS

function updateFlags() {

    const from = fromCurrency.value;
    const to = toCurrency.value;

    fromFlag.textContent =
        currencyInfo[from].flag;

    toFlag.textContent =
        currencyInfo[to].flag;
}


// CONVERT CURRENCY

function convertCurrency() {

    const amount =
        parseFloat(amountInput.value);

    const from =
        fromCurrency.value;

    const to =
        toCurrency.value;


    // Validate amount

    if (isNaN(amount) || amount <= 0) {

        alert("Please enter an amount greater than zero.");

        amountInput.focus();

        return;
    }


    // Get exchange rate

    const rate =
        exchangeRates[from][to];


    if (!rate) {

        alert("Exchange rate is not available.");

        return;
    }


    // Calculate

    const convertedAmount =
        amount * rate;


    // Display result

    originalResult.textContent =
        `${formatNumber(amount)} ${from}`;

    convertedResult.textContent =
        `${formatNumber(convertedAmount)} ${to}`;

    exchangeRate.textContent =
        `Exchange Rate: 1 ${from} = ${formatRate(rate)} ${to}`;

    updatedTime.textContent =
        `◷ Updated just now`;


    // Add conversion to history

    addToHistory(
        from,
        to,
        amount,
        convertedAmount,
        rate
    );
}


// FORMAT NUMBERS

function formatNumber(number) {

    return new Intl.NumberFormat(
        "en-US",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    ).format(number);
}


function formatRate(rate) {

    return new Intl.NumberFormat(
        "en-US",
        {
            minimumFractionDigits: 4,
            maximumFractionDigits: 4
        }
    ).format(rate);
}


// SWAP CURRENCIES

function swapCurrencies() {

    const currentFrom =
        fromCurrency.value;

    const currentTo =
        toCurrency.value;


    fromCurrency.value =
        currentTo;

    toCurrency.value =
        currentFrom;


    updateFlags();

    // Automatically convert again after swapping.

    convertCurrency();
}


// ADD HISTORY

function addToHistory(
    from,
    to,
    amount,
    convertedAmount,
    rate
) {

    const now = new Date();

    const formattedDate =
        formatDate(now);


    const row =
        document.createElement("tr");


    row.innerHTML = `

        <td>

            <div class="currency-cell">

                <span class="table-flag">
                    ${currencyInfo[from].flag}
                </span>

                <div>

                    <strong>
                        ${from}
                    </strong>

                    <small>
                        ${currencyInfo[from].name}
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
                    ${currencyInfo[to].flag}
                </span>

                <div>

                    <strong>
                        ${to}
                    </strong>

                    <small>
                        ${currencyInfo[to].name}
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
            ${formattedDate}
        </td>


        <td>

            <button
                class="delete-button"
                title="Delete"
                onclick="deleteHistoryRow(this)"
            >
                
            </button>

        </td>

    `;


    // Put newest conversion at the top.

    historyTable.prepend(row);
}


// FORMAT DATE

function formatDate(date) {

    return date.toLocaleString(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric",

            hour: "numeric",
            minute: "2-digit"
        }
    );
}


// DELETE HISTORY ROW

function deleteHistoryRow(button) {

    const row =
        button.closest("tr");

    if (row) {
        row.remove();
    }
}


// EVENT LISTENERS

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


// Allow Enter key to convert.

amountInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            convertCurrency();

        }

    }
);


// INITIALIZE

updateFlags();