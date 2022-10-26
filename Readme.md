
IMPORTANT NOTES: 

I would be remiss if I did not preface my project with this disclamier: 
        I struggled heavily with this project. For the life of me I could not find a way to link my front-end to my back-end. 
        I have to highlight Yareline and Isaac from the PR group who guided me essentially line-by-line to get to something that sort-of worked. They also provided some articles/videos that helped greatly. Without them, I would not have anything at all to submit. 

        Important link for learning my code: 
        https://medium.com/@atingenkay/creating-a-todo-app-with-node-js-express-8fa51f39b16f




 VIEW ENGINE ~ "A view engine translates a server-side template into HTML markup and renders it in the web browser when triggered by a controller's action method."; Essentially, it helps render server-side data in a more digestable format for the browser by creating a html template in plain javascript. This allows me to connect my back-end to my front-end (and it only took me 5 task trackers to learn this).Relates to the "html" page in the views folder. 

 Express.static ~ is a middleware. Static, speaks to imgs and javascript. 
 Body-parser ~ It parses the form sent into the server before the it gets to the handler. Allow me to pinpoint info I want. "extended: true" allows all the items sent back are not just strings. 


ROUTE LOGIC: 

Most of my routes have the same logic roadmap:  
    1) Targets specific values, using the .find and .indexOf methods. 
        Sinse JSON operates like an array, we can use these methods and others (i.e. .push, .splice) to manipulate the JSON data.
        Body-parser helps A LOT at targetting this data because it parses the data before it gets to the handler.  
    
    2) Some sort of validation. For the /addtask route, it validates    whether it has a blank "". For the /deltask and the /edittaks routes, it verifies that the task selected has an accompanying Id, and that that Id exists inside the JSON array. 

    3) Takes that new value and converts it to a string and pushes it into the JSON file. If its the /delTask route, it will delete it from the JSON with the .splice method. 

    4) Finally, all the routes redirects the server to the root "/" where the saved tasks in the JSON are being displayed. 


