# Pangaea
HTTP notification system.
This application is written in node and uses mysql as data storage.
# Installing Dependencies
cd into project root directory <br>
`npm install`
# Configure database
* Enter database credentials in the ".env.example" file and **SAVE AS** ".env"
# Run servers
* On one terminal run:<br>
`npm run publisher`
* On the other terminal run:<br>
`npm run subscriber`

The publisher server will run on port 8000, while subscriber server will run on port 9000
# Endpoints
*call these endpoint below on port 8000*
### TO ADD A TOPIC
**URI** `/topic/:topic`

### TO SUBSCRIBE TO A TOPIC
**URI** `/subscribe/:topic` **request body**
`{url:"http://localhost:9000/test1"}`

### TO PUBLISH A TOPIC
 **URI** `/publish/:topic` **request body**
`{message:"New Message"}`


