document.addEventListener('DOMContentLoaded', () => {

    // --- DOM ELEMENTS ---
    const form = document.getElementById('simulator-form');
    const experienceSlider = document.getElementById('experience');
    const expValueSpan = document.getElementById('exp-value');
    const resultsContainer = document.getElementById('results-container');
    
    // --- DATA ---
    const salaryData = {
        'software-engineer': { 'usa': { base: 95000, multiplier: 1.0 }, 'canada': { base: 75000, multiplier: 0.85 }, 'uk': { base: 65000, multiplier: 0.75 }, 'germany': { base: 70000, multiplier: 0.8 }, 'france': { base: 55000, multiplier: 0.7 }, 'netherlands': { base: 72000, multiplier: 0.82 }, 'sweden': { base: 68000, multiplier: 0.78 }, 'morocco': { base: 15000, multiplier: 0.4 }, 'india': { base: 18000, multiplier: 0.6 }, 'china': { base: 25000, multiplier: 0.65 }, 'japan': { base: 58000, multiplier: 0.72 }, 'singapore': { base: 65000, multiplier: 0.75 }, 'australia': { base: 78000, multiplier: 0.82 }, 'brazil': { base: 28000, multiplier: 0.55 }, 'mexico': { base: 32000, multiplier: 0.58 }, 'south-africa': { base: 24000, multiplier: 0.5 }},
        'senior-software-engineer': { 'usa': { base: 140000, multiplier: 1.0 }, 'canada': { base: 115000, multiplier: 0.85 }, 'uk': { base: 95000, multiplier: 0.75 }, 'germany': { base: 105000, multiplier: 0.8 }, 'france': { base: 85000, multiplier: 0.7 }, 'netherlands': { base: 110000, multiplier: 0.82 }, 'sweden': { base: 102000, multiplier: 0.78 }, 'morocco': { base: 28000, multiplier: 0.4 }, 'india': { base: 35000, multiplier: 0.6 }, 'china': { base: 45000, multiplier: 0.65 }, 'japan': { base: 88000, multiplier: 0.72 }, 'singapore': { base: 98000, multiplier: 0.75 }, 'australia': { base: 118000, multiplier: 0.82 }, 'brazil': { base: 48000, multiplier: 0.55 }, 'mexico': { base: 52000, multiplier: 0.58 }, 'south-africa': { base: 38000, multiplier: 0.5 }},
        'data-scientist': { 'usa': { base: 110000, multiplier: 1.0 }, 'canada': { base: 88000, multiplier: 0.85 }, 'uk': { base: 78000, multiplier: 0.75 }, 'germany': { base: 85000, multiplier: 0.8 }, 'france': { base: 68000, multiplier: 0.7 }, 'netherlands': { base: 82000, multiplier: 0.82 }, 'sweden': { base: 79000, multiplier: 0.78 }, 'morocco': { base: 18000, multiplier: 0.4 }, 'india': { base: 22000, multiplier: 0.6 }, 'china': { base: 32000, multiplier: 0.65 }, 'japan': { base: 72000, multiplier: 0.72 }, 'singapore': { base: 78000, multiplier: 0.75 }, 'australia': { base: 92000, multiplier: 0.82 }, 'brazil': { base: 38000, multiplier: 0.55 }, 'mexico': { base: 42000, multiplier: 0.58 }, 'south-africa': { base: 32000, multiplier: 0.5 }},
        'product-manager': { 'usa': { base: 120000, multiplier: 1.0 }, 'canada': { base: 95000, multiplier: 0.85 }, 'uk': { base: 85000, multiplier: 0.75 }, 'germany': { base: 90000, multiplier: 0.8 }, 'france': { base: 75000, multiplier: 0.7 }, 'netherlands': { base: 88000, multiplier: 0.82 }, 'sweden': { base: 85000, multiplier: 0.78 }, 'morocco': { base: 20000, multiplier: 0.4 }, 'india': { base: 25000, multiplier: 0.6 }, 'china': { base: 35000, multiplier: 0.65 }, 'japan': { base: 78000, multiplier: 0.72 }, 'singapore': { base: 85000, multiplier: 0.75 }, 'australia': { base: 98000, multiplier: 0.82 }, 'brazil': { base: 42000, multiplier: 0.55 }, 'mexico': { base: 45000, multiplier: 0.58 }, 'south-africa': { base: 35000, multiplier: 0.5 }},
        'devops-engineer': { 'usa': { base: 105000, multiplier: 1.0 }, 'canada': { base: 85000, multiplier: 0.85 }, 'uk': { base: 75000, multiplier: 0.75 }, 'germany': { base: 80000, multiplier: 0.8 }, 'france': { base: 65000, multiplier: 0.7 }, 'netherlands': { base: 78000, multiplier: 0.82 }, 'sweden': { base: 75000, multiplier: 0.78 }, 'morocco': { base: 16000, multiplier: 0.4 }, 'india': { base: 20000, multiplier: 0.6 }, 'china': { base: 28000, multiplier: 0.65 }, 'japan': { base: 65000, multiplier: 0.72 }, 'singapore': { base: 72000, multiplier: 0.75 }, 'australia': { base: 88000, multiplier: 0.82 }, 'brazil': { base: 35000, multiplier: 0.55 }, 'mexico': { base: 38000, multiplier: 0.58 }, 'south-africa': { base: 28000, multiplier: 0.5 }},
        'ui-ux-designer': { 'usa': { base: 85000, multiplier: 1.0 }, 'canada': { base: 68000, multiplier: 0.85 }, 'uk': { base: 58000, multiplier: 0.75 }, 'germany': { base: 62000, multiplier: 0.8 }, 'france': { base: 52000, multiplier: 0.7 }, 'netherlands': { base: 65000, multiplier: 0.82 }, 'sweden': { base: 62000, multiplier: 0.78 }, 'morocco': { base: 12000, multiplier: 0.4 }, 'india': { base: 15000, multiplier: 0.6 }, 'china': { base: 22000, multiplier: 0.65 }, 'japan': { base: 52000, multiplier: 0.72 }, 'singapore': { base: 58000, multiplier: 0.75 }, 'australia': { base: 72000, multiplier: 0.82 }, 'brazil': { base: 25000, multiplier: 0.55 }, 'mexico': { base: 28000, multiplier: 0.58 }, 'south-africa': { base: 22000, multiplier: 0.5 }},
        'machine-learning-engineer': { 'usa': { base: 130000, multiplier: 1.0 }, 'canada': { base: 105000, multiplier: 0.85 }, 'uk': { base: 92000, multiplier: 0.75 }, 'germany': { base: 98000, multiplier: 0.8 }, 'france': { base: 82000, multiplier: 0.7 }, 'netherlands': { base: 95000, multiplier: 0.82 }, 'sweden': { base: 92000, multiplier: 0.78 }, 'morocco': { base: 22000, multiplier: 0.4 }, 'india': { base: 28000, multiplier: 0.6 }, 'china': { base: 38000, multiplier: 0.65 }, 'japan': { base: 85000, multiplier: 0.72 }, 'singapore': { base: 92000, multiplier: 0.75 }, 'australia': { base: 108000, multiplier: 0.82 }, 'brazil': { base: 45000, multiplier: 0.55 }, 'mexico': { base: 48000, multiplier: 0.58 }, 'south-africa': { base: 38000, multiplier: 0.5 }},
        'cybersecurity-analyst': { 'usa': { base: 95000, multiplier: 1.0 }, 'canada': { base: 78000, multiplier: 0.85 }, 'uk': { base: 68000, multiplier: 0.75 }, 'germany': { base: 72000, multiplier: 0.8 }, 'france': { base: 62000, multiplier: 0.7 }, 'netherlands': { base: 75000, multiplier: 0.82 }, 'sweden': { base: 72000, multiplier: 0.78 }, 'morocco': { base: 18000, multiplier: 0.4 }, 'india': { base: 22000, multiplier: 0.6 }, 'china': { base: 28000, multiplier: 0.65 }, 'japan': { base: 65000, multiplier: 0.72 }, 'singapore': { base: 72000, multiplier: 0.75 }, 'australia': { base: 82000, multiplier: 0.82 }, 'brazil': { base: 35000, multiplier: 0.55 }, 'mexico': { base: 38000, multiplier: 0.58 }, 'south-africa': { base: 28000, multiplier: 0.5 }},
    };

    const companySizeMultipliers = { 'startup': 0.85, 'small': 0.92, 'medium': 1.0, 'large': 1.15, 'enterprise': 1.25 };

    // --- EVENT LISTENERS ---
    experienceSlider.addEventListener('input', (e) => {
        expValueSpan.textContent = e.target.value;
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevents page reload
        runSimulation();
    });

    // --- MAIN FUNCTIONS ---
    function runSimulation() {
        const jobTitle = document.getElementById('job-title').value;
        const country = document.getElementById('country').value;
        const experience = parseInt(document.getElementById('experience').value);
        const companySize = document.getElementById('company-size').value;

        if (!jobTitle || !country || !companySize) {
            resultsContainer.innerHTML = `<p class="error-message">Please fill in all fields to calculate the salary.</p>`;
            return;
        }

        const annualSalary = calculateSalary(jobTitle, country, experience, companySize);
        displayResults(annualSalary, jobTitle, country, experience);
        generateComparison(jobTitle, experience, companySize);
    }

    function calculateSalary(jobTitle, country, experience, companySize) {
        const defaultJob = 'software-engineer';
        const defaultCountry = 'usa';
        
        const jobData = salaryData[jobTitle] || salaryData[defaultJob];
        const countryData = jobData[country] || jobData[defaultCountry];
        
        let annualSalary = countryData.base;
        
        // Apply multipliers
        annualSalary *= (1 + (experience * 0.08));
        annualSalary *= (companySizeMultipliers[companySize] || 1.0);
        annualSalary *= countryData.multiplier;
        
        return Math.round(annualSalary / 1000) * 1000;
    }

    function displayResults(annualSalary, jobTitle, country, experience) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency', currency: 'USD', minimumFractionDigits: 0
        });

        // Generate market insight
        const insights = [
            `${jobTitle.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} roles in ${country.toUpperCase()} are currently in high demand.`,
            `With ${experience} years of experience, you're in the ${experience < 3 ? 'entry' : experience < 7 ? 'mid' : 'senior'} level range.`,
            `This salary estimate is based on current market trends and industry standards.`,
            `Consider additional benefits like stock options, health insurance, and retirement plans.`
        ];
        const randomInsight = insights[Math.floor(Math.random() * insights.length)];

        // Create the HTML for the results
        resultsContainer.innerHTML = `
            <div class="salary-result">
                <div class="salary-amount">${formatter.format(annualSalary)}</div>
                <div>Annual Salary (USD)</div>
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
                <h3>Market Insights</h3>
                <p>${randomInsight}</p>
            </div>
        `;
    }

    function generateComparison(jobTitle, experience, companySize) {
        const comparisonGrid = document.getElementById('comparison-grid');
        const countries = ['usa', 'canada', 'uk', 'germany', 'morocco', 'singapore'];
        
        comparisonGrid.innerHTML = ''; // Clear previous cards

        countries.forEach(country => {
            const salary = calculateSalary(jobTitle, experience, companySize, country);
            const card = document.createElement('div');
            card.className = 'comparison-card';
            card.innerHTML = `
                <h4>${country.toUpperCase()}</h4>
                <div style="font-size: 1.5em; font-weight: bold; margin: 10px 0;">
                    ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(salary)}
                </div>
                <small>Annual Salary (USD)</small>
            `;
            comparisonGrid.appendChild(card);
        });
    }

    // Run the simulation with default values on page load
    runSimulation();
});
