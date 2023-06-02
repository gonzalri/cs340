// Get the objects we need to modify
let addInventoryForm = document.getElementById('add-inventory-form');

// Modify the objects we need
addInventoryForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputVinylID = document.getElementById("input-vinylID");
    let inputInventoryQty = document.getElementById("input-inventoryQty");
   

    // Get the values from the form fields
    let vinylIDValue = inputVinylID.value;
    let inventoryQtyValue = inputInventoryQty.value;

    // Put our data we want to send in a javascript object
    let data = {
        vinylID: vinylIDValue,
        inventoryQty: inventoryQtyValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-inventory-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputVinylID.value = '';
            inputInventoryQty.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("customer-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let streetAddressCell = document.createElement("TD");
    let cityCell = document.createElement("TD");
    let zipcodeCell = document.createElement("TD");
    let stateCell = document.createElement("TD");
    let phoneCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.customerID;
    firstNameCell.innerText = newRow.customerFirstName;
    lastNameCell.innerText = newRow.customerLastName;
    emailCell.innerText = newRow.customerEmail;
    streetAddressCell.innerText = newRow.customerStreetAddress;
    cityCell.innerText = newRow.customerCity;
    zipcodeCell.innerText = newRow.customerZipcode;
    stateCell.innerText = newRow.customerState;
    phoneCell.innerText = newRow.customerPhone;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteCustomer(newRow.customerID);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(emailCell);
    row.appendChild(streetAddressCell);
    row.appendChild(cityCell);
    row.appendChild(zipcodeCell);
    row.appendChild(stateCell);
    row.appendChild(phoneCell);
    row.appendChild(deleteCell);
    
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.customerID);

    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.customerFirstName + ' ' +  newRow.customerLastName;
    option.value = newRow.customerID;
    selectMenu.add(option);
    // End of new step 8 code.
}
