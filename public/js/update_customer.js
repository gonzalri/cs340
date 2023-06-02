let updateCustomerForm = document.getElementById('update-customer-form-ajax');

// Modify the objects we need
updateCustomerForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCustomerID = document.getElementById("mySelect");
    let inputStreetAddress = document.getElementById("input-streetaddress-update");

    // Get the values from the form fields
    let customerIDValue = inputCustomerID.value;
    let streetAddressValue = inputStreetAddress.value;

    // Put our data we want to send in a JavaScript object
    let data = {
        customerID: customerIDValue,
        customerStreetAddress: streetAddressValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {
                // Update the row data
                updateRow(xhttp.responseText, customerIDValue);
            } else {
                console.log("There was an error with the input.");
            }
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});

function updateRow(data, customerID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("customer-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == customerID){
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let td = updateRowIndex.getElementsByTagName("td")[3];

            td.innerHTML = parsedData[0].customerStreetAddress;
        }
    }
    window.location.reload();
}
