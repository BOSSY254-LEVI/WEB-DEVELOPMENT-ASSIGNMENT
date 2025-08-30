// 🚀 Part 1: JavaScript Basics (Variables & Conditionals) //

// DOM Elements
const waterInput = document.getElementById('water-input');
const stepsInput = document.getElementById('steps-input');
const sleepInput = document.getElementById('sleep-input');
const updateBtn = document.getElementById('update-btn');
const part1Output = document.getElementById('part1-output');
const waterProgress = document.getElementById('water-progress');
const stepsProgress = document.getElementById('steps-progress');
const sleepProgress = document.getElementById('sleep-progress');

// Initialize health data
let healthData = {
  dailyWater: 6,
  dailySteps: 8500,
  sleepHours: 7,
  isHealthy: false
};

// Update progress bars
function updateProgressBars() {
  const waterPercent = Math.min(100, (healthData.dailyWater / 8) * 100);
  const stepsPercent = Math.min(100, (healthData.dailySteps / 10000) * 100);
  const sleepPercent = Math.min(100, (healthData.sleepHours / 8) * 100);
  
  waterProgress.style.width = `${waterPercent}%`;
  waterProgress.textContent = `${healthData.dailyWater}/8 cups`;
  
  stepsProgress.style.width = `${stepsPercent}%`;
  stepsProgress.textContent = `${healthData.dailySteps}/10000 steps`;
  
  sleepProgress.style.width = `${sleepPercent}%`;
  sleepProgress.textContent = `${healthData.sleepHours}/8 hours`;
}

// Update health status
function updateHealthStatus() {
  // Get values from inputs
  healthData.dailyWater = parseInt(waterInput.value) || 0;
  healthData.dailySteps = parseInt(stepsInput.value) || 0;
  healthData.sleepHours = parseInt(sleepInput.value) || 0;
  
  // Update condition
  healthData.isHealthy = (
    healthData.dailyWater >= 8 && 
    healthData.dailySteps >= 10000 && 
    healthData.sleepHours >= 7
  );
  
  // Update output
  part1Output.innerHTML = `
    Water: ${healthData.dailyWater} cups, 
    Steps: ${healthData.dailySteps}, 
    Sleep: ${healthData.sleepHours} hrs 
    → Overall Healthy? <span class="${healthData.isHealthy ? 'success' : 'error'}">${healthData.isHealthy}</span>
  `;
  
  // Update progress bars
  updateProgressBars();
}

// Event listeners
updateBtn.addEventListener('click', updateHealthStatus);

// Initialize part 1
updateHealthStatus();


// ❤️ Part 2: Functions (Reusable Logic) //

// DOM Elements
const functionOutput = document.getElementById('function-output');
const weightInput = document.getElementById('weight-input');
const heightInput = document.getElementById('height-input');

// Function 1: Track water intake
function trackWater(cups) {
  if (cups >= 8) {
    return `<span class="success">Hydrated ✅ (${cups} cups)</span>`;
  } else {
    return `<span class="warning">Drink more water 💧 (${cups}/8 cups)</span>`;
  }
}

// Function 2: Check step goal
function checkSteps(steps) {
  if (steps >= 10000) {
    return `<span class="success">Step goal achieved 👟 (${steps} steps)</span>`;
  } else {
    return `<span class="warning">Keep walking! (${steps}/10000 steps)</span>`;
  }
}

// Function 3: Calculate BMI
function calculateBMI(weight, height) {
  if (weight <= 0 || height <= 0) {
    return `<span class="error">Please enter valid weight and height</span>`;
  }
  
  const bmi = weight / (height * height);
  let category;
  
  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi < 25) {
    category = "Normal weight";
  } else if (bmi < 30) {
    category = "Overweight";
  } else {
    category = "Obesity";
  }
  
  return `BMI: ${bmi.toFixed(2)} (${category})`;
}

// Function 4: Evaluate sleep quality
function evaluateSleep(hours) {
  if (hours >= 7 && hours <= 9) {
    return `<span class="success">Good sleep 😴 (${hours} hours)</span>`;
  } else if (hours < 7) {
    return `<span class="warning">Not enough rest! (${hours}/7 hours)</span>`;
  } else {
    return `<span class="warning">Too much sleep 🛌 (${hours} hours)</span>`;
  }
}

// Function 5: Calculate daily calories (new function)
function calculateCalories(weight, height, age, isMale = true, activityLevel = 1.2) {
  // Mifflin-St Jeor Equation
  const baseCalories = isMale 
    ? 10 * weight + 6.25 * height * 100 - 5 * age + 5
    : 10 * weight + 6.25 * height * 100 - 5 * age - 161;
  
  return Math.round(baseCalories * activityLevel);
}

// Event listeners
document.getElementById("water-btn").addEventListener("click", () => {
  functionOutput.innerHTML = trackWater(healthData.dailyWater);
});

document.getElementById("steps-btn").addEventListener("click", () => {
  functionOutput.innerHTML = checkSteps(healthData.dailySteps);
});

document.getElementById("bmi-btn").addEventListener("click", () => {
  const weight = parseFloat(weightInput.value) || 0;
  const height = parseFloat(heightInput.value) || 0;
  functionOutput.textContent = calculateBMI(weight, height);
});

document.getElementById("sleep-btn").addEventListener("click", () => {
  functionOutput.innerHTML = evaluateSleep(healthData.sleepHours);
});

document.getElementById("calories-btn").addEventListener("click", () => {
  const weight = parseFloat(weightInput.value) || 0;
  const height = parseFloat(heightInput.value) || 0;
  const calories = calculateCalories(weight, height, 30, true, 1.5);
  functionOutput.innerHTML = `Estimated daily calories: <span class="success">${calories} kcal</span>`;
});

// 🔁 Part 3: Loops (Repetition & Iteration) //

const weeklyBtn = document.getElementById('weekly-btn');
const loopOutput = document.getElementById('loop-output');

weeklyBtn.addEventListener('click', () => {
  // Generate random weekly data
  const weeklyData = {
    water: Array.from({length: 7}, () => Math.floor(Math.random() * 5) + 4),
    steps: Array.from({length: 7}, () => Math.floor(Math.random() * 6000) + 4000),
    sleep: Array.from({length: 7}, () => Math.floor(Math.random() * 4) + 5)
  };
  
  let output = "<h3>Weekly Health Report</h3>";
  
  // Loop 1: For loop (weekly summary)
  output += "<p><strong>Daily Water Intake:</strong> ";
  for (let i = 0; i < weeklyData.water.length; i++) {
    output += `Day ${i+1}: ${weeklyData.water[i]} cups, `;
  }
  output += "</p>";
  
  // Loop 2: While loop (steps analysis)
  output += "<p><strong>Step Analysis:</strong> ";
  let day = 0;
  let totalSteps = 0;
  while (day < weeklyData.steps.length) {
    totalSteps += weeklyData.steps[day];
    day++;
  }
  output += `Total steps: ${totalSteps}, Average: ${Math.round(totalSteps/7)}/day`;
  output += "</p>";
  
  // Loop 3: For...of loop (sleep quality)
  output += "<p><strong>Sleep Quality:</strong> ";
  let goodSleepDays = 0;
  for (let hours of weeklyData.sleep) {
    if (hours >= 7) goodSleepDays++;
  }
  output += `${goodSleepDays} out of 7 days with sufficient sleep`;
  output += "</p>";
  
  // Loop 4: forEach loop (goal achievement)
  output += "<p><strong>Daily Goals Achievement:</strong><br>";
  weeklyData.water.forEach((water, index) => {
    const metWater = water >= 8;
    const metSteps = weeklyData.steps[index] >= 10000;
    const metSleep = weeklyData.sleep[index] >= 7;
    
    output += `Day ${index+1}: Water ${metWater ? '✅' : '❌'}, Steps ${metSteps ? '✅' : '❌'}, Sleep ${metSleep ? '✅' : '❌'}<br>`;
  });
  output += "</p>";
  
  loopOutput.innerHTML = output;
});

// 🌐 Part 4: DOM Interactions //

const textElement = document.getElementById('dom-text');
const listElement = document.getElementById('tips-list');
const changeBgBtn = document.getElementById('change-bg-btn');
const dangerBtn = document.getElementById('danger-btn');

// Array of motivational quotes
const motivations = [
  "Your health is your wealth 🌟",
  "Progress, not perfection! 🚀",
  "Small changes create big results 💫",
  "You're stronger than you think 💪",
  "Every day is a fresh start 🌈"
];

// Array of healthy tips
const healthyTips = [
  "Get sunlight exposure in the morning",
  "Include protein in every meal",
  "Stand up and stretch every hour",
  "Practice gratitude daily",
  "Limit processed foods",
  "Stay hydrated with water throughout the day",
  "Get 7-9 hours of quality sleep"
];

// 1. Change motivational text
document.getElementById("change-text-btn").addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * motivations.length);
  textElement.textContent = motivations[randomIndex];
});

// 2. Toggle highlight class
document.getElementById("toggle-style-btn").addEventListener("click", () => {
  textElement.classList.toggle("highlight");
});

// 3. Add a new healthy tip
document.getElementById("add-item-btn").addEventListener("click", () => {
  const newItem = document.createElement("li");
  const randomIndex = Math.floor(Math.random() * healthyTips.length);
  newItem.textContent = healthyTips[randomIndex];
  listElement.appendChild(newItem);
});

// 4. Remove the last tip
document.getElementById("remove-item-btn").addEventListener("click", () => {
  if (listElement.lastChild) {
    listElement.removeChild(listElement.lastChild);
  }
});

// 5. Change background color
const backgrounds = [
  "#f0f7f4", 
  "#e6f2ff", 
  "#fff2e6", 
  "#f9f0ff", 
  "#f0f8ff"
];
let bgIndex = 0;

changeBgBtn.addEventListener("click", () => {
  bgIndex = (bgIndex + 1) % backgrounds.length;
  document.body.style.backgroundColor = backgrounds[bgIndex];
});

// 6. Reset all data (new feature)
dangerBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to reset all data?")) {
    // Reset inputs
    waterInput.value = "6";
    stepsInput.value = "8500";
    sleepInput.value = "7";
    weightInput.value = "68";
    heightInput.value = "1.7";
    
    // Reset outputs
    part1Output.textContent = "";
    functionOutput.textContent = "";
    loopOutput.textContent = "";
    
    // Reset tips list
    listElement.innerHTML = `
      <li>Start your day with a glass of water</li>
      <li>Take a 10-minute walk after meals</li>
      <li>Practice deep breathing for 5 minutes daily</li>
    `;
    
    // Reset motivation text
    textElement.textContent = "Stay consistent and you'll see progress! 💪";
    textElement.classList.add("highlight");
    
    // Reset background
    document.body.style.backgroundColor = "#f0f7f4";
    
    // Update health status
    updateHealthStatus();
    
    alert("All data has been reset!");
  }
});