import {
    elizaLogger,
    Action,
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    State,
} from "@elizaos/core";
// import { getListingExamples } from "../examples";
// import { propertyListingService } from "../services";
import { getContentExamples } from "../examples";
import { contentService } from "../services";
// import { validateNasaConfig } from "../environment";
// import { getMarsRoverExamples } from "../examples";
// import { createNASAService } from "../services";

export const getContentAction: Action = {
    name: "GET_NEWS",
    similes: [
        "CRYPTO_NEWS",
        "LATEST_NEWS",
        "BLOG_NEWS"
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
        const contentsService = contentService();

        try {
            const listingsData = await contentsService.getContent();
            elizaLogger.success(
                `Successfully fetched blog content`
            );
            if (callback) {
                callback({
                    text: `
                    Here is my blog title ${listingsData.title} with body ${listingsData.body}.
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
    examples: getContentExamples as ActionExample[][],
} as Action;
