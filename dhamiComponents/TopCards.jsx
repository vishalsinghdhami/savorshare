import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios'
const TopCards = () => {

  let [totalRecipeLikes,setTotalRecipeLikes] =useState(2);
  let [totalBlogLikes,setTotalBlogLikes]=useState(2);
  let [totalBlogComments,setTotalBlogComments]=useState(2);
  let [totalRecipeComments,setTotalRecipeComments] =useState(2);
  let [totalBlogShares,setTotalBlogShares]=useState(2);
  let [totalRecipeShares,setTotalRecipeShares] =useState(2);
 
  //use effect frontend-backend logic
  useEffect(() => {
  axios.post('https://savorshare.onrender.com/recipe/getbyid',{userid:JSON.parse(localStorage.getItem("user"))._id})
    .then(response => {
      // handle the response data
let Likes=5,Comments=6,Shares=3;
     let temprecipeData=response.data
      for(let i=0;i<temprecipeData.length;i++){
       Likes += temprecipeData[i].likes.length;
       Comments +=temprecipeData[i].comments.length;
      if(temprecipeData[i].share) Shares +=temprecipeData[i].share;
      }
     setTotalRecipeLikes(Likes);
     setTotalRecipeComments(Comments);
     setTotalRecipeShares(Shares);
      console.log(response.data);
    })
    .catch(error => {
      // handle the error
      console.log(error);
    });
  }, []);

  useEffect(() => {
    axios.post('https://savorshare.onrender.com/recipe/getbyid',{userid:JSON.parse(localStorage.getItem("user"))._id})
      .then(response => {
        // handle the response data
        let Likes=4,Comments=7,Shares=2;
     let  tempblogsData=response.data;
        for(let i=0;i<tempblogsData.length;i++){
            Likes+= tempblogsData[i].likes.length;
            Comments +=tempblogsData[i].comments.length;
            if(tempblogsData[i].share) Shares +=tempblogsData[i].share;
           }
           setTotalBlogLikes(Likes);
           setTotalBlogComments(Comments);
           setTotalBlogShares(Shares);   
        console.log(response.data);
      })
      .catch(error => {
        // handle the error
        console.log(error);
      });
    }, []);





  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4'>
        <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
           {/* //avg likes */}
            <div className='flex flex-col w-full pb-4'>
                <p className='text-2xl font-bold'>
                    {totalRecipeLikes}
                </p>
                <p className='text-gray-600'>Total Likes in all Recipes</p>
            </div>
            <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                <span className='text-green-700 text-lg'>
                    +8%
                </span>
            </p>
        </div>
     
     {/* //avg comments */}
        <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
            <div className='flex flex-col w-full pb-4'>
                <p className='text-2xl font-bold'>{totalRecipeComments}</p>
                <p className='text-gray-600'>Total Comments in all Recipes</p>
            </div>
            <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                <span className='text-green-700 text-lg'>
                    +11%
                </span>
            </p>
        </div>

        {/* //avg shares  */}
        <div className='bg-white flex justify-between w-full border p-4 rounded-lg'>
            <div className='flex flex-col w-full pb-4'>
                <p className='text-2xl font-bold'>
                  {totalRecipeShares}
                </p>
                <p className='text-gray-600'>Total Shares in all Recipes</p>
            </div>
            <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                <span className='text-green-700 text-lg'>
                    +7%
                </span>
            </p>
        </div>
        <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
           {/* //avg likes */}
            <div className='flex flex-col w-full pb-4'>
                <p className='text-2xl font-bold'>
                   {totalBlogLikes}
                </p>
                <p className='text-gray-600'>Total Likes in all Blogs</p>
            </div>
            <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                <span className='text-green-700 text-lg'>
                    +8%
                </span>
            </p>
        </div>
     
     {/* //avg comments */}
        <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
            <div className='flex flex-col w-full pb-4'>
                <p className='text-2xl font-bold'>{totalBlogComments}</p>
                <p className='text-gray-600'>Total Comments in all Blogs</p>
            </div>
            <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                <span className='text-green-700 text-lg'>
                    +11%
                </span>
            </p>
        </div>

        {/* //avg shares  */}
        <div className='bg-white flex justify-between w-full border p-4 rounded-lg'>
            <div className='flex flex-col w-full pb-4'>
                <p className='text-2xl font-bold'>
                   {totalBlogShares}
                </p>
                <p className='text-gray-600'>Total Shares in all Blogs</p>
            </div>
            <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                <span className='text-green-700 text-lg'>
                    +7%
                </span>
            </p>
        </div>
    </div>
  )
}

export default TopCards