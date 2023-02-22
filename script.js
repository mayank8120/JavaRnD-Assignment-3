let tableData = [];


let currentID = "";


// ID variables

var root = document.getElementById("root");

var submitButton = document.querySelector("#submitButton");

var paymentType = document.querySelector("#paymentType");
var friendName = document.querySelector("#friendName");
var nameInp = document.querySelector("#nameInp");
var dateInp = document.querySelector("#inpdate");
var currency = document.querySelector("#currency");
var amount = document.querySelector("#amount");


var filterCurrency = document.querySelector("#currencyFilter");
var filterFriend = document.querySelector("#friendNameFilter");


var typeError = document.querySelector("#typeError");
var friendError = document.querySelector("#friendError");
var nameError = document.querySelector("#nameError");
var dateError = document.querySelector("#dateError");
var currencyError = document.querySelector("#currencyError");
var amountError = document.querySelector("#amoutError");



function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}




filterCurrency.addEventListener('change', function () {



    addDataToTable("", filterCurrency.value);


    // console.log(filterCurrency.value);
})


filterFriend.addEventListener('change', function () {



    addDataToTable(filterFriend.value, "");


    // console.log(filterCurrency.value);
})







function editFromList(id) {

    currentID = id;

    var paymentType = document.querySelector("#paymentType");
    var friendName = document.querySelector("#friendName");
    var nameInp = document.querySelector("#nameInp");
    var dateInp = document.querySelector("#inpdate");
    var currency = document.querySelector("#currency");
    var amount = document.querySelector("#amount");

    let thisData = findThisItemAndSave(id);

    paymentType.value = thisData.type;
    friendName.value = thisData.friend;
    nameInp.value = thisData.name;
    dateInp.value = thisData.date;
    currency.value = thisData.currency;
    amount.value = thisData.amount;
    var submitButton = document.querySelector("#submitButton");
    submitButton.innerHTML = "Edit";

}


function emptyForm() {
    var paymentType = document.querySelector("#paymentType");
    var friendName = document.querySelector("#friendName");
    var nameInp = document.querySelector("#nameInp");
    var dateInp = document.querySelector("#inpdate");
    var currency = document.querySelector("#currency");
    var amount = document.querySelector("#amount");
    paymentType.value = "";
    friendName.value = "";
    nameInp.value = "";
    dateInp.value = "";
    currency.value = "";
    amount.value = "";
}
function deleteFromList(id) {
    let newTable = tableData.filter((item) => item.id !== id);
    tableData = newTable;
    addDataToTable();
    if (tableData.length == 0) {
        let noData = ` <tr class=" border-b dark:bg-gray-800 dark:border-gray-700">
    <th scope="row"
        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        No Data
    </th>
</tr>`;
        tableBody.innerHTML = noData;
    }


}
submitButton.addEventListener('click', function () {

    let error = checkForErrorAndShowError();

    if (error == false) {
        const uuid = uuidv4();
        let data = {};
        if (currentID == "") {

            var selectedpaymentType = paymentType.value;
            var selectedfriendName = friendName.value;
            var selectednameInp = nameInp.value;
            var selecteddateInp = dateInp.value;
            var selectedcurrency = currency.value;
            var selectedamount = amount.value;

            data = {
                id: uuid,
                type: selectedpaymentType,
                currency: selectedcurrency,
                friend: selectedfriendName,
                name: selectednameInp,
                date: selecteddateInp,
                amount: selectedamount
            }
            emptyForm();
        } else {

            var selectedpaymentType = paymentType.value;
            var selectedfriendName = friendName.value;
            var selectednameInp = nameInp.value;
            var selecteddateInp = dateInp.value;
            var selectedcurrency = currency.value;
            var selectedamount = amount.value;
            let newTable = tableData.filter((item) => item.id !== currentID);
            tableData = newTable;
            data = {
                id: currentID,
                type: selectedpaymentType,
                currency: selectedcurrency,
                friend: selectedfriendName,
                name: selectednameInp,
                date: selecteddateInp,
                amount: selectedamount
            }
            emptyForm();
        }






        tableData.push(data);
        addDataToTable();
        currentID = "";



        var submitButton = document.querySelector("#submitButton");

        submitButton.innerHTML = "Add a new Expense";
    }
});

function findThisItemAndSave(currentID) {

    let editObject = tableData.filter((item) => item.id === currentID);
    // setFormData(editObject[0]);

    return editObject[0];

}


function addDataToTable(friend, currency) {
    var tableBody = document.querySelector("#tableBody");
    tableBody.innerHTML = '';
    let tableRows = "";


    console.log(friend, currency, "OPOP");



    if (tableData.length > 0) {


        tableData.filter((item) =>
            friend == "" || friend == undefined ? true :
                item.friend == friend
        ).filter((item) =>
            currency == "" || currency == undefined ? true :
                item.currency == currency
        ).map((item) => {

            let tableROw =

                ` <tr class="blk border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row"
                    class="px-6 py-4 blk font-medium text-black-900 whitespace-nowrap dark:text-white">
                    ${item.type}
                </th>
                <td class="px-6  blk py-4">
                    ${item.name}
                </td>
                <td class="px-6 blk py-4">
                    ${item.friend}
                </td>
                <td class="px-6 blk py-4">
                    ${item.date}
                </td>
                <td class="px-6 blk py-4">
                    ${item.amount}
                </td>
                <td class="px-6 blk py-4 crsr" onclick='editFromList("${item.id}")'>
                    Edit
                </td>
                <td class="px-6 blk py-4 crsr" onclick='deleteFromList("${item.id}")'>
                    Delete
                </td>
            </tr>`
            tableRows += tableROw;
        });

    }
    tableBody.innerHTML = tableRows;
}



function isItNull(str) {
    if (str == null || str == undefined || str == "" || str == " " || str.length == 0)
        return true;
    else
        return false;
}

function checkForErrorAndShowError() {



    var flag = false;

    var selectedpaymentType = paymentType.value;
    var selectedfriendName = friendName.value;
    var selectednameInp = nameInp.value;
    var selecteddateInp = dateInp.value;
    var selectedcurrency = currency.value;
    var selectedamount = amount.value;

    if (isItNull(selectedpaymentType)) {
        typeError.innerHTML = "Please Select Type";
        typeError.style.display = 'block';
        flag = true;
    } else {
        typeError.innerHTML = "";
        typeError.style.display = 'none';
    }


    if (isItNull(selectedfriendName)) {
        friendError.innerHTML = "Please Select Friend";
        friendError.style.display = 'block';
        flag = true;
    } else {
        friendError.innerHTML = "";
        friendError.style.display = 'none';
    }

    if (isItNull(selectednameInp)) {
        nameError.innerHTML = "Please Enter Name";
        nameError.style.display = 'block';
        flag = true;
    } else {
        nameError.innerHTML = "";
        nameError.style.display = 'none';
    }


    if (isItNull(selecteddateInp)) {
        dateError.innerHTML = "Please Enter Date";
        dateError.style.display = 'block';
        flag = true;
    } else {
        dateError.innerHTML = "";
        dateError.style.display = 'none';
    }

    if (isItNull(selectedcurrency)) {
        currencyError.innerHTML = "Please Select Currency";
        currencyError.style.display = 'block';
        flag = true;
    } else {
        currencyError.innerHTML = "";
        currencyError.style.display = 'none';
    }



    if (isItNull(selectedamount)) {
        amountError.innerHTML = "Please add amount";
        amountError.style.display = 'block';
        flag = true;
    } else {
        amountError.innerHTML = "";
        amountError.style.display = 'none';
    }


    return flag;

}

