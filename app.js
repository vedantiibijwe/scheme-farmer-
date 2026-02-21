function sendOTP(){
document.getElementById("otpSection").classList.remove("hidden");
}

function verifyOTP(){
const otp = document.getElementById("otp").value;

if(otp === "1234"){
localStorage.setItem("loggedIn", true);
window.location.href = "dashboard.html";
}else{
alert("Invalid OTP");
}
}

function logout(){
localStorage.clear();
window.location.href = "index.html";
}

function saveProfile(){

const profile = {
name: document.getElementById("name").value,
land: parseFloat(document.getElementById("land").value),
income: parseFloat(document.getElementById("income").value),
district: document.getElementById("district").value,
caste: document.getElementById("caste").value
};

localStorage.setItem("profile", JSON.stringify(profile));

alert("Profile Saved");
}

function checkEligibility(profile){
if(profile.income <= 200000 && profile.land <= 5){
return true;
}
return false;
}

function loadSchemes(){

const profile = JSON.parse(localStorage.getItem("profile"));

if(!profile){
alert("Please complete profile first");
window.location.href="profile.html";
return;
}

if(!checkEligibility(profile)){
document.getElementById("schemeList").innerHTML =
"<h2 class='text-red-600 text-xl'>You are not eligible for schemes</h2>";
return;
}

const schemes = [
{name:"Irrigation Support Scheme"},
{name:"Seed Subsidy Scheme"},
{name:"Farm Equipment Grant"}
];

const container = document.getElementById("schemeList");

schemes.forEach(s=>{
container.innerHTML += `
<div class="bg-white p-6 rounded shadow">
<h3 class="font-bold">${s.name}</h3>
<button onclick="applyScheme('${s.name}')"
class="bg-green-600 text-white px-3 py-1 rounded mt-2">
Apply
</button>
</div>`;
});
}

function applyScheme(name){
let apps = JSON.parse(localStorage.getItem("apps")) || [];

apps.push({
scheme:name,
status:"PENDING"
});

localStorage.setItem("apps", JSON.stringify(apps));
alert("Application Submitted");
}

function loadStatus(){
const apps = JSON.parse(localStorage.getItem("apps")) || [];
const container = document.getElementById("statusList");

apps.forEach(a=>{
container.innerHTML += `
<div class="bg-white p-4 rounded shadow mb-4">
Scheme: ${a.scheme} <br>
Status: ${a.status}
</div>`;
});
}

if(document.getElementById("schemeList")){
loadSchemes();
}

if(document.getElementById("statusList")){
loadStatus();
}