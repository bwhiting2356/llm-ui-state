## LLM UI State Management

### Introduction

This project is a prototype that explores how a large language model (LLM) can interact with the client-side state of an application. The goal is to integrate the rich interactivity of traditional web interfaces with the intelligent capabilities of LLMs.

### Problem Statement

This project attempts to address several issues with both traditional and chat interfaces:

* **Text-Heavy Chat Experiences**: Purely chat-based interfaces often become too dense with only text, overwhelming users. Traditional web interfaces with rich components and interactivity are still valuable and should not be discarded.
* **Feature Discoverability**: Traditional applications often face challenges such as complex information architecture and poor first time user experience, leading app designers to fall back to clunky tours to explain the app. LLMs can help mitigate these issues by enhancing user guidance and navigation.
* **Collaborative Interaction with AI**: LLMs can fall short by hallucinating inaccurate data, or by providing responses that are bland and lack a creative and fresh point of view. As a result, many users prefer to collaborate with AI rather than outsource all decision-making. This project aims to facilitate such collaboration, allowing users to leverage AI assistance while maintaining control over their interactions.
* **Integration of LLMs and UI Actions**: This prototype leverages the action-reducer state machine paradigm that has been common in web application development, and provides the same actions as functions (tools) to the LLM on the backend.

### Demo

![ezgif-4-1f8e1925fc](https://github.com/bwhiting2356/llm-ui-state/assets/16016903/0b3fdc9e-a4d4-445f-9141-abc547afd7f0)

Check out the deployed app [here](https://llm-ui-state.vercel.app/).

#### Front-end action example

```typescript
export const todoReducer: Reducer<TodoState, Action> = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        ...
        case 'batch_add_todos':
            return {
                ...state,
                todos: [...state.todos, ...payload.todos],
            };
        ...
    }
};
```
#### Back-end tool definition example 
(full assistant setup is shown [here](./assistant-definition.md))
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

### Current Issues

* **Function Call Responses**: Currently, the API endpoint responds to the assistant with ‘success’ to all  UI-related function calls, which may not always be accurate. There is a possibility of hallucinated responses from the LLM that could lead to errors, and the llm would not know about those errors.
* **Performance**: The system can be slow at times. This may improve in the future as LLM inference capabilities advance, potentially allowing for on-device processing.

### Future Thinking
The to-do app is a toy example where LLMs are probably not adding much value. But I can see it being much more helpful for a complex and intimiating application like AutoCAD, ProTools, or Adobe products.
