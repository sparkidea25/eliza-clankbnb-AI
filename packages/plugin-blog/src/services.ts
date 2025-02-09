// import {
//     APODResponse,
//     MarsRoverDataResponse
// } from "./types";

import { getContent } from "./types";

// import { getListing } from "./types";

const BASE_URL = "https://fetchrss.com/rss/67a62835126e19782b0d3dc267a62a6606781260ae01f152.xml"
// "https://api.nasa.gov/planetary/apod\?api_key\=";

export const contentService = () => {


    const getContent = async (): Promise<getContent> => {
        try {
            const data = await fetchContent();
            return data;
        } catch (error: any) {
            console.error("listing data:", error.message);
            throw error;
        }
    }

    return { getContent };
};

async function fetchContent(attempts= 0, maxAttempts = 10) {

    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();

        return data;

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