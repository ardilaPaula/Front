//GET

function getDatosRoom() {
  $.ajax({
    url: "http://129.151.124.136:8080/api/Room/all",
    type: "GET", //tipo de accion
    datatype: "JSON",
    success: function (respuesta) {
      console.log(respuesta);
      pintarRespuestaRoom(respuesta);
    },
  });
}

function pintarRespuestaRoom(items) {
  let myTable = "<table>"; //let es un tipo variable y crear tabla
  for (i=0;i<items.length;i++) {
    myTable += "<tr>"; //crear fila
    myTable += "<td>" + items[i].id + "</td>"; // tabla room
    myTable += "<td>" + items[i].name + "</td>";
    myTable += "<td>" + items[i].stars + "</td>";
    myTable += "<td>" + items[i].hotel + "</td>";
    myTable += "<td>" + items[i].description + "</td>";
    myTable +=
      "<td> <button onclick='borrarRoom(" + items[i].id + ")'>Borrar</button>";
    myTable +=
      "<td><button onclick='obtenerItemEspecificoroom(" +
      items[i].id +
      ")'>Cargar</button></td>";
    myTable += "</tr>"; //cerrar fila
  }
  myTable += "</table>"; //cerrar tabla
  $("#resultadoRoom").append(myTable);
}

function guardarRoom() {
  let myData = {
    name: $("#room").val(),
    stars: $("#stars").val(),
    hotel: $("#hotel").val(),
    description: $("#description").val(),
  };
    $.ajax({
    type:'POST',
    contentType: "application/json; charset=utf-8",
    dataType: 'JSON',
    data: JSON.stringify(myData),
    
    url:"http://129.151.124.136:8080/api/Room/save",

    
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

function editarRoom() {
  let myData = {
    
    name: $("#room").val(),
    stars: $("#stars").val(),
    category_id: $("#category_id").val(),
    hotel: $("#hotel").val(),
    description: $("#description").val(),
  };
  console.log(myData);
  let dataToSend = JSON.stringify(myData);
  $.ajax({
    url: "http://129.151.124.136:8080/api/Room/update",
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

function borrarRoom(idElemento) {
  let myData = {
    id: idElemento,
  };
  let dataToSend = JSON.stringify(myData);
  $.ajax({
    url: "http://129.151.124.136:8080/api/Room/"+idElemento,
    type: "DELETE",
    data: dataToSend,
    contentType: "application/JSON",
    datatype: "JSON",
    success: function (response) {
      $("#resultadoRoom").empty();
      getDatosRoom();
      alert("Se ha Eliminado.");
    },
  });
}

function obtenerItemEspecificoroom(items) {
    console.log("---- obtenerItemEspecificoroom items:", items);
  $.ajax({
    dataType: "json",
    url: "http://129.151.124.136:8080/api/Room/" + items,
    type: "GET",
    success: function (response) {
      console.log("---- obtenerItemEspecificoroom", response);
      var item = response;
      $("#id").val(response.id);
      $("#room").val(response.name);
      $("#stars").val(response.stars);
      $("#category_id").val(response.category_id);
      $("#hotel").val(response.hotel);
      $("#description").val(response.description);
    },

    error: function (jqXHR, textStatus, errorThrown) {},
  });
}
