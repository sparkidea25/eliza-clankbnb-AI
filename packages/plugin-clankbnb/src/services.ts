// import {
//     APODResponse,
//     MarsRoverDataResponse
// } from "./types";

import { getListing } from "./types";

const BASE_URL = "https://clankbnb.onrender.com/api/v1/listing"
// "https://api.nasa.gov/planetary/apod\?api_key\=";

export const propertyListingService = () => {


    const getListing = async (): Promise<getListing> => {
        try {
            const data = await fetchListing();
            return data;
        } catch (error: any) {
            console.error("listing data:", error.message);
            throw error;
        }
    }

    return { getListing };
};

async function fetchListing(attempts= 0, maxAttempts = 10) {

    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();

        const returnObj = {
           title: data.title,
           description: data.description,
           houseType: data.houseType,
           location: data.location,
           area: data.area,
           price: data.price,
           guest: data.guest,
           bedroom: data.bedroom,
           bathroom: data.bathroom,
           images: data.images[1].thumbnail,
           features: data.features[1].name
        };

        return returnObj;

    } catch(err) {
        console.log("error fetch clankbnb listings ...", err)

    }


}

async function fetchMarsPhotos(apiKey, attempts = 0, maxAttempts = 10) {
    try {
        const curiosityCameras = [
            'FHAZ',
            'RHAZ',
            'MAST',
            'CHEMCAM',
            'MAHLI',
            'MARDI',
            'NAVCAM'
        ]
        const opportunityCameras = [
            'FHAZ',
            'RHAZ',
            'PANCAM',
            'MINITES'
        ]

        const CURIOUSITY_MAX_SOL = 3400
        const OPPORTUNITY_MAX_SOL = 4500

        const rovers = {
          curiosity: {
            cameras: curiosityCameras,
            maxSol: CURIOUSITY_MAX_SOL
          },
        //   opportunity: {
        //     cameras: opportunityCameras,
        //     maxSol: OPPORTUNITY_MAX_SOL
        //   },
        }

         // Select a random rover
         const roverNames = Object.keys(rovers);
         const randomRover = roverNames[Math.floor(Math.random() * roverNames.length)];
         const selectedRover = rovers[randomRover as keyof typeof rovers];

         // Get random camera for selected rover
         const randomCamera = selectedRover.cameras[Math.floor(Math.random() * selectedRover.cameras.length)];

         // Get random sol (Martian day) within rover's max
         const randomSol = Math.floor(Math.random() * selectedRover.maxSol) + 1;

         const requestURL = `https://api.nasa.gov/mars-photos/api/v1/rovers/${randomRover}/photos?sol=${randomSol}&camera=${randomCamera}&api_key=${apiKey}`
         console.log('requestURL::::::: ', requestURL)
         const response = await fetch(requestURL);
         const data = await response.json();

         if (data.photos.length) {
            const returnObj = {
                photo: data.photos[0].img_src,
                sol: randomSol,
                camera: randomCamera,
                rover: randomRover
            }
            return returnObj
        } else if (attempts < maxAttempts) {
            return fetchMarsPhotos(apiKey, attempts + 1, maxAttempts)
        } else {
            throw new Error('No photos found after maximum attempts')
        }
    } catch (err) {
        console.log("error fetch mar rover photos ...", err)
    }
}