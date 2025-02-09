import {
    elizaLogger,
    Action,
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    State,
} from "@elizaos/core";
import { addListingExample } from "../examples";
import { propertyListingService } from "../services";
import { addListing } from "../types";

export const addListingAction: Action = {
    name: "ADD_LISTING",
    similes: [
        "CLANKBNB",
        "LISTINGS",
        "RENTAL"
    ],
    description: "get a random listing",
    validate: async (runtime: IAgentRuntime) => {
        await runtime;
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {
        const listingService = propertyListingService();

        try {
            // const property = message.content || state.property
            // console.log(property, 'property')
            // const listing = listingService.addListing(property)
            // Define the expected type for property
            // interface Property {
            //     title: string;
            //     slug: string;
            //     description: string;
            //     houseType: string;
            //     address: string;
            //     bedrooms: number;
            //     bathrooms: number;
            //     price: number;
            //     // Add other required properties here
            // }

            // Extract property from message or state
            const property = message.content || state.property;

            // Validate the property object
            if (property && typeof property === 'object' && 'title' in property && 'slug' in property) {
                const listing = listingService.addListing(property as addListing);
                console.log(listing, 'listing');
                // Optionally, store the listing in memory
                // message.content = listing;
                elizaLogger.success(
                    `Successfully listed apartment`
                );
                if (callback) {
                    callback({
                        text: `${property.title} is sucessfully listed on clankBnb`
                    });
                    return true;
                }
            } else {
                throw new Error('Invalid property object');
            }

        } catch(error: any) {
            elizaLogger.error("Error in clankBnb plugin", error);
            callback({
                text: `Error adding clankBnb listing: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },
    examples: addListingExample as ActionExample[][],
} as Action