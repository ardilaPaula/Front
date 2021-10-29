 //GET

function getDatosMessage() {
    $.ajax({
        url: "http://129.151.124.136:8080/api/Message/all",
        type: "GET", //tipo de accion
        datatype: "JSON",
        success: function (respuesta) {
        console.log(respuesta);
        pintarRespuestaMessage(respuesta);
        },
    });
}

function pintarRespuestaMessage(items) {
    let myTable = "<table>"; //let es un tipo variable y crear tabla
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>"; //crear fila
        myTable += "<td>" + items[i].idMessage + "</td>"; // tabla room
        myTable += "<td>" + items[i].messageText + "</td>";
        myTable +="<td> <button onclick='borrarMessage(" + items[i].idMessage + ")'>Borrar</button>";
        myTable +="<td><button onclick='obtenerItemEspecificoMessage(" +items[i].idMessage +")'>Cargar</button></td>";
        myTable += "</tr>"; //cerrar fila
    }
    myTable += "</table>"; //cerrar tabla
    $("#resultadoMessage").append(myTable);
}

function guardarMessage() {
    let myData = {
        messageText: $("#messagetext").val(),
    };
    let dataToSend = JSON.stringify(myData);
    
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData),
        
        url:"http://129.151.124.136:8080/api/Message/save",
    
        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
            
            alert("No se guardo correctamente");
    
    
        }
        });
}

  //PUT

function editarMessage() {
    let myData = {
        id: $("#id_message").val(),
        messagetext: $("#messagetext").val(),
    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.124.136:8080/api/Message/update",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
        $("#resultadoMessage").empty();
        
        $("#messagetext").val("");
        
        
        alert("se ha actualizado");
        },
    });
}

  //DELETE

function borrarMessage(idElemento) {
    let myData = {
        idMessage: idElemento,
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.124.136:8080/api/Message/"+idElemento,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
        $("#resultadoMessage").empty();
        getDatosMessage();
        alert("Se ha Eliminado.");
        },
    });
}

function obtenerItemEspecificoMessage(items) {
    console.log("---- obtenerItemEspecificoMessage items:", items);
    $.ajax({
        dataType: "json",
        url: "http://129.151.124.136:8080/api/Message/" + items,
        type: "GET",
        success: function (response) {
        console.log("---- obtenerItemEspecificoMessage", response);
        var item = response.items[0];
        $("#id_message").val(item.id);
        $("#messagetext").val(item.messagetext);
        },

        error: function (jqXHR, textStatus, errorThrown) {},
    });
}
