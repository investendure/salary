document.addEventListener('DOMContentLoaded', () => {
    // --- DOM ELEMENTS ---
    const form = document.getElementById('simulator-form');
    const experienceSlider = document.getElementById('experience');
    const expValueSpan = document.getElementById('exp-value');
    const resultsContainer = document.getElementById('results-container');
    const comparisonGrid = document.getElementById('comparison-grid');

    // --- DATA MODELS ---

    // Base salaries in USD for a mid-level role at a medium-sized company.
    // This is the starting point before multipliers.
    const BASE_SALARIES_USD = {
        'software-engineer': 110000,
        'senior-software-engineer': 150000,
        'data-scientist': 125000,
        'product-manager': 130000,
        'devops-engineer': 120000,
        'ui-ux-designer': 95000,
        'machine-learning-engineer': 145000,
        'cybersecurity-analyst': 105000,
    };

    // Multipliers to adjust the USD base salary for local market conditions.
    const COUNTRY_MULTIPLIERS = {
        usa: 1.0, uk: 0.75, canada: 0.85, germany: 0.8, france: 0.7,
        netherlands: 0.82, sweden: 0.78, morocco: 0.2, india: 0.25,
        japan: 0.72, singapore: 0.9, australia: 0.95
    };

    // Local currency information for display.
    const COUNTRY_CURRENCY_INFO = {
        usa: { code: 'USD', name: 'US Dollar' }, uk: { code: 'GBP', name: 'British Pound' },
        canada: { code: 'CAD', name: 'Canadian Dollar' }, germany: { code: 'EUR', name: 'Euro' },
        france: { code: 'EUR', name: 'Euro' }, netherlands: { code: 'EUR', name: 'Euro' },
        sweden: { code: 'SEK', name: 'Swedish Krona' }, morocco: { code: 'MAD', name: 'Moroccan Dirham' },
        india: { code: 'INR', name: 'Indian Rupee' }, japan: { code: 'JPY', name: 'Japanese Yen' },
        singapore: { code: 'SGD', name: 'Singapore Dollar' }, australia: { code: 'AUD', name: 'Australian Dollar' }
    };
    
    // Exchange rates from USD to local currency (simplified).
    const EXCHANGE_RATES = {
        USD: 1, GBP: 0.8, CAD: 1.35, EUR: 0.92, SEK: 10.5,
        MAD: 10.0, INR: 83.0, JPY: 155.0, SGD: 1.35, AUD: 1.5
    };

    // Multipliers for company size.
    const COMPANY_SIZE_MULTIPLIERS = {
        startup: 0.9, small: 0.95, medium: 1.0, large: 1.1, enterprise: 1.2
    };


    // --- EVENT LISTENERS ---
    experienceSlider.addEventListener('input', () => {
        expValueSpan.textContent = experienceSlider.value;
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        calculateAndDisplay();
    });

    // --- CORE FUNCTIONS ---
    function calculateSalary(job, country, experience, companySize) {
        const baseUsd = BASE_SALARIES_USD[job];
        
        // 1. Adjust for country market
        const countryAdjustedUsd = baseUsd * COUNTRY_MULTIPLIERS[country];

        // 2. Adjust for experience (adds/subtracts a percentage from the base)
        const experienceFactor = 1 + ((experience - 10) * 0.05); // 5% per year from a 10-year baseline
        const experienceAdjustedUsd = countryAdjustedUsd * experienceFactor;

        // 3. Adjust for company size
        const finalUsd = experienceAdjustedUsd * COMPANY_SIZE_MULTIPLIERS[companySize];

        // 4. Convert to local currency
        const localCurrency = COUNTRY_CURRENCY_INFO[country].code;
        const exchangeRate = EXCHANGE_RATES[localCurrency];
        const finalLocalSalary = finalUsd * exchangeRate;

        // Round to a sensible number
        return Math.round(finalLocalSalary / 1000) * 1000;
    }
    
    function calculateAndDisplay() {
        const job = document.getElementById('job-title').value;
        const country = document.getElementById('country').value;
        const experience = parseInt(experienceSlider.value, 10);
        const companySize = document.getElementById('company-size').value;

        if (!job || !country || !companySize) {
            resultsContainer.innerHTML = `<div class="placeholder"><p class="error">Please fill out all fields to simulate a salary.</p></div>`;
            return;
        }

        const annualSalary = calculateSalary(job, country, experience, companySize);
        const currencyInfo = COUNTRY_CURRENCY_INFO[country];
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency', currency: currencyInfo.code, minimumFractionDigits: 0
        });

        // Display main results
        resultsContainer.innerHTML = `
            <div class="salary-result">
                <div class="salary-amount">${formatter.format(annualSalary)}</div>
                <div class="salary-currency">Annual Salary (${currencyInfo.code})</div>
            </div>
            <div class="salary-details">
                <div class="detail-card">
                    <div class="detail-value">${formatter.format(annualSalary / 12)}</div>
                    <div class="detail-label">Monthly</div>
                </div>
                <div class="detail-card">
                    <div class="detail-value">${formatter.format(annualSalary / 52)}</div>
                    <div class="detail-label">Weekly</div>
                </div>
                <div class="detail-card">
                    <div class="detail-value">${formatter.format(annualSalary / 260)}</div>
                    <div class="detail-label">Daily</div>
                </div>
                <div class="detail-card">
                    <div class="detail-value">${formatter.format(annualSalary / 2080)}</div>
                    <div class="detail-label">Hourly</div>
                </div>
            </div>
            <div class="trend-chart">
                <h3><i class="fas fa-chart-pie"></i> Market Insight</h3>
                <p>${getMarketInsight(job, country, experience)}</p>
            </div>
        `;

        // Display comparison grid
        generateComparison(job, experience, companySize);
    }

    function generateComparison(job, experience, companySize) {
        const comparisonCountries = ['usa', 'uk', 'germany', 'singapore', 'morocco', 'canada'];
        comparisonGrid.innerHTML = ''; // Clear previous results

        comparisonCountries.forEach(country => {
            const salary = calculateSalary(job, country, experience, companySize);
            const currencyInfo = COUNTRY_CURRENCY_INFO[country];
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency', currency: currencyInfo.code, minimumFractionDigits: 0, notation: 'compact'
            });

            const card = document.createElement('div');
            card.className = 'comparison-card';
            card.innerHTML = `
                <h4><i class="fas fa-flag"></i> ${country.toUpperCase()}</h4>
                <div class="salary">${formatter.format(salary)}</div>
                <small>${currencyInfo.code}</small>
            `;
            comparisonGrid.appendChild(card);
        });
    }

    function getMarketInsight(job, country, experience) {
        const insights = [
            `Roles for a ${job.replace(/-/g, ' ')} in ${country.toUpperCase()} are in high demand.`,
            `With ${experience} years of experience, you're competing at a strong ${experience < 5 ? 'mid-level' : 'senior'} tier.`,
            'Tech salaries in this region have seen steady growth over the past year.',
            `Companies of this size often offer competitive benefits alongside salary.`
        ];
        return insights[Math.floor(Math.random() * insights.length)];
    }

    // Initial calculation on page load with default values
    calculateAndDisplay();
});
