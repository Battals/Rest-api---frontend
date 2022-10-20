var URL = "http://127.0.0.1:5500/index.html";

function pushData() {
  var myArr = [];
  //get value from the input text
  var inputText = document.getElementById("name").value;
  var inputText1 = document.getElementById("quantity").value;
  var inputText2 = document.getElementById("price").value;

  //Append data to the array

  myArr.push(inputText, inputText1, inputText2);

  var pval = "";

  for (i = 0; i < myArr.length; i++) {
    pval = pval + myArr[i];
  }

  // display array data
  document.getElementById("pText").innerHTML = "Succes";

  const toSend = {
    name: myArr[0],
    quantity: myArr[1],
    price: myArr[2],
  };

  const jsonObject = JSON.stringify(toSend);
  

  const xhr = new XMLHttpRequest();

  xhr.open("POST", "http://localhost:9191/addProduct");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(jsonObject);
}

function getProducts() {
  var inputText3 = document.getElementById("findById").value;
  const textField = document.getElementById("box");

  fetch("http://localhost:9191/productById/" + inputText3)
    .then((res) => res.json())
    .then((data) => (textField.innerHTML = JSON.stringify(data)))
    .catch((error) => (textField.innerHTML = "Product not found"));
}

function deleteProduct() {
  var inputText4 = document.getElementById("deleteById").value;
  var textField1 = document.getElementById("box1");

  fetch("http://localhost:9191/delete/" + inputText4, {
    method: "DELETE",
  });
  window.location.href = URL;
  textField1.innerHTML = "Product with ID: " + inputText4 + " " + "was removed";
}

function getAllProducts() {
  fetch("http://localhost:9191/products")
    .then(function (resp) {
      return resp.json();
    })

    .then((product) => {

      let html = "";

      product.forEach((product) => {
        html += `


        <tbody>

        <tr>

          <td>${product.id} </td>

          <td>${product.name}</td>

          
          <td>${product.quantity} </td>

          <td>${product.price} </td>

                  </tr>
                  </tbody>`;

      });

      document.querySelector(".activityData").innerHTML = html;
    });
}

function popUp() {
  var popup = document.getElementById("myPopup");
  popup.style.display = "grid";
}

async function updateProduct() {
  popUp();

  const object = document.getElementById("updateById");
  const response = await fetch(
    "http://localhost:9191/productById/" + object.value
  );
  const data = await response.json();
  
  document.getElementById("name1").placeholder = data.name;
  document.getElementById("quantity1").placeholder = data.quantity;
  document.getElementById("price1").placeholder = data.price;
}
