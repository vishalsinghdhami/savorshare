import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChartMonthsBlogs = () => {

//use effect frontend-backend logic

const [newDataArray,setNewDataArray]=useState([1, 2, 1, 2, 1, 2]);

useEffect(() => {
  axios.post('https://savorshare.onrender.com/blog/getbyid',{userid:JSON.parse(localStorage.getItem("user"))._id})
    .then(response => {
      // handle the response data
      let tempData=response.data;
      let tempArray=[1,0,3,4,5,2];
      for(let i=0;i<tempData.length;i++){
        
       let month='01';
       
       month=tempData[i].date[5]+tempData[i].date[6];
       console.log(tempData[i]);
       console.log(month,"adhaidha");
       if(month=='01'||month=='02'){
          tempArray[0]++;
       }
       else if(month=='03'||month=='04'){
          tempArray[1]++;
       }
       else if(month=='05'||month=='06'){
          tempArray[2]++;
       }
       else if(month=='07'||month=='08'){
          tempArray[3]++;
       }
       else if(month=='09'||month=='10'){
          tempArray[4]++;
       }
       else if(month=='11'||month=='12'){
         tempArray[5]++;
       }
  
       }
       console.log(tempArray,"dawdwd");
    setNewDataArray(tempArray);
      console.log(response.data);
    })
    .catch(error => {
      // handle the error
      console.log(error);
    });
  }, []);
  
  

  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
        labels:  ['Jan-Feb', 'Mar-Apr', 'May-Jun', 'July-Aug', 'Sep-Oct', 'Nov-Dec'],
        datasets: [
            {
                label: 'No of Blogs ',

//                data: [12, 20, 9, 13, 18, 17],
                data: newDataArray,


                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgb(53, 162, 235, 0.4',
              }, 
        ]
    })
    setChartOptions({
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'No of Blogs you posted in every 2 Month Period'
            }
        },
        maintainAspectRatio: false,
        responsive: true
    })
  }, [newDataArray])

  return (
    <>
      <div className='w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white'>
        <Bar data={chartData} options={chartOptions} />
      </div>
      
    </>
  );
};

export default BarChartMonthsBlogs;
