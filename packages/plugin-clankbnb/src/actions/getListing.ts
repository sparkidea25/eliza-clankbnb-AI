import {
    elizaLogger,
    Action,
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    State,
} from "@elizaos/core";
import { getListingExamples } from "../examples";
import { propertyListingService } from "../services";
// import { validateNasaConfig } from "../environment";
// import { getMarsRoverExamples } from "../examples";
// import { createNASAService } from "../services";

export const getListingsAction: Action = {
    name: "CLANKBNB_GET_LISTINGS",
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

        // const config = await validateNasaConfig(runtime);
        const listingService = propertyListingService();

        try {
            const listingsData = await listingService.getListing();
            elizaLogger.success(
                `Successfully fetched clankBnb listing`
            );
            if (callback) {
                callback({
                    text: `
                    Here is my house title ${listingsData.title} with description ${listingsData.description} with area ${listingsData.area} details.

                    ${listingsData.images[1]}
                    `
                });
                return true;
            }
        } catch (error:any) {
            elizaLogger.error("Error in clankbnb plugin handler:", error);
            callback({
                text: `Error fetching clankbnb listing: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }
    },
    examples: getListingExamples as ActionExample[][],
} as Action;
