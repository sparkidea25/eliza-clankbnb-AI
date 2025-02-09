import { ActionExample } from "@elizaos/core";

export const getContentExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "I want to read latest crypto news",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me fetch crypto recent news",
                action: "GET_LISTINGS",
            },
        }
    ],
]


// to-do: add search by Location