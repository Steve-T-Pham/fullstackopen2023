```mermaid
sequenceDiagram
    partcipant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: GET https://studies.cs.helsinki.fi/exampleapp/notes
    deactivate server

    Note right of browser: Browser reloads 

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "Seeing what it looks like", "date": "2023-10-18T19:59:16.256Z" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```