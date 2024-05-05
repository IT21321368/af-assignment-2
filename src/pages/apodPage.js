import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import Footer, { navigation2 }  from '../components/footer';

const apiKey = process.env.REACT_APP_NASA_KEY;

export default function PictureOfDay() {
    const [photoData, setPhotoData] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Set default date to today

    useEffect(() => {
        fetchPhoto(selectedDate);

        async function fetchPhoto(date){
            const res = await fetch(
                `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`
            );
            const data = await res.json();
            setPhotoData(data);
        }
    }, [selectedDate]);

    if(!photoData) return <div/>;

    return (
        <div className="bg-gray-900">
            {/* Header */}
            <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

            {/* Main Content */}
            <div>
              {/* Date Selector */}
              <div className="absolute mt-7 ml-8 z-50 flex items-center">
                <label htmlFor="dateSelector" className="text-gray-700 font-mono mr-2">Select Date:</label>
                <input
                  type="date"
                  id="dateSelector"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-2 py-1 rounded-lg bg-white text-gray-700 focus:outline-none border border-gray-700"
                />
              </div>
              <div className="absolute mt-24 ml-8 text-3xl md:text-5xl font-bold capitalize  z-50">
                Image of the day
              </div>
            </div>
            
            <div className="relative isolate overflow-hidden mt-24 py-24 sm:flex justify-center bg-white">
              {/* APOD Image */}
              <div className="sm:w-1/2 flex justify-center items-center mt-14">
                <img
                src={photoData.url}
                alt={photoData.title}
                className="h-3/5 w-3/4 object-cover"
                />
              </div>
              {/* APOD Details */}
              <div className="sm:w-1/2 flex justify-center items-center mt-14">
                <div className="max-w-xl pt-14 p-8  xl:mr-0">
                  <h1 className="text-2xl font-bold mb-2">{photoData.title}</h1>
                  <p className="text-gray-600 mb-2">{photoData.date}</p>
                  <p className="text-lg text-gray-800 text-justify">{photoData.explanation}</p>
                </div>
              </div>
            </div>
            
            

            {/* Footer */}
            <Footer navigation2={navigation2} />
        </div>
    );
}
