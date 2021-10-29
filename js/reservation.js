//GET
function getDatosReservation() {
    $.ajax({
        url: "http://129.151.124.136:8080/api/Reservation/all",
        type: "GET", //tipo de accion
        datatype: "JSON",
        success: function (respuesta) {
        console.log(respuesta);
        pintarRespuestaReservation(respuesta);
        },
    });
}

function pintarRespuestaReservation(items) {
    let myTable = "<table>"; //let es un tipo variable y crear tabla
    for (i=0;i<items.length;i++) {
    myTable += "<tr>"; //crear fila
    myTable += "<td>" + items[i].idReservation + "</td>"; // tabla room
    myTable += "<td>" + items[i].startDate + "</td>";
    myTable += "<td>" + items[i].devolutionDate + "</td>";
    myTable += "<td>" + items[i].client + "</td>";
    myTable += "<td>" + items[i].room + "</td>";
    myTable +="<td> <button onclick='borrarReservation(" + items[i].idReservation + ")'>Borrar</button>";
    myTable +="<td><button onclick='obtenerItemEspecificoReservation(" +
    items[i].idReservation +")'>Cargar</button></td>";
    myTable += "</tr>"; //cerrar fila
    }
    myTable += "</table>"; //cerrar tabla
    $("#resultadoReservation").append(myTable);
}

function guardarReservation() {
    let myData = {
        startDate: $("#starsdate").val(),
        devolutionDate:$("#devolutiondate").val(),
        client:{idClient:$("#id_cliente").val()},
        room:{id:$("#id_room").val()},
    };
    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(myData),
    
        url:"http://129.151.124.136:8080/api/Reservation/save",

    
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

function editarReservation() {
    let myData = {
    
        startDate: $("#starsdate").val(),
        devolutionDate:$("#devolutiondate").val(),
        client:{idClient:$("#id_cliente").val()},
        room:{id:$("#id_room").val()},
    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.124.136:8080/api/Reservation/update",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
    
    success:function(response) {
        console.log(response);
        console.log("Se guardo correctamente");
        alert("Se guardo correctamente");
        window.location.reload()

    },

        error: function(jqXHR, textStatus, errorThrown) {

            alert("No se guardo correctamente");


        }
    });

}

//DELETE

function borrarReservation(idElemento) {
    let myData = {
        idReservation: idElemento,
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.124.136:8080/api/Reservation/"+idElemento,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (response) {
        $("#resultadoReservation").empty();
        getDatosRoom();
        alert("Se ha Eliminado.");
        },
    });
}

function obtenerItemEspecificoReservation(items) {
        console.log("---- obtenerItemEspecificor items:", items);
    $.ajax({
        dataType: "json",
        url: "http://129.151.124.136:8080/api/Reservation/" + items,
        type: "GET",
        success: function (response) {
            console.log("---- obtenerItemEspecificoroom", response);
            var item = response;
            $("#starsdate").val(response.startDate),
        
            $("#devolutiondate").val(response.devolutionDate),
            $("#id_cliente").val(response.client),
            $("#id_room").val(response.room)
        },

        error: function (jqXHR, textStatus, errorThrown) {},
    });
}
