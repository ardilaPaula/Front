 //GET

function getDatosClient() {
    $.ajax({
        url: "http://129.151.124.136:8080/api/Client/all",
        type: "GET", //tipo de accion
        datatype: "JSON",
        success: function (respuesta) {
        console.log(respuesta);
        pintarRespuestaClient(respuesta);
        },
    });
}

function pintarRespuestaClient(items) {
    let myTable = "<table>"; //let es un tipo variable y crear tabla
    for (i = 0; i < items.length; i++) {
        myTable += "<tr> "; //crear fila
        myTable += "<td > " + items[i].idClient + "</td>"; // tabla room
        myTable += "<td > " + items[i].name + "</td>";
        myTable += "<td> " + items[i].email + "</td>";
        myTable += "<td> " + items[i].password + "</td>";
        myTable += "<td> " + items[i].age + "</td>";
        myTable +="<td> <button onclick='borrarClient(" + items[i].idClient + ")'>Borrar</button>";
        myTable +="<td><button onclick='obtenerItemEspecificoClient(" +items[i].idClient +")'>Cargar</button></td>";
        myTable += "</tr>"; //cerrar fila
    }
    myTable += "</table>"; //cerrar tabla
    $("#resultadoClient").append(myTable);
}

function guardarClient() {
    let myData = {
    
        name: $("#name").val(),
        email: $("#email").val(),
        password : $("#password").val(),
        age: $("#age").val(),
    };
    let dataToSend = JSON.stringify(myData);
    
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: dataToSend,
        
        url:"http://129.151.124.136:8080/api/Client/save",
    
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });

}

  //PUT

function editarClient() {
    let myData = {
        
        name: $("#name").val(),
        email: $("#email").val(),
        password : $("#password").val(),
        age: $("#age").val(),
    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.124.136:8080/api/Client/update",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
        $("#resultadoRoom").empty();
        $("#id_client").val("");
        $("#name").val("");
        $("#email").val("");
        $("#age").val("");
        
        alert("se ha actualizado");
        },
    });
}

  //DELETE

function borrarClient(idElemento) {
    let myData = {
        id: idElemento,
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.124.136:8080/api/Client/"+idElemento,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
        $("#resultadoClient").empty();
        getDatosClient();
        alert("Se ha Eliminado.");
        },
    });
}

function obtenerItemEspecificoClient(items) {
    console.log("---- obtenerItemEspecificoClient items:", items);
    $.ajax({
        dataType: "json",
        url: "http://129.151.124.136:8080/api/Client/" + items,
        type: "GET",
        success: function (response) {
        console.log("---- obtenerItemEspecificoclient", response);
        var item = response;
        
        $("#name").val(response.name);
        $("#email").val(response.email);
        $("#password").val(response.password);
        $("#age").val(response.age);
        },

        error: function (jqXHR, textStatus, errorThrown) {},
    });
}
