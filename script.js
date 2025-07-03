document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const estimatorForm = document.getElementById('estimator-form');
    const jobTitleInput = document.getElementById('job-title');
    const experienceInput = document.getElementById('experience');
    const countrySelect = document.getElementById('country');
    const resultsOutput = document.getElementById('results-output');
    const jobTitlesDatalist = document.getElementById('job-titles-list');

    // --- THE EXPANDED MOCK DATABASE ---
    const SALARY_DATA = {
        usa: {
            currency: 'USD', jobs: {
                'software engineer': { base: 90000, perYear: 5500 }, 'data analyst': { base: 72000, perYear: 4000 }, 'product manager': { base: 120000, perYear: 7000 }, 'marketing manager': { base: 80000, perYear: 4500 }, 'graphic designer': { base: 58000, perYear: 2500 }, 'accountant': { base: 65000, perYear: 3500 }, 'registered nurse': { base: 75000, perYear: 2000 }, 'hr manager': { base: 85000, perYear: 4000 }
            }
        },
        uk: {
            currency: 'GBP', jobs: {
                'software engineer': { base: 55000, perYear: 3000 }, 'data analyst': { base: 40000, perYear: 2500 }, 'product manager': { base: 65000, perYear: 4000 }, 'marketing manager': { base: 48000, perYear: 2200 }, 'graphic designer': { base: 30000, perYear: 1500 }, 'accountant': { base: 40000, perYear: 2000 }
            }
        },
        canada: {
            currency: 'CAD', jobs: {
                'software engineer': { base: 85000, perYear: 4500 }, 'data analyst': { base: 68000, perYear: 3500 }, 'product manager': { base: 100000, perYear: 6000 }, 'marketing manager': { base: 75000, perYear: 3500 }, 'hr manager': { base: 80000, perYear: 3500 }
            }
        },
        germany: {
            currency: 'EUR', jobs: {
                'software engineer': { base: 65000, perYear: 3500 }, 'data analyst': { base: 55000, perYear: 3000 }, 'product manager': { base: 80000, perYear: 4500 }, 'marketing manager': { base: 60000, perYear: 3000 }
            }
        },
        france: {
            currency: 'EUR', jobs: {
                'software engineer': { base: 50000, perYear: 2800 }, 'data analyst': { base: 45000, perYear: 2200 }, 'product manager': { base: 60000, perYear: 3500 }, 'graphic designer': { base: 35000, perYear: 1500 }
            }
        },
        australia: {
            currency: 'AUD', jobs: {
                'software engineer': { base: 110000, perYear: 5000 }, 'data analyst': { base: 90000, perYear: 4000 }, 'product manager': { base: 140000, perYear: 7000 }, 'hr manager': { base: 100000, perYear: 4500 }
            }
        },
        japan: {
            currency: 'JPY', jobs: {
                'software engineer': { base: 6000000, perYear: 300000 }, 'data analyst': { base: 5500000, perYear: 250000 }, 'product manager': { base: 8000000, perYear: 500000 }
            }
        },
        india: {
            currency: 'INR', jobs: {
                'software engineer': { base: 1200000, perYear: 150000 }, 'data analyst': { base: 800000, perYear: 100000 }, 'product manager': { base: 2000000, perYear: 250000 }
            }
        },
        brazil: {
            currency: 'BRL', jobs: {
                'software engineer': { base: 90000, perYear: 7000 }, 'data analyst': { base: 70000, perYear: 5000 }, 'marketing manager': { base: 80000, perYear: 6000 }
            }
        },
        netherlands: {
            currency: 'EUR', jobs: {
                'software engineer': { base: 60000, perYear: 3200 }, 'data analyst': { base: 50000, perYear: 2800 }, 'product manager': { base: 75000, perYear: 4000 }
            }
        },
        spain: {
            currency: 'EUR', jobs: {
                'software engineer': { base: 45000, perYear: 2500 }, 'marketing manager': { base: 40000, perYear: 2000 }, 'graphic designer': { base: 28000, perYear: 1200 }
            }
        },
        italy: {
            currency: 'EUR', jobs: {
                'software engineer': { base: 40000, perYear: 2000 }, 'data analyst': { base: 35000, perYear: 1800 }, 'accountant': { base: 32000, perYear: 1500 }
            }
        },
        switzerland: {
            currency: 'CHF', jobs: {
                'software engineer': { base: 120000, perYear: 5000 }, 'data analyst': { base: 100000, perYear: 4000 }, 'product manager': { base: 150000, perYear: 7000 }
            }
        },
        morocco: {
            currency: 'MAD',
            jobs: {
                'software engineer': { base: 150000, perYear: 10000 },
                'marketing manager': { base: 120000, perYear: 8000 },
                'graphic designer': { base: 80000, perYear: 5000 },
                'accountant': { base: 90000, perYear: 6000 }
            }
        }
    };

    // --- Functions ---
    function populateDatalist() {
        const uniqueJobs = new Set();
        Object.values(SALARY_DATA).forEach(countryData => {
            Object.keys(countryData.jobs).forEach(job => uniqueJobs.add(job));
        });

        jobTitlesDatalist.innerHTML = '';
        uniqueJobs.forEach(job => {
            const option = document.createElement('option');
            option.value = job.replace(/\b\w/g, l => l.toUpperCase());
            jobTitlesDatalist.appendChild(option);
        });
    }

    function estimateSalary(jobTitle, experience, country) {
        const normalizedJobTitle = jobTitle.trim().toLowerCase();
        const countryData = SALARY_DATA[country];
        if (!countryData) return null;

        const jobData = countryData.jobs[normalizedJobTitle];
        if (!jobData) return null;

        const estimatedBase = jobData.base + (jobData.perYear * experience);
        const range = {
            min: estimatedBase * 0.9,
            max: estimatedBase * 1.1,
            currency: countryData.currency
        };
        return range;
    }

    function displayResult(result, jobTitle, country) {
        if (!result) {
            const countryName = countrySelect.options[countrySelect.selectedIndex].text;
            resultsOutput.innerHTML = `<p class="error">Sorry, we don't have data for "${jobTitle}" in ${countryName} yet.</p>`;
            return;
        }

        const formatCurrency = (amount, currency) => {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(amount);
        };
        
        resultsOutput.innerHTML = `
            <h3 class="estimated-range">
                ${formatCurrency(result.min, result.currency)} - ${formatCurrency(result.max, result.currency)}
            </h3>
            <p class="per-year">Estimated Annual Salary (${result.currency})</p>
        `;
    }

    // --- Event Listener ---
    estimatorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const jobTitle = jobTitleInput.value;
        const experience = parseInt(experienceInput.value, 10);
        const country = countrySelect.value;
        
        if (!jobTitle) {
            resultsOutput.innerHTML = `<p class="error">Please enter a job title.</p>`;
            return;
        }
        if (isNaN(experience) || experience < 0) {
            resultsOutput.innerHTML = `<p class="error">Please enter a valid number for years of experience.</p>`;
            return;
        }
        
        const estimatedRange = estimateSalary(jobTitle, experience, country);
        displayResult(estimatedRange, jobTitle, country);
    });

    // --- Initial Setup ---
    populateDatalist();
});
