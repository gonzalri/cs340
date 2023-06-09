// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('/public'))
PORT = 5568;                 // Set a port number at the top so it's easy to change in the future
// Database
var db = require('./database/db-connector')


const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
/*
    ROUTES
*/
app.get('/', function(req, res){
    res.render('index');
  });


app.get('/customers', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        let query1 = "SELECT * FROM Customers;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('customers', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })      
    });                                         



app.post('/add-customer-form', function(req, res){
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        // Capture NULL values
        /*
        let homeworld = parseInt(data['input-homeworld']);
        if (isNaN(homeworld))
        {
            homeworld = 'NULL'
        }
    
        let age = parseInt(data['input-age']);
        if (isNaN(age))
        {
            age = 'NULL'
        }
        */
        // Create the query and run it on the database
        query1 = `INSERT INTO Customers (customerFirstName, customerLastName, customerEmail, customerStreetAddress, 
            customerCity, customerZipcode, customerState, customerPhone) 
            VALUES ('${data['input-customerFirstName']}', '${data['input-customerLastName']}', '${data['input-customerEmail']}', '${data['input-customerStreetAddress']}', '${data['input-customerCity']}', '${data['input-customerZipcode']}', '${data['input-customerState']}', '${data['input-customerPhone']}')`;
        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
    
            // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
            // presents it on the screen
            else
            {
                res.redirect('/');
            }
        })
    })

app.delete('/delete-customer-ajax/', function(req,res,next){
        let data = req.body;
        let customerID = parseInt(data.id);
        let deleteCustomers = `DELETE FROM Customers WHERE customerID = ${customerID}`;
      
              db.pool.query(deleteCustomers, [customerID], function(error, rows, fields){
                  if (error) {
                  console.log(error);
                  res.sendStatus(400);
                  }
                  else
                  {
                    res.sendStatus(204);
                  }
              })
      });






app.put("/put-customer-ajax", function (req, res) {
    let requestData = req.body;
    let customerID = parseInt(requestData.customerID);
      
    updateCustomerAddress(requestData.customerStreetAddress, customerID, function (error, rows) {
          if (error) {
            console.log(error);
            res.sendStatus(400);
          } else {
            res.send(rows);
          }
        });
      });
      
function updateCustomerAddress(address, customerID, callback) {
    let updateAddressQuery = `UPDATE Customers SET customerStreetAddress = ? WHERE customerID = ?`;
    db.pool.query(updateAddressQuery, [address, customerID], callback);
      }
/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

