const parametros = new URLSearchParams(window.location.search);

const tipo = parametros.get("tipo");
const id = parametros.get("id");

console.log("Tipo:", tipo);
console.log("ID:", id);


// Escolher a lista correta

let lista;

if(tipo === "serie"){
    lista = series;
}else{
    lista = filmes;
}


// Procurar conteúdo

const item = lista.find(function(conteudo){
    return conteudo.id === id;
});

console.log("Conteúdo encontrado:", item);


// Mostrar conteúdo

if(item){

    document.getElementById("tituloPlayer").textContent =
        item.titulo;

    document.getElementById("descricaoPlayer").textContent =
        item.descricao;

    // O ID pode vir com "?si=..." colado; o embed só precisa do ID puro
    const idVideo = item.trailer.split("?")[0];

    document.getElementById("playerYoutube").src =
        `https://www.youtube.com/embed/${idVideo}?autoplay=1&rel=0`;

}else{

    document.getElementById("tituloPlayer").textContent =
        "Conteúdo não encontrado";

    document.getElementById("descricaoPlayer").textContent =
        "Não foi possível localizar esse filme ou série.";

}