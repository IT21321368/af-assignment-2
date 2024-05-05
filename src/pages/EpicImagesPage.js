import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react'
import Header from '../components/header';
import Footer, { navigation2 }  from '../components/footer';

const apiKey = process.env.REACT_APP_NASA_KEY;

const EpicImagesPage = () => {
    const [epicImages, setEpicImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetchEpicImages();
    }, [currentPage]);

    const fetchEpicImages = async () => {
        try {
            const response = await fetch(`https://api.nasa.gov/EPIC/api/natural/images?api_key=${apiKey}`);
            const data = await response.json();
            setEpicImages(data);
        } catch (error) {
            console.error('Error fetching EPIC images:', error);
        }
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(Math.max(currentPage - 1, 1));
    };

    const openPopup = (image) => {
      setSelectedImage(image);
    };
  
    const closePopup = () => {
      setSelectedImage(null);
    };

    return (
<div className="bg-white">
        {/* Header */}
        <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

        <div className="relative isolate overflow-hidden pt-32">
            <h1 className="text-4xl ml-8 font-bold mb-16">NASA EPIC Images</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-8 mb-8">
                {epicImages.map(image => (
                    <div key={image.identifier} className="bg-gray-100 pb-4">
                        
                        <img src={`https://api.nasa.gov/EPIC/archive/natural/${image.date.slice(0, 4)}/${image.date.slice(5, 7)}/${image.date.slice(8, 10)}/png/${image.image}.png?api_key=${apiKey}`} alt={`EPIC Image ${image.identifier}`} className="w-full h-auto " />
                        
                        <p className='px-4 mt-4 text-lg text-blue-gray-900 font-semibold mb-4'> {image.caption}</p>
                        
                        <p className='pl-4 text-gray-700'>Latitude: {image.centroid_coordinates.lat}</p>
        	              <p className='pl-4 text-gray-700'>Longitude: {image.centroid_coordinates.lon}</p>

                        <div className="flex justify-between items-center px-4 mt-4">
                        <button onClick={() => openPopup(image)} className="text-sm font-semibold leading-6  border border-black bg-black hover:bg-gray-700 hover:border-gray-700 rounded-3xl px-4 py-1 text-white focus:outline-none">View More</button>
                        {/* Extract date and time */}
                        {image.date && (
                        <div className="px-4 mt-1 text-right text-sm font-normal text-gray-500">
                          <p> {new Date(image.date).toLocaleDateString()}</p>
                          <p> {new Date(image.date).toLocaleTimeString()}</p>
                        </div>
                         )}
                         </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Popup Dialog */}
      {selectedImage && (
        <Dialog open={true} onClose={closePopup}>
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
          <Dialog.Panel className="fixed inset-0 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg max-w-lg">
              <h2 className="text-lg font-semibold mb-4">{selectedImage.caption}</h2>
              <div className='grid grid-cols-2 gap-4 mb-6'>
                <div>
                  <p>Centroid Coordinates:</p>
                  <ul>
                    <li>Lat: {selectedImage.centroid_coordinates.lat}</li>
                    <li>lon: {selectedImage.centroid_coordinates.lon}</li>
                  </ul>
                </div>
              
                <div>
                  <p>DSCOV-J2000 Position:</p>
                    <ul>
                      <li>X: {selectedImage.dscovr_j2000_position.x}</li>
                      <li>Y: {selectedImage.dscovr_j2000_position.y}</li>
                      <li>Z: {selectedImage.dscovr_j2000_position.z}</li>
                    </ul>
                </div>
              
              </div>
              <div className='grid grid-cols-2 gap-4 mb-6'>
              <div>
                  <p>Lunar J2000 Position:</p>
                    <ul>
                      <li>X: {selectedImage.lunar_j2000_position.x}</li>
                      <li>Y: {selectedImage.lunar_j2000_position.y}</li>
                      <li>Z: {selectedImage.lunar_j2000_position.z}</li>
                    </ul>
                </div>
              
                <div>
                  <p>Sun J2000 Position:</p>
                    <ul>
                      <li>X: {selectedImage.sun_j2000_position.x}</li>
                      <li>Y: {selectedImage.sun_j2000_position.y}</li>
                      <li>Z: {selectedImage.sun_j2000_position.z}</li>
                    </ul>
                </div>
              </div>
                
              

              <p>Sun J2000 Position:</p>
              <ul>
                  <li>Q1: {selectedImage.attitude_quaternions.q0}</li>
                  <li>Q2: {selectedImage.attitude_quaternions.q1}</li>
                  <li>Q3: {selectedImage.attitude_quaternions.q2}</li>
                  <li>Q4: {selectedImage.attitude_quaternions.q3}</li>
              </ul>
              {selectedImage.date && (
                        <div className="px-4 mt-1 text-right text-sm font-normal text-gray-500">
                          <p> {new Date(selectedImage.date).toLocaleDateString()}</p>
                          <p> {new Date(selectedImage.date).toLocaleTimeString()}</p>
                        </div>
              )}
              {/* Add more image details here */}
              <button onClick={closePopup} className="mt-4 border rounded-2xl border-red-600 bg-red-600 hover:bg-red-400 hover:border-red-400 text-white px-4 py-1 leading-6 focus:outline-none">Close</button>
            </div>
          </Dialog.Panel>
        </Dialog>
      )}

        {/* Footer */}
        <Footer navigation2={navigation2} />
        </div>
    );
};

export default EpicImagesPage;
