//Creacion del mazo
var mazo = [];
var barajado = [];
const pintas = ["clubs", "diamonds", "hearts", "spades"];

//Carta del mazo-reves de la mano1
const reves = "PNG-cards/back.png";
var revesContenedor = document.getElementById("espacio-0");
revesContenedor.insertAdjacentHTML("beforeend", `<img src=${reves} alt=${reves} class="image">`)

const CrearMazo = () => {
  for (let i = 1; i <= 13; i++) {
    for (let j = 0; j < 4; j++) {
      const carta = {
        numero: i,
        pinta: pintas[j],
        img: "PNG-cards/" + i + "_of_" + pintas[j] + ".png",
      };
      mazo.push(carta);
      mazo.push(carta);
    }
  }
};
const DuplicarMazo = () => { //"Barajar"
  for (let i = 0; i < mazo.length; i++) {
    barajado.push(mazo[i]);
  }
  barajado.sort(function () {
    return Math.random() - 0.5;
  });
};

//Creacion de la mano del primer jugador
var manos = [];
const repartir = () => {
  const mano = [];
  for (let i = 1; i <= 11; i++) {
    mano.push(barajado[0]);
    barajado.shift();
  }
  manos.push(mano);
};
const DarCartas = () => { 
  for (let i = 0; i < manos.length; i++) {
    for (let j = 0; j < manos[i].length; j++) {
      const cartaRepartir = manos[i][j];
      const imagen =
        "PNG-cards/" +
        cartaRepartir.numero +
        "_of_" +
        cartaRepartir.pinta +
        ".png";
      const contenedor = document.getElementById("espacio-" + (j+1));
      contenedor.innerHTML = "";
      contenedor.insertAdjacentHTML(
        "beforeend",
        `<img src=${imagen} alt=${imagen} class="image">`
        )
      }
    }
};
const limpiarMano = () => {
  mazo = [];
  manos = [];
  barajado = [];
}
const CartaMazo = () => { //Pone la carta del revez en la pila del mazo para todas las manos
  for (let i = 1; i < manos.length; i++) {
    revesContenedor = document.getElementById("espacio-"+(13*i));
    revesContenedor.innerHTML = "";
    revesContenedor.insertAdjacentHTML("beforeend", `<img src=${reves} alt=${reves} class="image">`)
  }
}
function totalJugadores() {
  var totalJugadores = document.getElementById("Ingresar-jugadores")
  return totalJugadores.value
}
CrearOtrasManos = () => {
  //Manos Lista que lista las cartas de cada mano
  //Arma el resto de manos
  for (let i = 1; i < totalJugadores(); i++) {
    const mano = [];
    for (let j = 1; j <= 10; j++) {
      mano.push(barajado[0]);
      barajado.shift();
  }
  manos.push(mano);
  }
};
OrganizarVista = () => {
  //Organiza el resto de manos en su respectivo card-holder
  for (let i = 1; i < totalJugadores(); i++) {
    for (let j = 0; j < manos[i].length; j++) {
      const cartaRepartir = manos[i][j];
      const imagen =
        "PNG-cards/" +
        cartaRepartir.numero +
        "_of_" +
        cartaRepartir.pinta +
        ".png";
      const contenedor = document.getElementById("espacio-" + (1+j+(i*13)));
      contenedor.innerHTML = "";
      contenedor.insertAdjacentHTML(
        "beforeend",
        `<img src=${imagen} alt=${imagen} class="image">`
        )
      }
    }
}

//Iniciar juego
playGame.onclick = () => {
  limpiarMano()
  QuitarVistaOtros()
  if (mazo.length < 1) {
    CrearMazo();
  }
  DuplicarMazo();
  repartir();
  DarCartas();
  CrearOtrasManos()
  OrganizarVista()
  CartaMazo()
  jugadorActual = 1;
  document.getElementById("jugador-"+jugadorActual).style.display = "block";
  QuitarVistaOtros()
};

//Cambiar vista a siguiente jugador
const QuitarVistaOtros = () => {
  document.getElementById("jugador-2").style.display = "none"; 
  document.getElementById("jugador-3").style.display = "none"; 
  document.getElementById("jugador-4").style.display = "none"; 
}
QuitarVistaOtros()
var jugadorActual = 1;
function CambiarVistaJugador() {
  document.getElementById("jugador-"+jugadorActual).style.display = "none"; 
  if (jugadorActual!==Number(totalJugadores())) {
    jugadorActual = jugadorActual + 1;
  } else {
    jugadorActual = 1;
  }
  document.getElementById("jugador-"+jugadorActual).style.display = "block";
};
const SigJugador = document.getElementById("next");
SigJugador.addEventListener("click", CambiarVistaJugador);
