/* Global Variables */

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const myApiKey = "&appid=9cfe08fdaf5c2dd8435363fb4c37821e";

const generateButton = document.getElementById("generate");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

//adding an event listener to generate button
generateButton.addEventListener("click", perfromAction);

//performing all actions
function perfromAction(e) {
  const userZip = document.getElementById("zip").value;
  const userFeelings = document.getElementById("feelings").value;

  getWeatherInfo(baseUrl, userZip, myApiKey)
    .then(function (data) {
      //posting data
      console.log(data);
      postData("http://localhost:8000/addData", {
        date: newDate,
        temp: data.main.temp,
        content: userFeelings,
      });
    })
    .then(updateUI);
}

//getting data from web api
const getWeatherInfo = async (baseUrl, zip, apiKey) => {
  const res = await fetch(baseUrl + zip +',us'+ apiKey);

  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

//posting data by the user to addData route

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log(error);
  }
};

//updating the user interface

const updateUI = async () => {
  const request = await fetch("http://localhost:8000/allData");
  try {
    const allData = await request.json();
    document.getElementById("date").innerHTML = allData.date;
    document.getElementById("temp").innerHTML = allData.temp;
    document.getElementById("content").innerHTML = allData.content;
  } catch (error) {
    console.log(error);
  }
};
