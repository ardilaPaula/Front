function getDatosCategoria(){
    $.ajax({
        url:"http://129.151.124.136:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].id+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable +="<td> <button onclick='borrarCategoria(" + respuesta[i].id + ")'>Borrar</button>";
        myTable +="<td><button onclick='obtenerItemEspecificoCategoria(" +
        respuesta[i].id +")'>Cargar</button></td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoCategoria").append(myTable);
}


function guardarCategoria(){
    let var2 = {
        name:$("#Cname").val(),
        description:$("#Cdescription").val()
        };
    
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://129.151.124.136:8080/api/Category/save",
    
        
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

function editarCategoria() {
    let myData = {
        name: $("#Cname").val(),
        description: $("#Cdescription").val()
    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.124.136:8080/api/Category/update",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        
        success:function(response) {
            console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            

        },
    
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");


        }
    });
}

  //DELETE

function borrarCategoria(idElemento) {
    console.log("---- obtenerItemEspecificoClient items:", idElemento);
    
    let myData = {
        id: idElemento,
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://129.151.124.136:8080/api/Category/"+idElemento,
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (response) {
        $("#resultadoCategoria").empty();
        getDatosClient();
        alert("Se ha Eliminado.");
        },
    });
}

function obtenerItemEspecificoCategoria(items) {
    console.log("---- obtenerItemEspecificoClient items:", items);
    $.ajax({
        dataType: "json",
        url: "http://129.151.124.136:8080/api/Category/" + items,
        type: "GET",
        success: function (response) {
        console.log("---- obtenerItemEspecificocategoria", response);
        var item = response;
        $("#Cname").val(response.name);
        $("#Cdescription").val(response.description);
        },

        error: function (jqXHR, textStatus, errorThrown) {},
    });
}
