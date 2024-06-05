
## LLM UI State Management

### Introduction

This project is a prototype that explores how a large language model (LLM) can interact with the client-side state of an application. This approach aims to integrate the rich interactivity of traditional web interfaces with the intelligent capabilities of LLMs.

### Problem Statement

This project addresses several key issues:

* **Text-Heavy Chat Experiences**: Purely chat-based interfaces often become too text-heavy, which can overwhelm users. Traditional web interfaces with rich components and interactivity are still valuable and shouldn’t be discarded.
* **Challenges in Traditional Apps**: Traditional applications face challenges such as complex information architecture and poor discoverability, especially for first-time users. LLMs can help mitigate these issues by enhancing user guidance and navigation.
This project addresses several key issues:

* **Text-Heavy Chat Experiences**: Purely chat-based interfaces often become too text-heavy, which can overwhelm users. Traditional web interfaces with rich components and interactivity are still valuable and shouldn’t be discarded.
* **Challenges in Traditional Apps**: Traditional applications face challenges such as complex information architecture and poor discoverability, especially for first-time users. LLMs can help mitigate these issues by enhancing user guidance and navigation.
* **Collaborative Interaction with AI**: LLMs can sometimes hallucinate, providing inaccurate or unexpected responses. Users often prefer to collaborate with AI rather than outsourcing all decision-making. This project aims to facilitate such collaboration, allowing users to leverage AI assistance while maintaining control over their interactions.
* **Integration of LLMs and UI Actions**: By providing LLMs with custom tools that correspond to frontend actions, we can enable the LLM to dispatch actions that change the state of the UI, thus marrying the benefits of both chat and traditional interfaces.

### Prototype Example:

This prototype is a typical todo app. It uses `useReducer` to manage application state and has actions that can be dispatched. These actions are also provided to the OpenAI assistant.

Demo:

![ezgif-4-1f8e1925fc](https://github.com/bwhiting2356/llm-ui-state/assets/16016903/0b3fdc9e-a4d4-445f-9141-abc547afd7f0)

Check out the deployed app [here](https://llm-ui-state.vercel.app/).

Front-end code example:
```
export const todoReducer: Reducer<TodoState, Action> = (state, action) => {
    const { type, payload } = action;
    switch (type) {
       ...
        case 'batch_add_todos':
            return {
                ...state,
                todos: [...state.todos, ...payload.todos],
            };
```

Back-end tool definition:
```
{
  "name": "batch_add_todos",
  "parameters": {
    "type": "object",
    "properties": {
      "todos": {
        "type": "array",
        "description": "An array of todos to be added",
        "items": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "The unique identifier for the todo item"
            },
            "text": {
              "type": "string",
              "description": "The text or description of the todo item"
            },
            "status": {
              "type": "string",
              "enum": [
                "backlog",
                "to do",
                "in progress",
                "in review",
                "blocked",
                "done"
              ],
              "description": "The status of the todo item, either 'backlog', 'to do', 'in progress', 'in review', 'blocked', or 'done' (default to 'backlog' if you don't know)"
            },
            "assigned": {
              "type": "string",
              "description": "The person assigned to the todo item"
            }
          },
          "required": [
            "id",
            "text",
            "status",
            "assigned"
          ]
        }
      }
    },
    "required": [
      "todos"
    ]
  },
  "description": "Add multiple new todo items to the list"
}
```

### Current Implementation Issues

* **Function Call Responses**: Currently, the API endpoint responds to the assistant with ‘success’ to all  UI-related function calls, which may not always be accurate. There is a possibility of hallucinated responses from the LLM that could lead to errors, and the llm would not know about those errors.
* **Performance**: The system can be slow at times. This may improve in the future as LLM inference capabilities advance, potentially allowing for on-device processing.
