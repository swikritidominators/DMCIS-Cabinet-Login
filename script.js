document.addEventListener("DOMContentLoaded", () => {
    // --- Configuration & Data ---
    const wards = [
        "Arjun Nagar (Shahdara North)", 
        "Govind Puri (City SP)", 
        "Okhla (Shahdara South)", 
        "Ward 144 (West)", 
        "Ward 165 (Shahdara North)",
        "Lajpat Nagar (Central)",
        "Civil Lines (North)"
    ];

    const issues = [
        "Water Logging", 
        "Pump Failure", 
        "Road Cave-in", 
        "Drain Blockage",
        "Power Outage at Pump Station"
    ];

    const actions = [
        "Pump Restarted", 
        "Field Team Sent", 
        "Debris Cleared", 
        "Super Sucker Deployed",
        "Traffic Diverted"
    ];

    const commLogs = [
        "MCD: Staff shift change completed.",
        "PWD: Machinery maintenance team arrived at Sector 4.",
        "POLICE: Traffic smooth at ITO junction.",
        "MCD: Drain desilting started in Ward 210.",
        "CONTROL: Heavy rain alert received for North Zone.",
        "PWD: Pump #43 restarted successfully.",
        "Team Alpha: Reached location Ballimaran."
    ];

    // --- Live Feed Logic ---
    const feedBody = document.getElementById("live-feed-body");

    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; 
        return `${hours}:${minutes} ${ampm}`;
    }

    // Initial Population of Feed
    function addFeedRow(animate = false) {
        const row = document.createElement("tr");
        
        const randWard = wards[Math.floor(Math.random() * wards.length)];
        const randIssue = issues[Math.floor(Math.random() * issues.length)];
        const randAction = actions[Math.floor(Math.random() * actions.length)];
        
        row.innerHTML = `
            <td>${getCurrentTime()}</td>
            <td><strong>${randWard}</strong></td>
            <td>${randIssue}</td>
            <td><a href="#" style="color: #3498db; text-decoration: none;">${randAction}</a></td>
            <td><span class="status-badge">RESOLVED</span></td>
        `;

        if (animate) {
            row.style.animation = "highlight 1s ease";
        }

        feedBody.insertBefore(row, feedBody.firstChild);

        // Keep list to max 5 items
        if (feedBody.children.length > 5) {
            feedBody.removeChild(feedBody.lastChild);
        }
    }

    // Create initial 5 rows
    for(let i=0; i<5; i++) {
        addFeedRow();
    }

    // Add new row every 4 seconds
    setInterval(() => {
        addFeedRow(true);
    }, 4000);


    // --- Resource Tracker Live Simulation ---
    // Slightly fluctuate the numbers to make it look "Live"
    const machinesEl = document.getElementById("drain-machines");
    const pumpsEl = document.getElementById("water-pumps");
    
    setInterval(() => {
        // Random fluctuation for machines (120-130)
        let mVal = 120 + Math.floor(Math.random() * 10);
        machinesEl.innerText = `${mVal}/150`;

        // Random fluctuation for pumps (350-360)
        let pVal = 350 + Math.floor(Math.random() * 10);
        pumpsEl.innerText = `${pVal}/400`;
    }, 5000);


    // --- Terminal Log Simulation ---
    const terminalContent = document.getElementById("terminal-content");

    function addLogEntry() {
        const log = commLogs[Math.floor(Math.random() * commLogs.length)];
        const div = document.createElement("div");
        div.className = "log-entry";
        
        const now = new Date();
        const timeStr = `[${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}]`;
        
        div.innerHTML = `<span class="log-time">${timeStr}</span> ${log}`;
        terminalContent.appendChild(div);

        // Auto scroll to bottom
        terminalContent.scrollTop = terminalContent.scrollHeight;

        // Keep logs clean (max 8 lines)
        if (terminalContent.children.length > 8) {
            terminalContent.removeChild(terminalContent.firstChild);
        }
    }

    // Initial logs
    addLogEntry();
    addLogEntry();
    addLogEntry();

    // Add log every 2.5 seconds
    setInterval(addLogEntry, 2500);

});
// ===============================
// WARD-SPECIFIC VULNERABILITY MAP
// ===============================

const WARD_PROFILES = {
    "Ballimaran": {
        type: "Old City / Low Elevation",
        dominantRisk: "Drain Congestion",
        drainsBlockedPct: 42,
        historicalFlood: true
    },
    "Burari": {
        type: "River Adjacent",
        dominantRisk: "Yamuna Backflow",
        drainsBlockedPct: 18,
        historicalFlood: true
    },
    "Okhla": {
        type: "Industrial + Floodplain",
        dominantRisk: "Reservoir Discharge",
        drainsBlockedPct: 30,
        historicalFlood: true
    },
    "Lajpat Nagar": {
        type: "Planned Residential",
        dominantRisk: "Surface Runoff",
        drainsBlockedPct: 12,
        historicalFlood: false
    },
    "Karol Bagh": {
        type: "Dense Commercial",
        dominantRisk: "Road-Level Waterlogging",
        drainsBlockedPct: 35,
        historicalFlood: true
    }
};

// --- Explainable AI (XAI) Decision Support ---

const xaiScenarios = [
    {
        summary: "High flood risk in this Zone because the Contiguous Reservoir is at 92% capacity and the 4:00 PM high tide is expected to block the primary sluice gate.",
        factors: [
            "Reservoir water level above safe threshold (92%)",
            "High tide window overlaps peak rainfall",
            "Drain discharge capacity reduced by 38%",
            "Historical flooding recorded under similar conditions"
        ],
        recommendation: "Declare school holiday and pre-position water pumps in Zone ."
    },
    {
        summary: "Moderate flood risk detected due to sustained rainfall and partial drain blockage in low-lying wards.",
        factors: [
            "Rainfall intensity above 40 mm/hr",
            "Two secondary drains operating at reduced efficiency",
            "Traffic congestion may delay response vehicles"
        ],
        recommendation: "Issue public advisory and deploy rapid response teams."
    },
    {
        summary: "Severe flood likelihood in river-adjacent wards due to upstream discharge release and saturated soil conditions.",
        factors: [
            "Upstream dam release scheduled within 3 hours",
            "Soil saturation index at critical level",
            "Evacuation routes partially compromised"
        ],
        recommendation: "Initiate precautionary evacuation and activate disaster response protocol."
    }
];

function generateXAISummary() {
    const scenario = xaiScenarios[Math.floor(Math.random() * xaiScenarios.length)];

    document.getElementById("xai-summary-text").innerText = scenario.summary;
    document.getElementById("xai-recommendation-text").innerText = scenario.recommendation;

    const factorList = document.getElementById("xai-factor-list");
    factorList.innerHTML = "";

    scenario.factors.forEach(factor => {
        const li = document.createElement("li");
        li.innerText = factor;
        factorList.appendChild(li);
    });
}

// Initial load
generateXAISummary();

// Refresh XAI reasoning every 15 seconds (simulating live AI)
setInterval(generateXAISummary, 15000);
// ===============================
// LIVE DATA DRIVEN XAI ENGINE
// ===============================

const IMD_RAINFALL_API = "https://api.open-meteo.com/v1/forecast?latitude=28.61&longitude=77.21&hourly=precipitation";
const CWC_RESERVOIR_API = "https://example.gov.in/cwc/reservoir-levels"; // simulated
const TIDE_API = "https://api.stormglass.io/v2/tide/extremes"; // simulated

async function fetchRainfall() {
    const res = await fetch(IMD_RAINFALL_API);
    const data = await res.json();
    return data.hourly.precipitation.slice(0, 3); // next 3 hours
}

function fetchReservoirLevel(ward) {
    // Simulated mapping (real system uses CWC feed)
    const levels = {
        Ballimaran: 92,
        Burari: 88,
        Okhla: 95,
        "Lajpat Nagar": 81
    };
    return levels[ward] || 85;
}

function fetchTideImpact() {
    // Simulated INCOIS tide impact
    return {
        time: "16:00",
        impact: "HIGH"
    };
}

function generateExplainableDecision(ward, rainfall, reservoir, tide) {
    let reasons = [];
    let risk = "MODERATE";

    if (reservoir > 90) {
        reasons.push(`Reservoir feeding ${ward} is at ${reservoir}% capacity`);
        risk = "HIGH";
    }

    if (rainfall.reduce((a,b)=>a+b,0) > 40) {
        reasons.push("Heavy rainfall expected in next 3 hours");
        risk = "HIGH";
    }

    if (tide.impact === "HIGH") {
        reasons.push(`High tide at ${tide.time} likely to block sluice discharge`);
    }

    const summary = `High flood risk in ${ward} because ${reasons.join(", ")}.`;

    let recommendation =
        risk === "HIGH"
            ? "Declare precautionary school holiday and deploy emergency pumps."
            : "Issue public advisory and monitor ward closely.";

    return { risk, summary, reasons, recommendation };
}

async function updateXAIDashboard() {
    const ward = document.getElementById("wardSelect").value;

    const rainfall = await fetchRainfall();
    const reservoir = fetchReservoirLevel(ward);
    const tide = fetchTideImpact();

    const decision = generateExplainableDecision(
        ward,
        rainfall,
        reservoir,
        tide
    );

    document.getElementById("risk-level").innerText = decision.risk;
    document.getElementById("xai-summary-text").innerText = decision.summary;
    document.getElementById("xai-recommendation-text").innerText = decision.recommendation;

    const list = document.getElementById("xai-factor-list");
    list.innerHTML = "";
    decision.reasons.forEach(r => {
        const li = document.createElement("li");
        li.innerText = r;
        list.appendChild(li);
    });
}

// Load on start
updateXAIDashboard();

// Update when ward changes
document.getElementById("wardSelect").addEventListener("change", updateXAIDashboard);

// Auto refresh every 10 minutes (gov-realistic)
setInterval(updateXAIDashboard, 600000);
function generateExplainableDecision(ward, rainfall, reservoir, tide) {
    const profile = WARD_PROFILES[ward];
    let reasons = [];
    let riskScore = 0;

    // Rainfall impact
    const rainSum = rainfall.reduce((a, b) => a + b, 0);
    if (rainSum > 40) {
        reasons.push(`Heavy rainfall (${rainSum.toFixed(1)} mm expected in next 3 hours)`);
        riskScore += 2;
    }

    // Reservoir impact (ward dependent)
    if (profile.dominantRisk === "Reservoir Discharge" && reservoir > 90) {
        reasons.push(`Upstream reservoir near ${ward} at ${reservoir}% capacity`);
        riskScore += 2;
    }

    // Drain vulnerability
    if (profile.drainsBlockedPct > 30) {
        reasons.push(`${profile.drainsBlockedPct}% municipal drains currently vulnerable`);
        riskScore += 1.5;
    }

    // River / tide interaction
    if (profile.dominantRisk === "Yamuna Backflow" && tide.impact === "HIGH") {
        reasons.push(`High Yamuna backflow risk due to ${tide.time} tide`);
        riskScore += 2;
    }

    // Historical precedent
    if (profile.historicalFlood) {
        reasons.push("Ward has prior flood incidents under similar conditions");
        riskScore += 1;
    }

    // Final risk classification
    let risk = "LOW";
    if (riskScore >= 5) risk = "HIGH";
    else if (riskScore >= 3) risk = "MODERATE";

    // Ward-specific policy recommendation
    let recommendation = "";
    if (risk === "HIGH") {
        recommendation = `Activate ward-level emergency protocol in ${ward}, deploy pumps, and consider school closure advisory.`;
    } else if (risk === "MODERATE") {
        recommendation = `Issue public alert for ${ward} and place response teams on standby.`;
    } else {
        recommendation = `Normal monitoring sufficient for ${ward}.`;
    }

    const summary = `Flood risk in ${ward} is ${risk.toLowerCase()} due to ${reasons.join(", ")}.`;

    return { risk, summary, reasons, recommendation };
}
// Simulated LIVE ward data (replace with API later)
const wardData = [
    { ward: "Ballimaran", budgetCr: 3, riskReduction: 12, intervention: "Drain Desilting" },
    { ward: "Jharoda", budgetCr: 2, riskReduction: 10, intervention: "Pump Installation" },
    { ward: "Bakhtawarpur", budgetCr: 5, riskReduction: 18, intervention: "Storm Drain Upgrade" }
];

// Calculations
let totalSpent = 0;
let totalRiskReduced = 0;

wardData.forEach(w => {
    totalSpent += w.budgetCr;
    totalRiskReduced += w.riskReduction;
});

const costPerWard = (totalSpent / wardData.length).toFixed(2);
const avgRiskReduction = (totalRiskReduced / wardData.length).toFixed(1);

// Update UI
document.getElementById("totalSpent").innerText = `₹${totalSpent} Cr`;
document.getElementById("riskReduced").innerText = `${avgRiskReduction}%`;
document.getElementById("costPerWard").innerText = `₹${costPerWard} Cr`;

// Cost-effectiveness ranking
const sortedByEfficiency = [...wardData].sort(
    (a, b) => (b.riskReduction / b.budgetCr) - (a.riskReduction / a.budgetCr)
);

const list = document.getElementById("bestInterventions");
list.innerHTML = "";

sortedByEfficiency.forEach(item => {
    const efficiency = (item.riskReduction / item.budgetCr).toFixed(1);
    const li = document.createElement("li");
    li.innerText = `${item.intervention} (${item.ward}) — ${efficiency}% risk reduction per ₹1 Cr`;
    list.appendChild(li);
});
// ===============================
// GIS MAPPING MODULE (Leaflet.js)
// ===============================

function initMap() {
    // 1. Initialize Map centered on Delhi
    const map = L.map('admin-map').setView([28.65, 77.22], 11);

    // 2. Add Base Layer (CartoDB Dark Matter for "War Room" aesthetic)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    // --- ICONS ---
    const criticalIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
    });

    const resourceIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
    });

    // --- DATA: Critical Wards (Synced with your list) ---
    const criticalWards = [
        { name: "Ballimaran", coords: [28.6508, 77.2250], mpi: "0.0", risk: "Extreme" },
        { name: "Jharoda", coords: [28.7050, 77.1850], mpi: "0.3", risk: "High" },
        { name: "Bakhtawarpur", coords: [28.8150, 77.1350], mpi: "0.7", risk: "High" },
        { name: "Burari", coords: [28.7550, 77.1950], mpi: "0.8", risk: "Critical" },
        { name: "Sant Nagar", coords: [28.6250, 77.0850], mpi: "1.1", risk: "High" }
    ];

    // Plot Critical Wards
    criticalWards.forEach(ward => {
        L.marker(ward.coords, { icon: criticalIcon })
            .addTo(map)
            .bindPopup(`
                <b>🚨 ${ward.name}</b><br>
                Risk Level: ${ward.risk}<br>
                MPI Score: ${ward.mpi}<br>
                <button style="margin-top:5px; background:red; color:white; border:none; padding:4px;">Dispatch Team</button>
            `);
    });

    // --- DATA: Deployed Resources (Simulated Live Positions) ---
    const resources = [
        { id: "Pump-01", type: "Super Sucker", coords: [28.66, 77.23] },
        { id: "Pump-04", type: "Mob. Pump", coords: [28.64, 77.21] },
        { id: "Truck-88", type: "Debris Van", coords: [28.67, 77.20] }
    ];

    resources.forEach(res => {
        L.marker(res.coords, { icon: resourceIcon })
            .addTo(map)
            .bindPopup(`<b>🚛 ${res.type} (${res.id})</b><br>Status: Active`);
    });

    // --- LAYER: Flood Risk Heatmap (Simulated) ---
    // [lat, lng, intensity]
    const heatPoints = [
        [28.6508, 77.2250, 1.0], // Ballimaran (High)
        [28.7550, 77.1950, 0.9], // Burari
        [28.6139, 77.2090, 0.5], // Central Delhi
        [28.5355, 77.3910, 0.8], // Noida border
        [28.66, 77.23, 0.6]      // Old Delhi
    ];

    L.heatLayer(heatPoints, { radius: 35, blur: 15, maxZoom: 12 }).addTo(map);
}

// Initialize map after DOM loads
document.addEventListener("DOMContentLoaded", () => {
    initMap(); 
});
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById('loginForm');
    const loginGateway = document.getElementById('login-gateway');
    const dashboardWrapper = document.getElementById('dashboard-wrapper');
    const captchaDisplay = document.getElementById('captchaDisplay');
    const loginError = document.getElementById('loginError');

    let currentCaptcha = "";

    // Generate random 4-digit captcha
    function generateCaptcha() {
        currentCaptcha = Math.floor(1000 + Math.random() * 9000).toString();
        captchaDisplay.innerText = currentCaptcha;
    }

    // Refresh captcha
    document.getElementById('refreshCaptcha').addEventListener('click', generateCaptcha);

    // Form Submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('ministerName').value;
        const ward = document.getElementById('loginWard').value;
        const captchaInput = document.getElementById('captchaInput').value;

        if (captchaInput !== currentCaptcha) {
            loginError.innerText = "❌ Security Captcha Incorrect. Please try again.";
            loginError.style.display = "block";
            generateCaptcha();
            return;
        }

        // Success: Unlock Portal
        loginGateway.style.transition = "opacity 0.5s ease";
        loginGateway.style.opacity = "0";
        
        setTimeout(() => {
            loginGateway.style.display = "none";
            dashboardWrapper.style.display = "block";
            // Optional: Personalize the dashboard
            console.log(`Welcome Minister ${name}, monitoring ward: ${ward}`);
        }, 500);
    });

    // Initialize first captcha
    generateCaptcha();
});