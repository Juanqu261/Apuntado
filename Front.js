//Creacion del mazo
let mazo = [];
let barajado = [];
let manos = [];
const pintas = ["clubs", "diamonds", "hearts", "spades"];
let cartaSeleccionada; //carta que tiene el borde rojo
let cartasSoltadas = document.getElementsByClassName("cartas-soltada");

//Carta del mazo-reves de la mano1
const reves = "PNG-cards/back.png";
let revesContenedor = document.getElementById("espacio-0");
revesContenedor.insertAdjacentHTML(
  "beforeend",
  `<img src=${reves} alt=${reves} class="image">`
);
revesContenedor.onclick = (e) => {
  if (cartaSeleccionada) {
    cartaSeleccionada.style.border = "";
  }
  e.stopPropagation();
  revesContenedor.style.border = "2px solid red";
  cartaSeleccionada = revesContenedor;
};

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
const DuplicarMazo = () => {
  //"Barajar"
  for (let i = 0; i < mazo.length; i++) {
    barajado.push(mazo[i]);
  }
  barajado.sort(function () {
    return Math.random() - 0.5;
  });
};

const repartir = () => {
  //Arma las manos
  for (let i = 0; i < totalJugadores(); i++) {
    let mano = [];
    let max = i === 0 ? 11 : 10;
    for (let j = 1; j <= max; j++) {
      mano.push(barajado[0]);
      barajado.shift();
    }
    manos.push(mano);
  }
};

const OrganizarVista = () => {
  //Organiza manos en su respectivo card-holder
  for (let i = 0; i < totalJugadores(); i++) {
    for (let j = 0; j < manos[i].length; j++) {
      const imagen = document.createElement("img");
      const cartaRepartir = manos[i][j];
      const rutaCarta =
        "PNG-cards/" +
        cartaRepartir.numero +
        "_of_" +
        cartaRepartir.pinta +
        ".png";
      imagen.src = rutaCarta;
      imagen.className += "image";

      const contenedor = document.getElementById("espacio-" + (1 + j + i * 13));
      contenedor.dataset.numero = cartaRepartir.numero;
      contenedor.dataset.tipo = cartaRepartir.pinta;
      contenedor.dataset.img = cartaRepartir.img;

      if (
        cartaRepartir.pinta === "hearts" ||
        cartaRepartir.pinta === "diamonds"
      ) {
        contenedor.dataset.color = "rojo";
      } else {
        contenedor.dataset.color = "negro";
      }

      // contenedor.innerHTML = "";
      contenedor.appendChild(imagen);
      // contenedor.insertAdjacentHTML(
      //   "beforeend",
      //   `<img src=${rutaCarta} alt=${rutaCarta} class="image">`
      // );
      contenedor.onclick = (e) => {
        if (cartaSeleccionada) {
          cartaSeleccionada.style.border = "";
        }
        e.stopPropagation();
        contenedor.style.border = "2px solid red";
        cartaSeleccionada = contenedor;
      };
    }
  }
};

// cuando se reinicia el juego por completo
const limpiarMano = () => {
  mazo = [];
  manos = [];
  barajado = [];
};

const CartaMazo = () => {
  //Pone la carta del revez en la pila del mazo para todas las manos
  for (let i = 1; i < manos.length; i++) {
    const revesContenedor = document.getElementById("espacio-" + 13 * i);
    revesContenedor.innerHTML = "";
    revesContenedor.insertAdjacentHTML(
      "beforeend",
      `<img src=${reves} alt=${reves} class="image">`
    );

    revesContenedor.onclick = (e) => {
      if (cartaSeleccionada) {
        cartaSeleccionada.style.border = "";
      }
      e.stopPropagation();
      revesContenedor.style.border = "2px solid red";
      cartaSeleccionada = revesContenedor;
    };
  }
};
function totalJugadores() {
  var totalJugadores = document.getElementById("Ingresar-jugadores");
  return totalJugadores.value;
}

//Iniciar juego
playGame.onclick = () => {
  limpiarMano();
  QuitarVistaOtros();
  if (mazo.length < 1) {
    CrearMazo();
  }
  DuplicarMazo();
  repartir();
  OrganizarVista();
  CartaMazo();
  jugadorActual = 1;
  document.getElementById("jugador-" + jugadorActual).style.display = "block";
  QuitarVistaOtros();
};

//Cambiar vista a siguiente jugador
const QuitarVistaOtros = () => {
  document.getElementById("jugador-2").style.display = "none";
  document.getElementById("jugador-3").style.display = "none";
  document.getElementById("jugador-4").style.display = "none";
};

QuitarVistaOtros();

let jugadorActual = 1; // 1, 2, 3, 4

function CambiarVistaJugador() {
  document.getElementById("jugador-" + jugadorActual).style.display = "none";
  if (jugadorActual !== Number(totalJugadores())) {
    if (cartasSoltadas[jugadorActual].firstChild) {
      //Para la primera iteracion, verifica que exista algo antes
      cartasSoltadas[jugadorActual].removeChild(
        cartasSoltadas[jugadorActual].firstChild
      );
    }
    cartasSoltadas[jugadorActual].appendChild(
      imgsCartasSoltadas[jugadorActual - 1]
    );
    jugadorActual = jugadorActual + 1;
  } else {
    jugadorActual = 1;
    cartasSoltadas[0].removeChild(cartasSoltadas[0].firstChild);
    cartasSoltadas[0].appendChild(
      imgsCartasSoltadas[imgsCartasSoltadas.length - 1]
    );
  }
  document.getElementById("jugador-" + jugadorActual).style.display = "block";

  // agrego la carta dejada por el anterior jugador
}

const SigJugador = document.getElementById("next");
SigJugador.addEventListener("click", CambiarVistaJugador);

//----------------------------------

/*
4 jugadores -> 0, 1, 2, 3
El jugador 0 puede tomar la carta soltada por el juagdor 3
El jugador 1 puede tomar la carta soltada por el juagdor 0
El jugador 2 puede tomar la carta soltada por el juagdor 1
El jugador 3 puede tomar la carta soltada por el juagdor 2
*/
let cartaSoltadaJugador0 = document.getElementById("espacio-12");
let cartaSoltadaJugador1 = document.getElementById("espacio-25");
let cartaSoltadaJugador2 = document.getElementById("espacio-38");
let cartaSoltadaJugador3 = document.getElementById("espacio-21");
// ejemplo cartaSoltadaJugador3.dataset.tipo
let imgsCartasSoltadas = [];
let cartasSeleccionadas = [];

divEspaciosSoltar = document.getElementsByClassName("soltar");

for (let espacio = 0; espacio < divEspaciosSoltar.length; espacio++) {
  const element = divEspaciosSoltar[espacio];
  element.onclick = (e) => {
    e.stopPropagation();
    // si la carta seleccionada existe y no es volteada
    if (
      cartaSeleccionada &&
      !cartaSeleccionada.classList.contains("cartas-volteadas")
    ) {
      imgsCartasSoltadas[espacio] = cartaSeleccionada.firstChild;
      cartaPuestaEnEspacioSoltar = {
        numero: Number(cartaSeleccionada.dataset.numero),
        pinta: cartaSeleccionada.dataset.tipo,
        img: cartaSeleccionada.dataset.img,
      };

      for (let i = 0; i < manos[espacio].length; i++) {
        let mano = manos[espacio][i];
        if (
          Object.values(mano).toString() ==
          Object.values(cartaPuestaEnEspacioSoltar).toString()
        ) {
          console.log("Eliminado", espacio, i);
          removeItemOnce(manos[espacio], manos[espacio][i]);
          break;
        } else {
          console.log("continua");
        }
      }
    }
  };
}

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
