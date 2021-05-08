
/* Global Variables*/

const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');

// To change temperature to Celsius 
const tempUnit = '&units=metric';

/* Personal API Key for OpenWeatherMap API */
const apiKey = '&appid=ac6f27d9a580885264e8bcfacbfa5eee';
const baseURL ='http://api.openweathermap.org/data/2.5/weather?zip=';

/* Create a new date instance dynamically with JS */
let d = new Date()
let newDate = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear()

/* Event listener to add function to existing HTML DOM element */
document.getElementById('generate').addEventListener('click', generateAction);

/* Function called by event listener */
function generateAction (event){ 
const newZip =  document.getElementById('zip').value;
const feelings = document.getElementById('feelings').value; 
  getWeather(baseURL, newZip, apiKey)
  .then(function(data) {
    
	// Add data to post request
  postData('/add', {date: newDate, temp: data.main.temp, content: feelings});
  // Call the updateUI function to generate the UI
  })
  .then(() =>
   updateUI()
)
};

/* Function to GET Web API Data*/
  const getWeather = async (baseURL, newZip, apiKey) => {
	const res = await fetch(baseURL + newZip + apiKey+ tempUnit);
	try {
    const data = await res.json();
    return data;
	} catch (error) {
		console.log('error', error);
	}
  };

/* Function to POST data */
  const postData = async ( url = '', data = {})=>{
    console.log(data);
    const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },

     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  };


// Function to update UI dynamically

const updateUI = async () => {
  const request = await fetch('/all');
  try{
  const allData = await request.json();
  date.innerHTML = `Today is: ${allData.date}`;
  temp.innerHTML = `Temperature is: ${allData.temp}` + `°C`;
  content.innerHTML = `I feel: ${allData.content}`;

  }catch(error){
    console.log("error", error);
  }
}