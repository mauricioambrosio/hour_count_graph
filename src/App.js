import './App.css';
import Chart from "react-google-charts";

function getHours(){
  const hours = {};
  let i;
  for(i=0; i<24; i++){
    hours[i] = 0;
  }
  return hours;
} 

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function genRandomDates(n, start, end){
  const dates = [];
  let i;
  for(i=0; i<n; i++){
    dates.push(randomDate(start, end));
  }
  return dates;
}

function formatHour(hour){
  return parseInt(hour) > 12 
      ? (parseInt(hour)-12).toString() + " PM" 
      : hour + " AM";
}

// O(n)
function App() {
  const dates = genRandomDates(1000, new Date(2020, 1, 1), new Date()); 
  let hourCounts = getHours();

  dates.forEach(date=>{
    hourCounts[date.getHours()] += 1;
  });

  let max = -Infinity;
  let maxHour = null;
  let maxHourNext = null;

  hourCounts = Object.keys(hourCounts).map(hour => {

    let formattedHour = formatHour(hour);
    let count = hourCounts[hour];
    
    if(count > max){
      max = count;
      maxHour = parseInt(hour);
      maxHourNext = (parseInt(hour) + 1) % 24;
    }

    return [formattedHour, count];
  });
  
  console.log(hourCounts);
  const data = [['', ''], ...hourCounts]
  
  return (
    <div className="App" style={{margin:100}}>
      <Chart
        // width={'500px'}
        height={'300px'}
        chartType="Line"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          chart:{
            title: 'Most popular times',
            subtitle: 'Gain insight on which time of the day your product is most popular.',
          },
        }}
        rootProps={{ 'data-testid': '1' }}
      />
      <p>{`This product is used most often between ${formatHour(maxHour)} and ${formatHour(maxHourNext)}.`}</p>
    </div>
  );
}

export default App;
