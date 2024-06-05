## Assistant Set-Up

This project uses and OpenAI assistant defined in the [playground](https://platform.openai.com/playground/assistants)

Instructions:
```
You are a helpful assistant that helps a user with an app where they can manage todos. You can help the user understand what the application can do, and you can perform actions on their behalf when they seem to be asking for it.  If you call a function, it will correspond to a reducer action on the front end to modify UI state. You also have access to a function query_ui_state that allows you to see the current application state. Please query this frequently so you understand the context. 
```

Model: `gpt-4o`

Functions: 
```
[
   {
      "name":"set_group_by",
      "description":"Change how tasks are grouped into columns in the view",
      "parameters":{
         "type":"object",
         "properties":{
            "groupBy":{
               "type":"string",
               "enum":[
                  "status",
                  "assigned"
               ],
               "description":"The field to group tasks by"
            }
         },
         "required":[
            "groupBy"
         ]
      }
   },
   {
      "name":"query_ui_state",
      "description":"Query the application state of the ToDo app",
      "parameters":{
         "type":"object",
         "properties":{
            "query":{
               "type":"string",
               "description":"The query about the application state"
            },
            "state":{
               "type":"object",
               "description":"The current application state"
            }
         },
         "required":[
            "query",
            "state"
         ]
      }
   },
   {
      "name":"generate_uuid",
      "description":"Generate a new UUID",
      "parameters":{
         "type":"object",
         "properties":{
            
         },
         "required":[
            
         ]
      }
   },
   {
      "name":"batch_edit_todos",
      "description":"Edit multiple existing todo items with partial updates",
      "parameters":{
         "type":"object",
         "properties":{
            "todos":{
               "type":"array",
               "description":"An array of todos to be edited",
               "items":{
                  "type":"object",
                  "properties":{
                     "id":{
                        "type":"string",
                        "description":"The unique identifier (UUID) of the todo item to be edited. If the caller does not know the UUID, they should look it up in the UI application status."
                     },
                     "todo":{
                        "type":"object",
                        "properties":{
                           "text":{
                              "type":"string",
                              "description":"The updated text or description of the todo item"
                           },
                           "status":{
                              "type":"string",
                              "enum":[
                                 "backlog",
                                 "to do",
                                 "in progress",
                                 "in review",
                                 "blocked",
                                 "done"
                              ],
                              "description":"The updated status of the todo item, either 'backlog', 'to do', 'in progress', 'in review', 'blocked', or 'done'"
                           },
                           "assigned":{
                              "type":"string",
                              "description":"The updated person assigned to the todo item"
                           }
                        }
                     }
                  },
                  "required":[
                     "id",
                     "todo"
                  ]
               }
            }
         },
         "required":[
            "todos"
         ]
      }
   },
   {
      "name":"batch_add_todos",
      "description":"Add multiple new todo items to the list",
      "parameters":{
         "type":"object",
         "properties":{
            "todos":{
               "type":"array",
               "description":"An array of todos to be added",
               "items":{
                  "type":"object",
                  "properties":{
                     "id":{
                        "type":"string",
                        "description":"The unique identifier for the todo item"
                     },
                     "text":{
                        "type":"string",
                        "description":"The text or description of the todo item"
                     },
                     "status":{
                        "type":"string",
                        "enum":[
                           "backlog",
                           "to do",
                           "in progress",
                           "in review",
                           "blocked",
                           "done"
                        ],
                        "description":"The status of the todo item, either 'backlog', 'to do', 'in progress', 'in review', 'blocked', or 'done' (default to 'backlog' if you don't know)"
                     },
                     "assigned":{
                        "type":"string",
                        "description":"The person assigned to the todo item"
                     }
                  },
                  "required":[
                     "id",
                     "text",
                     "status",
                     "assigned"
                  ]
               }
            }
         },
         "required":[
            "todos"
         ]
      }
   },
   {
      "name":"batch_delete_todos",
      "description":"Delete multiple existing todo items",
      "parameters":{
         "type":"object",
         "properties":{
            "ids":{
               "type":"array",
               "description":"An array of unique identifiers (UUIDs) of the todo items to be deleted. If the caller does not know the UUIDs, they should look them up in the UI application state.",
               "items":{
                  "type":"string"
               }
            }
         },
         "required":[
            "ids"
         ]
      }
   }
]
```