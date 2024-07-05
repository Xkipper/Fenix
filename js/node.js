

// Get data from webserver.ts
socket.on('tabla', data => {
    //console.log(data);
    console.log(reloj(1));
    if (!data) return;
    if (data.lenght == 0) return;

    let tabla = document.getElementById('tabla');
    let title = document.getElementById('info');
    let resul = document.getElementById('resu');
    let van = 0, novan = 0;
    tabla.innerHTML = '';
    resul.innerHTML = '';

    for (let i = 0; i < data.length; i++) {
        title.innerHTML = data[i].fecha;

        let resalt = "";
        if (data[i].voy == 1) { resalt = 'class="bg-success"'; van++; }
        else if (data[i].voy == 2) { resalt = 'class="bg-danger"'; novan++; }
        

        let codigo = `<tr>
                        <td ${resalt}>${data[i].nick}</td>
                        <td><small>${data[i].t_confir}</small></td>
                        <td><small>${data[i].t_cancel}</small></td>
                        <td>${data[i].coment}</td>
                    </tr>`;
        tabla.innerHTML += codigo;
        resul.innerHTML = `Asisten: ${van} / Rechazan: ${novan} / Ignoran: ${data.length - (van + novan)}`;
    }    

});


// Get data from webserver.ts
setTimeout(function(){
    socket.emit('consulta', {fecha:reloj(1)});
}, 1000);










function reloj(opt) {
    var d = new Date();
    
    // Retorna fecha dd-mm-años
    if (opt == 1){
        let dd = (0+d.getDate().toString()).slice(-2);
        let mm = (0+(d.getMonth()+1).toString()).slice(-2);
        return (dd + "/" + mm + "/" + d.getFullYear());
    }
    // Retorna HH:MM.ss
    if (!opt || opt == null || opt == 0){
        let hh = (0+d.getHours().toString()).slice(-2);
        let mm = (0+d.getMinutes().toString()).slice(-2);
        let ss = (0+d.getSeconds().toString()).slice(-2);
        return (hh+":"+mm+"."+ss);
    }
        
}