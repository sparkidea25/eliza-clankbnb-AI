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


// to-do: add search by Location