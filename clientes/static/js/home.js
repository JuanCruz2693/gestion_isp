// Realizar la petición HTTP para obtener la cantidad total de clientes
fetch("http://127.0.0.1:5000/cardClientes")
    .then(response => response.json())
    .then(data => {
        document.getElementById("clientesTotal").innerText = data[0][0];
    })
    .catch(error => console.error(error));
