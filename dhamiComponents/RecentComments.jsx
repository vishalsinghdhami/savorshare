import React from 'react';
import axios from 'axios';
import { data } from '../data/data.js';
import {FcComments} from 'react-icons/fc'
import { useState,useEffect } from 'react';
const RecentComments = () => {

//use effect frontend-backend logic
const [blogsCommentData, setBlogsCommentData] = useState([]);

//use effect frontend-backend logic
useEffect(() => {
axios.post('https://savorshare.onrender.com/recipe/getbyid',{userid:JSON.parse(localStorage.getItem("user"))._id})
  .then(response => {
    console.log(response.data);
    let tempData=response.data;
    let commentData=[];
    for(let i=0;i<tempData.length;i++){
      for(let j=0;j<tempData[i].comments.length;j++){
    commentData.push(tempData[i].comments[j]);

      }
    }
    // handle the comment data
   console.log(commentData,"All comment recipe");

    setBlogsCommentData(commentData);
   
  })
  .catch(error => {
    // handle the error
    console.log(error);
  });
}, []);

const [recipeCommentData, setRecipeCommentData] = useState([]);
//use effect frontend-backend logic
useEffect(() => {
axios.post('https://savorshare.onrender.com/blog/getbyid',{userid:JSON.parse(localStorage.getItem("user"))._id})
  .then(response => {
    console.log(response.data);
    let tempData=response.data;
    let commentData=[];
    for(let i=0;i<tempData.length;i++){
      for(let j=0;j<tempData[i].comments.length;j++){
    commentData.push(tempData[i].comments[j]);

      }
    }
    console.log(commentData,"All comment blogs");
    setRecipeCommentData(commentData);
   
  })
  .catch(error => {
    // handle the error
    console.log(error);
  });
}, []);
   
const [allCommentData,setAllCommentData]=useState([]);
useEffect(()=>{
let tempData=recipeCommentData.concat(blogsCommentData)
setAllCommentData(tempData);
},[recipeCommentData,blogsCommentData])

  return (
    <div className='w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll'>
      <h1 style={{display:'flex',justifyContent:'center'}}>Recent Activities on your Blogs and Recipes</h1>
      <ul>
        {allCommentData.map((order, id) => (
          <li
            key={id}
            className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2  cursor-pointer'
          >
          
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
            <div className='bg-purple-100 rounded-lg p-3'>
              <FcComments className='text-purple-800' />
            </div>
              <div className='text-gray-800 font-bold'>
                Email : {order.email}
              </div>
              
              <div className='text-gray-400 font-bold'>
                {/* person who comment */}
                Comment : {order.comment}</div>
              <div className='text-gray-800 font-bold'>
                Date and Time : {order.date}</div>
 
            </div>
            
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentComments;
