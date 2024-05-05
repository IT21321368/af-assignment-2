import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import Footer, { navigation2 }  from '../components/footer';

const apiKey = process.env.REACT_APP_NASA_KEY;

const MarsRoverPhotosPage = () => {
    const [roverPhotos, setRoverPhotos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [cameraName, setCameraName] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [hoveredImage, setHoveredImage] = useState(null);


    useEffect(() => {
        fetchRoverPhotos();
    }, [currentPage, cameraName]);

    const fetchRoverPhotos = async () => {
        try {
            let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=${currentPage}&per_page=24&api_key=${apiKey}`;
            if (cameraName) {
                url += `&camera=${cameraName}`;
            }
            const response = await fetch(url);
            const data = await response.json();
            setRoverPhotos(data.photos);
        } catch (error) {
            console.error('Error fetching Mars Rover photos:', error);
        }
    };

    const handleCameraChange = (event) => {
        setCameraName(event.target.value);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(Math.max(currentPage - 1, 1));
    };

    return (
    <div className="">
      {/* Header */}
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />


        <div className="relative isolate overflow-hidden pt-32">
            <h1 className="text-4xl font-bold mb-6 ml-8">Mars Rover Photos</h1>
            <div className='mb-6 ml-8'>
                <label htmlFor="camera" className="mr-2 font-mono ">Filter by Camera :</label>
                <select
                    id="camera"
                    value={cameraName}
                    onChange={handleCameraChange}
                    className="px-2 py-1 rounded-lg bg-gray-100 focus:outline-none"
                >
                    <option value="">All Cameras</option>
                    <option value="FHAZ">Front Hazard Avoidance Camera</option>
                    <option value="RHAZ">Rear Hazard Avoidance Camera</option>
                    <option value="MAST">Mast Camera</option>
                    <option value="CHEMCAM">Chemistry and Camera Complex</option>
                    <option value="MAHLI">Mars Hand Lens Imager</option>
                    <option value="MARDI">Mars Descent Imager</option>
                    <option value="NAVCAM">Navigation Camera</option>
                    <option value="PANCAM">Panoramic Camera</option>
                    <option value="MINITES">Mini-TES</option>
                    
                </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-8 my-10">
    {roverPhotos.map(photo => (
        <div key={photo.id} className="relative">
            <div
                className="absolute inset-0 bg-gray-900 bg-opacity-75 opacity-0 transition-opacity duration-300 hover:opacity-100"
                onMouseEnter={() => setHoveredImage(photo)}
                onMouseLeave={() => setHoveredImage(null)}
            >
                <div className="absolute bottom-0 left-0 p-2 text-white">
                <p className="text-white font-mono mb-2">Camera: {photo.camera.full_name}</p>
                <p className="text-white font-mono mb-2">Date: {photo.earth_date}</p>
                <p className="text-white font-mono mb-2">Rover: {photo.rover.name}</p>
                <p className="text-white font-mono mb-2">Landing date on Mars: {photo.rover.landing_date}</p>
                <p className="text-white font-mono mb-2">Launch date from Earth: {photo.rover.launch_date}</p>
                <p className="text-white font-mono mb-2">Rover's mission status: {photo.rover.status}</p>
                </div>
            </div>
            <img
                src={photo.img_src}
                alt={`Mars Rover Photo ${photo.id}`}
                className="w-full h-auto"
            />
        </div>
    ))}
</div>
            <div className="my-4 mr-4 text-center">
                <button onClick={handlePrevPage} disabled={currentPage === 1} className="px-4 py-2 mr-2 bg-gray-200 rounded-lg focus:outline-none">Previous Page</button>
                <button onClick={handleNextPage} className="px-4 py-2 bg-gray-200 rounded-lg focus:outline-none">Next Page</button>
            </div>
        </div>

        {/* Footer */}
        <Footer navigation2={navigation2} />
         
      </div>
    );
};

export default MarsRoverPhotosPage;
