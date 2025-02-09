import { ActionExample } from "@elizaos/core";

export const getListingExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "I want to book an apartment?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me fetch our listings",
                action: "GET_LISTINGS",
            },
        }
    ],
]

export const addListingExample: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "I want to post my apartment"
            }
        },
        {
            user: "{{agent}}",
            content: {
                text: "Great! Let's get started. Please provide the title of your listing."
            }
        },
        {
            user: "{{user1}}",
            content: {
                text: "{{user_input_title}}"
            }
        },
        {
            user: "{{agent}}",
            content: {
                text: "Got it! Now, can you describe your apartment?"
            }
        },
        {
            user: "{{user1}}",
            content: {
                text: "{{user_input_description}}"
            }
        },
        {
            user: "{{agent}}",
            content: {
                text: "Awesome! What type of property is it? (e.g., Apartment, House, Studio, etc.)"
            }
        },
        {
            user: "{{user1}}",
            content: {
                text: "{{user_input_type}}"
            }
        },
        {
            user: "{{agent}}",
            content: {
                text: "Where is it located?"
            }
        },
        {
            user: "{{user1}}",
            content: {
                text: "{{user_input_location}}"
            }
        },
        {
            user: "{{agent}}",
            content: {
                text: "Nice! What is the area size (in sq ft or sqm)?"
            }
        },
        {
            user: "{{user1}}",
            content: {
                text: "{{user_input_area}}"
            }
        },
        {
            user: "{{agent}}",
            content: {
                text: "What is the price per night (or per month)?"
            }
        },
        {
            user: "{{user1}}",
            content: {
                text: "{{user_input_price}}"
            }
        },
        {
            user: "{{agent}}",
            content: {
                text: "How many bedrooms does it have?"
            }
        },
        {
            user: "{{user1}}",
            content: {
                text: "{{user_input_bedroom}}"
            }
        },
        {
            user: "{{agent}}",
            content: {
                text: "And how many bathrooms?"
            }
        },
        {
            user: "{{user1}}",
            content: {
                text: "{{user_input_bathroom}}"
            }
        },
        {
            user: "{{agent}}",
            content: {
                text: "How many guests can it accommodate?"
            }
        },
        {
            user: "{{user1}}",
            content: {
                text: "{{user_input_guest}}"
            }
        },
        {
            user: "{{agent}}",
            content: {
                text: "Great! List any features (e.g., WiFi, Pool, Parking, etc.)."
            }
        },
        {
            user: "{{user1}}",
            content: {
                text: "{{user_input_features}}"
            }
        },
        {
            user: "{{agent}}",
            content: {
                text: "Almost done! Please provide an image link for your listing."
            }
        },
        {
            user: "{{user1}}",
            content: {
                text: "{{user_input_image_link}}"
            }
        },
        {
            user: "{{agent}}",
            content: {
                text: "Awesome! Your listing is now complete. Would you like to post it now?",
                action: "ADD_LISTING",
                data: {
                    title: "{{user_input_title}}",
                    description: "{{user_input_description}}",
                    type: "{{user_input_type}}",
                    location: "{{user_input_location}}",
                    area: "{{user_input_area}}",
                    price: "{{user_input_price}}",
                    bedroom: "{{user_input_bedroom}}",
                    bathroom: "{{user_input_bathroom}}",
                    guest: "{{user_input_guest}}",
                    features: "{{user_input_features}}",
                    image: "{{user_input_image_link}}"
                }
            }
        }
    ]
]



// to-do: add search by Location