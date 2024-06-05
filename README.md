
### LLM UI State Management

## Introduction

This project is a prototype that explores how a large language model (LLM) can interact with the client-side state of an application. This approach aims to integrate the rich interactivity of traditional web interfaces with the intelligent capabilities of LLMs.

## Problem Statement

This project addresses several key issues:

* **Text-Heavy Chat Experiences**: Purely chat-based interfaces often become too text-heavy, which can overwhelm users. Traditional web interfaces with rich components and interactivity are still valuable and shouldn’t be discarded.
* **Challenges in Traditional Apps**: Traditional applications face challenges such as complex information architecture and poor discoverability, especially for first-time users. LLMs can help mitigate these issues by enhancing user guidance and navigation.
This project addresses several key issues:

* **Text-Heavy Chat Experiences**: Purely chat-based interfaces often become too text-heavy, which can overwhelm users. Traditional web interfaces with rich components and interactivity are still valuable and shouldn’t be discarded.
* **Challenges in Traditional Apps**: Traditional applications face challenges such as complex information architecture and poor discoverability, especially for first-time users. LLMs can help mitigate these issues by enhancing user guidance and navigation.
* **Collaborative Interaction with AI**: LLMs can sometimes hallucinate, providing inaccurate or unexpected responses. Users often prefer to collaborate with AI rather than outsourcing all decision-making. This project aims to facilitate such collaboration, allowing users to leverage AI assistance while maintaining control over their interactions.
* **Integration of LLMs and UI Actions**: By providing LLMs with custom tools that correspond to frontend actions, we can enable the LLM to dispatch actions that change the state of the UI, thus marrying the benefits of both chat and traditional interfaces.

## Prototype Example:

This prototype is a typical todo app. It uses `useReducer` to manage application state and has actions that can be dispatched. These actions are also provided to the OpenAI assistant.

Current Implementation Issues

* **Function Call Responses**: Currently, the system responds with ‘success’ to all function calls, which may not always be accurate. There is a possibility of hallucinated responses from the LLM that could lead to erroneous function executions.
* **Performance**: The system can be slow at times. This may improve in the future as LLM inference capabilities advance, potentially allowing for on-device processing.