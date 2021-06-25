# WinCast
WinCast is an application for visualizing the historical forecasts of the weather conditions in Winnipeg, Manitoba.

The application is split into three main parts:
1. [The FrontEnd] An Angular web application that queries the rest API backend server by date and displays the data that returns from the server call
2. [The BackEnd] a Node-Express server which connects to a PostgreSQL database server and services the client-side requests.
3. [The Database Engine](https://github.com/udacity/cloud-developer/tree/master/course-02/project/image-filter-starter-code) A local PostgreSQl instances that stores the weather forecasts.

