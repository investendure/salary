document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const salaryForm = document.getElementById('salary-form');
    const salaryInput = document.getElementById('salary');
    const countrySelect = document.getElementById('country');
    const resultsOutput = document.getElementById('results-output');

    // --- Tax Data (Easy to update and add new countries!) ---
    // This is a simplified model. Real tax systems are more complex.
    const TAX_RATES = {
        usa: { rate: 0.22, currency: 'USD' },
        uk: { rate: 0.20, currency: 'GBP' },
        canada: { rate: 0.25, currency: 'CAD' }
    };

    // --- Event Listener ---
    salaryForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the form from reloading the page
        
        const salary = parseFloat(salaryInput.value);
        const country = countrySelect.value;

        // Input Validation
        if (isNaN(salary) || salary <= 0) {
            displayError("Please enter a valid, positive salary.");
            return;
        }

        const calculation = calculateTakeHomePay(salary, country);
        displayResults(calculation);
    });

    // --- Calculation Logic ---
    function calculateTakeHomePay(salary, country) {
        const { rate, currency } = TAX_RATES[country];
        const taxAmount = salary * rate;
        const netSalary = salary - taxAmount;

        return {
            gross: salary,
            taxAmount: taxAmount,
            net: netSalary,
            currency: currency
        };
    }

    // --- Display Functions ---
    function displayResults({ gross, taxAmount, net, currency }) {
        // Format numbers to be more readable (e.g., 50,000.00)
        const formatCurrency = (amount) => {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency,
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(amount);
        };
        
        resultsOutput.innerHTML = `
            <div class="result-item">
                <span>Gross Annual Salary:</span>
                <span>${formatCurrency(gross)}</span>
            </div>
            <div class="result-item">
                <span>Estimated Tax (-):</span>
                <span>${formatCurrency(taxAmount)}</span>
            </div>
            <hr>
            <div class="result-item net-pay">
                <span><strong>Net Annual Salary:</strong></span>
                <span><strong>${formatCurrency(net)}</strong></span>
            </div>
        `;
    }

    function displayError(message) {
        resultsOutput.innerHTML = `<p class="error">${message}</p>`;
    }
});
