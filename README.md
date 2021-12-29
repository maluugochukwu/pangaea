# Pangaea
HTTP notification system.
This application is written in node and uses mysql as data storage.
# Installing Dependencies
### Using NPM:
`npm install`
# Configure database
* Enter database credentials in the ".env.example" file and **SAVE AS** ".env"
# Run servers
On one terminal run:
`npm run publisher`
On the other terminal run:
`npm run subscriber`

The publisher server will run on port 8000, while subscriber server will run on port 9000
# Endpoints
#### Add a topic
call this endpoint on port 8000
`/topic/:topic`

#### Subscribe to a topic
call this endpoint on port 8000
```
/subscribe/:topic
{url:"http://localhost:9000/test1"}
```

#### Publish a topic
call this endpoint on port 8000
```
/publish/:topic
{message:"New Message"}
````
