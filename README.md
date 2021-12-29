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
**URI** `/topic/:topic`

#### Subscribe to a topic
**URI** `/subscribe/:topic` **request body**
`{url:"http://localhost:9000/test1"}`

#### Publish a topic
 **URI** `/publish/:topic` **request body**
`{message:"New Message"}`

*call these endpoint above on port 8000*
