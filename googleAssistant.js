'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const {dialogflow} = require('actions-on-google');
const {Suggestions} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});
var sonidosEspeciales = true;// Line 207
var problema = "";
var paso = 0;
var detectarSubproblema = false;
//-----------------------------------------
var IntentEquipos = false;
var IntentNumeroEquipos = false;
var IntentQuestions = false;
var estamosJugando = false;
var numEquipos = 1;
var index = 0;
var _index;
var myArray = [];
var access = [];
var equipos = [];
var pointsTeam = [];
var failsTeam = [];
/*-----------------------------------------------------------------------------------------*/
var turno = 0;
var ronda = 1;
//var repetir = 0;

var numPreguntas;

var pointsTeam1 = 0;
var failsTeam1 = 0;
var preguntas;

const questions =
[
    "¿Cuál de estos meses del año NO es uno de los que tiene 31 días?\nJulio.\nJunio.\no Enero\n",//1
    "¿En cuál de estas unidades se mide la velocidad en navegación marítima y aérea?\nMillas.\nNudos. \no Pies\n",//2
    "En el Señor de los Anillos, ¿Cuál era la relación entre Merry y Pippin?\nPrimos.\nHermanos.\no Amigos\n",//3
    "¿En cuál de estas cordilleras se encuentra el Monte Everest?\nAlpes.\nHimalaya.\n o Montes de Toledo\n",//4
    "¿Qué título posee el heredero al trono de la Corona de Inglaterra?\nPríncipe de Escocia.\nPríncipe de Maine.\no Príncipe de Gales\n",//5
    "¿Qué piloto ha sido el más joven en ganar un Gran Premio de Fórmula 1?\nFernando Alonso.\nMax Verstappen.\no Sebastian Vettel\n",//6
    "¿Cuál de estos animales es el más lento del mundo?\nKoala.\nPerezoso.\no Manatí\n",//7
    "¿Cuál de estos árboles NO es de hoja caduca?\nChopo.\nNogal.\no Pino\n",//8
    "¿Cuál de estas estrellas firmó el contrato más caro de la historia de la música?\nC Tangana.\nMichael Jackson.\no U2\n",//9
    "¿Qué animal es el mamífero más grande del mundo?\nBallena Azul.\nOso polar.\no Elefante Africano.\n",//10
    "¿Cuál de estos reyes gobernó en la Corona de Aragón mientras Isabel reinaba en la de Castilla?\nCarlos primero.\nFelipe Segundo.\no Fernando Segundo\n",//11
    "¿Cuál fue el primer largometraje de animación realizado íntegramente por ordenador?\nShrek.\nBuscando a Nemo.\no Toy Story\n",//12
    "¿Cuál es el país del mundo con más lugares declarados Patrimonio de la Humanidad?\nEstados Unidos.\nChina.\no Italia\n",//13
    "¿En qué minuto metió Andrés Iniesta el gol que le daría a España el mundial de fútbol de 2010?\n121.\n113.\no 116\n",//14
    "¿En qué ciudad nació la bolsa de valores oficial más antigua del mundo?\nÁmsterdam.\nNueva York.\no Londres\n",//15
    "¿Qué tipo de palabra es: versus?\nAdverbio.\nPreposición.\no Conjunción\n",//16
    "¿Qué significa Machu Picchu?\nMontaña Vieja.\nCiudad del sol.\no Lugar Escondido\n",//17
    "¿De cuál de estos países es originario el árbol del café?\nColombia.\nBrasil.\no Etiopía\n",//18*
    "¿Quién fue el primer científico que propuso el modelo heliocéntrico del sistema solar?\nGalileo Galilei.\nAristarco de Samos.\no Nicolás Copérnico\n",
    "¿Cuál de estos clubes de fútbol ha sido más veces campeón de Europa?\nChelsea.\nBorussia de Dortmund.\no Nottingham Forest\n",//20
    "¿Cuál de estas figuras musicales equivale a la mitad de una semifusa?\nCorchea.\nGarrapatea.\no Mínima\n",//21
    "¿Por qué vena entra la sangre en la aurícula derecha del corazón?\nAorta.\nCava.\no Subclavia\n",//22
    "¿A cuál de estos países pertenece la isla de Navidad?\nAustralia.\nJapón.\no Chile.\n",//23
    "¿Quién es considerado como el fundador del ejército rojo durante la revolución rusa?\nVladimir Lennin.\nStalin.\no Trotsky\n",//24
    "¿Cuál de estos procesos NO forma parte del ciclo del agua?\nInfiltración.\nFusión.\no Subducción\n",//25
    "En la saga de Batman de Christopher Nolan ¿Qué actor interpretó a Batman?\nChristian Bale.\nBen Affleck.\no George Clooney\n",//26
    "En Dragon Ball Z ¿Contra qué villano Son Gohan se transforma en super saiyan 2 por primera vez?\nBroly.\nAndroide 17.\no Célula\n",//27
    "¿Cuál de los siguientes entrevistados del programa, La Resistencia rompió una taza?\nAntonio Resines.\nErnesto Sevilla.\no Wismichu\n",//28
    "¿Qué actor protagoniza la película “El guardaespaldas” junto con Whitney Houston?\nKevin Costner.\nRichard Gere.\no George Clooney\n",//29
    "¿A qué fenómeno climatológico hacemos referencia si hablamos de la cellisca?\nGranizo denso.\nAgua nieve.\no Lluvia corriente\n",//30
    "¿En qué país nos encontramos si estamos pagando con lempiras?\nPanamá.\nHonduras.\no El Salvador.",//31
    "¿Cuál de estas bandas sonoras NO es de Ennio Morricone?\nEl último mohicano.\nCinema Paradiso.\no La misión\n",//32
    "¿Cuál de estos elementos es más abundante en la composición del agua del mar?\nSodio.\nCloro.\no Magnesio\n",//33
    "¿A qué nos estamos refiriendo si utilizamos el término “greda”?\nUna trifulca.\nUn tipo de arcilla.\no un tipo de bombilla.\n",//34
    "¿Cuál de estas películas dirigidas por Christopher Nolan NO fue nominada al Oscar como mejor película?\nOrigen.\nDunkerke.\no Memento\n",//35
    "¿De qué color es la fumata que anuncia la elección final del nuevo Papa en el Vaticano?\nNegra.\nGris.\no Blanca\n",//36
    "¿Qué es lo que NO tiene Hello Kitty?\nNariz.\nBoca.\no Orejas.\n",//37
    "¿En qué localidad española se celebra el mercado medieval más importante de Europa?\nCáceres.\nSalamanca.\no Alcalá de Henares\n", // 38
    "¿Cuál de estas ciudades está más cerca de Aranjuez?\nMelilla.\nLa Coruña.\no Toledo.\n",//39
    "¿Cómo se siente la cantante Rosalía con la publicación de su álbum el mal querer? \nPreocupada.\nAburrida.\n o malamente\n" //40
];

const respuestas = {
  "1": ["Julio", "Junio", "Enero"],
  "2": ["Millas","Nudos","Pies"],
  "3": ["Primos","Hermanos","Amigos"],
  "4": ["Alpes","Himalaya","Montes de Toledo"],
  "5": ["Príncipe de Escocia","Príncipe de Maine","Príncipe de Gales"],
  "6": ["Fernando Alonso","Max Verstappen","Sebastian Vettel"],
  "7": ["Koala","Perezoso","Manatí"],
  "8": ["Chopo","Nogal","Pino"],
  "9": ["C Tangana","Michael Jackson","U2"],
  "10": ["Ballena Azul","Oso polar","Elefante Africano"],
  "11": ["Carlos primero","Felipe Segundo","Fernando Segundo"],
  "12": ["Shrek","Buscando a Nemo","Toy Story"],
  "13": ["Estados Unidos","China","Italia"],
  "14": ["121","113","116"],
  "15": ["Ámsterdam","Nueva York","Londres"],
  "16": ["Adverbio","Preposición","Conjunción"],
  "17": ["Montaña Vieja","Ciudad del sol","Lugar Escondido"],
  "18": ["Colombia","Brasil","Etiopía"],
  "19": ["Galileo Galilei","Aristarco de Samos","Nicolás Copérnico"],
  "20": ["Chelsea","Borussia de Dortmund","Nottingham Forest"],
  "21": ["Corchea", "Garrapatea", "Mínima"],
  "22": ["Aorta","Cava","Subclavia"],
  "23": ["Australia","Japón","Chile"],
  "24": ["Vladimir Lennin","Trotsky","Stalin"],
  "25": ["Infiltración","Fusión","Subducción"],
  "26": ["Christian Bale","Ben Affleck","George Clooney"],
  "27": ["Broly","Androide 17","Célula"],
  "28": ["Antonio Resines","Ernesto Sevilla","Wismichu"],
  "29": ["Kevin Costner","Richard Gere","George Clooney"],
  "30": ["Granizo denso","Agua nieve","Lluvia corriente"],
  "31": ["Panamá","Honduras","El Salvador"],
  "32": ["El último mohicano","Cinema Paradiso","La misión"],
  "33": ["Sodio","Cloro","Magnesio"],
  "34": ["Trifulca","Arcilla","Bombilla"],
  "35": ["Origen","Dunkerke","Memento"],
  "36": ["Negra","Gris","Blanca"],
  "37": ["Nariz","Boca","Orejas"],
  "38": ["Cáceres","Salamanca","Alcalá de Henares"],
  "39": ["Melilla","La Coruña","Toledo"],
  "40": ["Preocupada","Aburrida","Malamente"]


};

app.intent('Trivial', (conv, {Jugar}) => {

  IntentEquipos = true;
  estamosJugando = true;
  intentsControl ();
  myArray.length = 0;
  index = 0;
  pointsTeam1 = 0;
  failsTeam1 = 0;
  ronda = 1;

  loadOrder();
  numPreguntas = questions.length;
  // Presentación del juego
  conv.ask(toSSML("El juego consiste en una serie de preguntas a resolver." +
                  "\nAl final podréis ver las preguntas acertadas y falladas." +
                  "\nPodéis finalizar el juego en cualquier momento pronunciando la palabra: salir." +
                  "\nSi deseas repetir cualquier pregunta pronuncia la palabra: repetir." +
                  "\n¿Va a ser un juego por equipos? "));
  conv.ask(new Suggestions(['Sí', 'No']));



});

app.intent('Equipos', (conv, {Seguir}) => {

    if (IntentEquipos)
    {
        IntentEquipos = false;

        if (Seguir == "Sí")
        {
            IntentNumeroEquipos = true;
            conv.ask(toSSML("¿Cuántos equipos habrá en total? "));

        }

        else
        {
            IntentNumeroEquipos = false;
            activateIntent (_index);
            conv.ask(toSSML("Bien. ¡Empecemos!" + questions[_index] ));
            conv.ask(new Suggestions( [ respuestas[_index + 1][0], respuestas[_index + 1][1], respuestas[_index + 1][2] ]));


        }
    }


});

app.intent('Número de Equipos', (conv, {NumeroDeEquipos}) => {

    if (IntentNumeroEquipos)
    {
        numEquipos = NumeroDeEquipos;
        equilibrarPreguntas();
        var i;
        for (i = 0; i < numEquipos; i++)  loadTeams (i);// reseteo
        activateIntent (_index);
        conv.ask(toSSML ("\nBien. ¡Empecemos!. Ronda " + ronda + ". Turno del equipo "+ equipos[turno] + ".\n" + questions[_index]));
        conv.ask(new Suggestions( [ respuestas[_index + 1][0], respuestas[_index + 1][1], respuestas[_index + 1][2] ]));


    }


});

/*-------------Tratamiento de audio-------------------------------------------------*/

function toSSML(x) {
    return "<speak><voice gender=\"female\" variant=\"1\">" + x + "</voice></speak>";
}


/*Librería de audios*/
function sonidoAcierto (x)
{
  return "<speak><audio src=\"https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg\"></audio><voice gender=\"female\" variant=\"1\">" + x + "</voice></speak>";
    //return "<speak><audio src=\"https://actions.google.com/sounds/v1/cartoon/concussive_hit_guitar_boing.ogg\"></audio><voice gender=\"female\" variant=\"1\">" + x + "</voice></speak>";
  //    return "<speak><audio src=\"https://drive.google.com/file/d/1x6jEpoUa2ymHXJUcBOr0fONWg_NUpmZo/view?usp=sharing\"></audio><voice gender=\"female\" variant=\"1\">" + x + "</voice></speak>";
}

function sonidoFallo (x)
{
  return "<speak><audio src=\"https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg\"></audio><voice gender=\"female\" variant=\"1\">" + x + "</voice></speak>";
}




/*---------Tratamiento de los datos------------------------*/
function fail (conv, texto) {


        if (numPreguntas != index + 1) // Si quedan preguntas
        {
          if (IntentNumeroEquipos) failTeam (conv, texto); // Si es un juego por equipos
          else failNoTeam (conv, texto); // Si es un juego individual
        }

        else exitFromHere (conv);

}

function succsess(conv) {

        if (numPreguntas != index + 1) // Si quedan preguntas
        {
          if (IntentNumeroEquipos)  successTeam (conv); // Si es un juego por equipos
          else successNoTeam (conv); // Si es un juego individual

        }

        else lastSuccess (conv); // Si ya no quedan preguntas

}

function lastSuccess (conv)
{
  if (IntentNumeroEquipos)  pointsTeam [turno] += 1;
  else pointsTeam1++;

  exitFromHere(conv);
}

function exitFromHere (conv)
{

  if (estamosJugando)
  {
    estamosJugando = false;

    if (IntentNumeroEquipos) exitFromHereTeams (conv); // Si es un juego por equipos

    else conv.close(toSSML("Has acertado: " + pointsTeam1 + " preguntas de " + (pointsTeam1 + failsTeam1)  ));

  }

  else conv.close(toSSML("¡Hasta la próxima!"  ));

}


function exitFromHereTeams (conv)
{
  var i;
  var cadena = [];

  for (i = 0 ; i < numEquipos ; i++) // Creo una super cadena* La formateo y luego solo la imprimo una vez
  {
    if (i == numEquipos - 1) cadena [i] = "y el equipo: " + equipos [i]   + ", ha acertado " + pointsTeam [i] + " de " + (pointsTeam[i] + failsTeam [i]) + " preguntas\n. ¡Hasta la próxima!" ;
    else cadena [i] = "el equipo: " + equipos [i]   + ", ha acertado " + pointsTeam [i] + " de " + (pointsTeam[i] + failsTeam [i]) + " preguntas\n" ;

  }

 conv.close(toSSML(cadena));

}

/*-----------------------------------------------------------------*/
/*Respuestas cuando no hay equipos*/

function successNoTeam (conv)
{
  pointsTeam1++;
  index++;
  desactivateIntent (_index);
  _index = myArray[index];
  activateIntent (_index);


  if (sonidosEspeciales) conv.ask(sonidoAcierto("Has acertado. \nSiguiente pregunta: " + questions[_index]));
  else conv.ask(toSSML("Has acertado. \nSiguiente pregunta: " + questions[_index]));

  conv.ask(new Suggestions( [ respuestas[_index + 1][0], respuestas[_index + 1][1], respuestas[_index + 1][2] ]));
}


function failNoTeam (conv, texto)
{
  failsTeam1++;
  index++;
  desactivateIntent (_index);
  _index = myArray[index];
  activateIntent (_index);

  if (sonidosEspeciales) conv.ask(sonidoFallo("Error. " + texto + " \nSiguiente pregunta: " + questions[_index]));
  else conv.ask(toSSML("Error. " + texto + " \nSiguiente pregunta: " + questions[_index]));

  conv.ask(new Suggestions( [ respuestas[_index + 1][0], respuestas[_index + 1][1], respuestas[_index + 1][2] ]));
}
/*--------------------------------------------------------------------*/


/*------------------------------------------------------------------------*/
/*Respuestas cuando si hay equipos. Esto implica que habrá rondas y que se manejarán turnos*/

function successTeam (conv)
{
  desactivateIntent (_index);
  index++;
  _index = myArray[index];
  activateIntent (_index);
  pointsTeam [turno] += 1;
  turno++;
  if (turno == numEquipos) //nueva ronda
  {
    turno = 0;
    ronda++;

    if (sonidosEspeciales) conv.ask(sonidoAcierto("Has acertado.\nRonda: " + ronda  + "\nSiguiente pregunta para el equipo " + equipos[turno] + ".\n" + questions[_index]));
    else conv.ask(toSSML("Has acertado.\nRonda: " + ronda  + "\nSiguiente pregunta para el equipo " + equipos[turno] + ".\n" + questions[_index]));

    conv.ask(new Suggestions( [ respuestas[_index + 1][0], respuestas[_index + 1][1], respuestas[_index + 1][2] ]));
  }

  else
  {

    if (sonidosEspeciales) conv.ask(sonidoAcierto("Has acertado. \nSiguiente pregunta para el equipo " + equipos[turno] + ".\n"+ questions[_index]));
    else conv.ask(toSSML("Has acertado. \nSiguiente pregunta para el equipo " + equipos[turno] + ".\n"+ questions[_index]));

    conv.ask(new Suggestions( [ respuestas[_index + 1][0], respuestas[_index + 1][1], respuestas[_index + 1][2] ]));
  }

}


function failTeam (conv, texto)
{
  desactivateIntent (_index);
  index++;
  _index = myArray[index];
  activateIntent (_index);
  failsTeam [turno] += 1;
  turno++;

  if (turno == numEquipos)
  {
    turno = 0;
    ronda++;

    if (sonidosEspeciales) conv.ask(sonidoFallo("Error." + texto + ".\n" + "Ronda: " + ronda  + "\nSiguiente pregunta para el equipo: " + equipos[turno] + ".\n" + questions[_index]));
    else conv.ask(toSSML("Error." + texto + ".\n" + "Ronda: " + ronda  + "\nSiguiente pregunta para el equipo: " + equipos[turno] + ".\n" + questions[_index]));

    conv.ask(new Suggestions( [ respuestas[_index + 1][0], respuestas[_index + 1][1], respuestas[_index + 1][2] ]));

  }

  else
  {
    if (sonidosEspeciales) conv.ask(sonidoFallo("Error." + texto + "\nSiguiente pregunta para el equipo: " + equipos[turno] + ".\n" + questions[_index]));
    else conv.ask(toSSML("Error." + texto + "\nSiguiente pregunta para el equipo: " + equipos[turno] + ".\n" + questions[_index]));

    conv.ask(new Suggestions( [ respuestas[_index + 1][0], respuestas[_index + 1][1], respuestas[_index + 1][2] ]));
  }

}


function loadTeams (i)
{
  equipos [i] = i + 1;
  pointsTeam [i] = 0;
  failsTeam [i] = 0;
}

function loadOrder ()
{
    /*Se selecionan inicialmente el orden de las preguntas*/
    var cantidadNumeros = questions.length;


    while(myArray.length < cantidadNumeros )
    {
      var numeroAleatorio = Math.ceil(Math.random()*cantidadNumeros);
      var existe = false;

      for(var i = 0;  i < myArray.length; i ++)
      {
        if(myArray [i] == numeroAleatorio-1)
        {
          existe = true;
          break;
        }
      }

      if(!existe)   myArray[myArray.length] = numeroAleatorio-1;
    }

    _index = myArray[0];



}

function equilibrarPreguntas ()
{
  numPreguntas =  (Math.floor (numPreguntas/numEquipos)  * numEquipos) ;
}

function repetir (conv)
{
  if (IntentNumeroEquipos)  conv.ask(toSSML("\nRepito la pregunta para el equipo " + equipos[turno] + ".\n"+ questions[_index]));
  else
  {
    conv.ask(toSSML("\nRepito la pregunta.\n"+ questions[_index]));
    conv.ask(new Suggestions( [ respuestas[_index + 1][0], respuestas[_index + 1][1], respuestas[_index + 1][2] ]));
  }


}

/*-----------------------------------------------------------------------------------*/

function intentsControl ()
{
var i;
for (i = 0; i < numPreguntas ; i++) access [i] = false;
}

function activateIntent (myIndex)
{
access [myIndex] = true;
}

function desactivateIntent (myIndex)
{
access [myIndex] = false;
}

function intentActivo (_myIndex)
{
return access [_myIndex - 1];
}

/*------------------------------------------------------------------------------------------*/

app.intent('Repetir', (conv) => {

  repetir (conv);

});

app.intent('Ronda', (conv) => {

  conv.ask(toSSML("\nVamos por la ronda  " + ronda ));

});

app.intent('Debug', (conv) => {

  conv.ask(toSSML("\nEl orden del array es el siguiente  " + myArray + " y vamos por el index " + _index +
  " el tamaño de questions es " + questions.length + " el tamaño configurado es " + numPreguntas +
" array debug " + access));

});

app.intent('Salir', (conv) => {

  exitFromHere (conv);
});

app.intent('Presentación', (conv) => {

  conv.ask(toSSML("\nViewnext es una empresa de Servicios de Tecnología de la Información del grupo IBM en España especializada en servicios gestionados de aplicaciones e infraestructuras. "));

});




app.intent('Más información', (conv) => {

  conv.ask(toSSML("Además Viewnext cuenta con más de 4.500 profesionales, 10 Centros de Innovación Tecnológica y más de 400 Clientes en España "));


});

app.intent('Default Welcome Intent', (conv) => {

  conv.ask(toSSML("\nViewnext es una empresa"));

});


app.intent('Default Fallback Intent', (conv) => {

  conv.ask(toSSML("\nNo te he entendido, ¿Podrías repetirlo?"));

});




/* A continuación se manejan todos los Intents de las respuestas de las preguntas */
/*--------------------------------------------------------------------------------*/
/*

Cada pregunta tiene asociado un intent, con lo que habrá tantas "funciones" como preguntas.
Además hay que considerar que cada pregunta tiene una respuesta diferente.

*/



app.intent('Pregunta 1', (conv, {Pregunta1}) => {

  if (intentActivo(1))
  {
    if (Pregunta1 == "Junio")       succsess(conv);

    else fail (conv,"Es Junio el que tiene 30 días.");

  }

  else  repetir (conv);




});

app.intent('Pregunta 2', (conv, {Pregunta2}) => {

  if (intentActivo(2))
  {
    if (Pregunta2 == "Nudos")       succsess(conv);

    else fail (conv, "La unidad que hay en común son los nudos.");

  }

  else repetir (conv);

});

app.intent('Pregunta 3', (conv, {Pregunta3}) => {

  if (intentActivo(3))
  {
    if (Pregunta3 == "Primos")      succsess(conv);

    else fail (conv, "Merry y Pippin eran primos. La madre de Merry, Esmeralda Tuk y el padre de Pippin, Paladin Tuk Son hermanos.");


  }
  else repetir (conv);


});


app.intent('Pregunta 4', (conv, {Pregunta4}) => {

  if (intentActivo (4))
  {
    if (Pregunta4 == "Himalaya")        succsess(conv);

    else fail (conv, "El Everest se encuentra en el Himalaya.");
  }

  else repetir (conv);




});


app.intent('Pregunta 5', (conv, {Pregunta5}) => {

  if (intentActivo (5))
  {
    if (Pregunta5 == "Príncipe de Gales")       succsess(conv);

    else fail (conv, "El título que recibe es el de Príncipe de Gales.");

  }

  else repetir (conv);



});

app.intent('Pregunta 6', (conv, {Pregunta6}) => {

  if (intentActivo (6))
  {
    if (Pregunta6 == "Max Verstappen")      succsess(conv);

    else fail (conv, "El más joven en ganar un premio es Max Verstappen." );

  }
  else repetir (conv);



});


app.intent('Pregunta 7', (conv, {Pregunta7}) => {

  if (intentActivo (7))
  {
    if (Pregunta7 == "Perezoso")        succsess(conv);

    else fail (conv, "El más lento es el Perezoso.");
  }

  else repetir (conv);


});


app.intent('Pregunta 8', (conv, {Pregunta8}) => {

  if (intentActivo(8))
  {
    if (Pregunta8 == "Pino")        succsess(conv);

    else fail (conv, "La respuesta correcta es el pino.");

  }
  else repetir (conv);

});


app.intent('Pregunta 9', (conv, {Pregunta9}) => {

  if (intentActivo (9))
  {
    if (Pregunta9 == "Michael Jackson")     succsess(conv);

    else fail (conv, "El contrato más caro de la historia de la música fue firmado por Michael Jackson.");


  }

  else repetir (conv);

});


app.intent('Pregunta 10', (conv, {Pregunta10}) => {

  if (intentActivo (10))
  {
    if (Pregunta10 == "Ballena azul")       succsess(conv);

    else fail (conv, "El mamífero más grande del mundo es la ballena azul.");

  }

  else repetir (conv);

});


app.intent('Pregunta 11', (conv, {Pregunta11}) => {

  if (intentActivo(11))
  {
    if (Pregunta11 == "Fernando Segundo")       succsess(conv);

    else fail (conv, "El rey que gobernó en la Corona de Aragón mientras Isabel reinaba en la de Castilla fue: Fernando Segundo.");

  }

  else repetir (conv);

});

app.intent('Pregunta 12', (conv, {Pregunta12}) => {

  if (intentActivo(12))
  {
    if (Pregunta12 == "Toy Story")       succsess(conv);

    else fail (conv, "El primer largometraje de animación realizado íntegramente por ordenador fue Toy Story.");

  }

  else repetir (conv);

});

app.intent('Pregunta 13', (conv, {Pregunta13}) => {

  if (intentActivo(13))
  {
    if (Pregunta13 == "Italia")       succsess(conv);

    else fail (conv, "El país del mundo con más lugares declarados Patrimonio de la Humanidad es Italia.");

  }

  else repetir (conv);


});

app.intent('Pregunta 14', (conv, {Pregunta14}) => {

  if (intentActivo (14))
  {
    if (Pregunta14 == "116")       succsess(conv);

    else fail (conv, "El minuto en el que Andrés Iniesta metió el gol fue el 116.");

  }
  else repetir (conv);

});

app.intent('Pregunta 15', (conv, {Pregunta15}) => {

  if (intentActivo (15))
  {
    if (Pregunta15 == "Amsterdam")       succsess(conv);

    else fail (conv, "La bolsa de valores mas antigua del mundo es la de Ámsterdam.");
  }

  else repetir (conv);

});

app.intent('Pregunta 16', (conv, {Pregunta16}) => {

  if (intentActivo (16))
  {
    if (Pregunta16 == "Adverbio")       succsess(conv);

    else fail (conv, "La palabra Versus es de tipo adverbio.");

  }

  else repetir (conv);

});

app.intent('Pregunta 17', (conv, {Pregunta17}) => {

  if (intentActivo(17))
  {
    if (Pregunta17 == "montaña")       succsess(conv);

    else fail (conv, "Machu Pichu significa montaña vieja.");
  }

  else repetir (conv);


});

app.intent('Pregunta 18', (conv, {Pregunta18}) => {


  if (intentActivo (18))
  {
    if (Pregunta18 == "Etiopía")       succsess(conv);

    else fail (conv, "El árbol del Café es originario de Etiopía.");

  }

  else repetir (conv);

});

app.intent('Pregunta 19', (conv, {Pregunta19}) => {

  if (intentActivo (19))
  {
    if (Pregunta19 == "Aristarco")       succsess(conv);

    else fail (conv, "Aristarco fue el primer científico del modelo heliocéntrico.");
  }

  else repetir (conv);

});

app.intent('Pregunta 20', (conv, {Pregunta20}) => {

  if (intentActivo (20))
  {
    if (Pregunta20   == "Nottingham")       succsess(conv);

    else fail (conv, "El Nottingham Forest tiene más campeonatos de Europa que el Chelsea y el Borussia de Dortmund.");

  }

  else repetir (conv);

});


app.intent('Pregunta 21', (conv, {Pregunta21}) => {

  if (intentActivo (21))
  {
    if (Pregunta21   == "Garrapatea")       succsess(conv);

    else fail (conv, "La Garrapatea equivale a la mitad de una semifusa.");

  }

  else repetir (conv);

});

app.intent('Pregunta 22', (conv, {Pregunta22}) => {

  if (intentActivo (22))
  {
    if (Pregunta22   == "Cava")       succsess(conv);

    else fail (conv, "La sangre en la aurícula derecha del corazón entra por la vena cava.");

  }

  else repetir (conv);

});

app.intent('Pregunta 23', (conv, {Pregunta23}) => {

  if (intentActivo(23))
  {
    if (Pregunta23   == "Australia")       succsess(conv);

    else fail (conv, "La isla de la Navidad pertenece a Australia.");

  }

  else repetir (conv);

});

app.intent('Pregunta 24', (conv, {Pregunta24}) => {

  if (intentActivo (24))
  {
    if (Pregunta24   == "Trotsky")       succsess(conv);

    else fail (conv, "Trotsky es el fundador del ejército rojo durante la revolución rusa.");

  }

  else repetir (conv);

});

app.intent('Pregunta 25', (conv, {Pregunta25}) => {

  if (intentActivo (25))
  {
    if (Pregunta25   == "Subducción")       succsess(conv);

    else fail (conv, "La subducción no forma parte del ciclo del agua.");

  }

  else repetir (conv);


});

app.intent('Pregunta 26', (conv, {Pregunta26}) => {

  if (intentActivo (26))
  {
    if (Pregunta26   == "Christian Bale")       succsess(conv);

    else fail (conv, "El actor que interpretó a Batman en la saga de Christopher Nolan fue Christian Bale.");
  }

  else repetir (conv);

});

app.intent('Pregunta 27', (conv, {Pregunta27}) => {

  if (intentActivo (27))
  {
    if (Pregunta27   == "Célula")       succsess(conv);

    else fail (conv, "Gohan se transformó en Super Saiyan 2 por primera vez contra Célula.");

  }

  else repetir (conv);


});

app.intent('Pregunta 28', (conv, {Pregunta28}) => {

  if (intentActivo (28))
  {
    if (Pregunta28   == "Wismichu")       succsess(conv);

    else fail (conv, "Wismichu rompió una taza al finalizar el programa de la resistencia.");
  }

  else repetir (conv);

});

app.intent('Pregunta 29', (conv, {Pregunta29}) => {

  if (intentActivo (29))
  {
    if (Pregunta29   == "Kevin")       succsess(conv);

    else fail (conv, "La respuesta correcta es Kevin Kostner.");
  }

  else repetir (conv);

});

app.intent('Pregunta 30', (conv, {Pregunta30}) => {

  if (intentActivo (30))
  {
    if (Pregunta30   == "Agua nieve")       succsess(conv);

    else fail (conv, "La celisca hace referencia al agua nieve.");
  }

  else repetir (conv);

});

app.intent('Pregunta 31', (conv, {Pregunta31}) => {

  if (intentActivo (31))
  {
    if (Pregunta31   == "Honduras")       succsess(conv);

    else fail (conv, "Las lempiras se usan en Honduras.");
  }

  else repetir (conv);

});

app.intent('Pregunta 32', (conv, {Pregunta32}) => {

  if (intentActivo (32))
  {
    if (Pregunta32   == "El Último Mohicano")       succsess(conv);

    else fail (conv, "La banda sonora que no fue compuesta por Ennio Morricone fue El Último Mohicano.");
  }

  else repetir (conv);

});

app.intent('Pregunta 33', (conv, {Pregunta33}) => {

  if (intentActivo (33))
  {
    if (Pregunta33   == "Cloro")       succsess(conv);

    else fail (conv, "El cloro es el elemento más abundante en la composición del mar.");
  }

  else repetir (conv);

});

app.intent('Pregunta 34', (conv, {Pregunta34}) => {

  if (intentActivo (34))
  {
    if (Pregunta34   == "Un tipo de arcilla")       succsess(conv);

    else fail (conv, "La greda se refiere a un tipo de arcilla.");
  }

  else repetir (conv);

});

app.intent('Pregunta 35', (conv, {Pregunta35}) => {

  if (intentActivo (35))
  {
    if (Pregunta35   == "Memento")       succsess(conv);

    else fail (conv, "Memento no fue nominada al Oscar como mejor película.");
  }

  else repetir (conv);

});


app.intent('Pregunta 36', (conv, {Pregunta36}) => {

  if (intentActivo (36))
  {
    if (Pregunta36   == "Blanca")       succsess(conv);

    else fail (conv, "La fumata que anuncia la elección del nuevo Papa es de color blanca.");
  }

  else repetir (conv);

});

app.intent('Pregunta 37', (conv, {Pregunta37}) => {

  if (intentActivo (37))
  {
    if (Pregunta37   == "Boca")       succsess(conv);

    else fail (conv, "Hello Kitty no tiene boca.");
  }

  else repetir (conv);

});

app.intent('Pregunta 38', (conv, {Pregunta38}) => {

  if (intentActivo (38))
  {
    if (Pregunta38   == "Alcalá de Henares")       succsess(conv);

    else fail (conv, "La respuesta correcta es Alcalá de Henares.");
  }

  else repetir (conv);

});

app.intent('Pregunta 39', (conv, {Pregunta39}) => {

  if (intentActivo (39))
  {
    if (Pregunta39   == "Toledo")       succsess(conv);

    else fail (conv, "Toledo está mas cerca de Aranjuez que las otras dos ciudades.");
  }

  else repetir (conv);

});

app.intent('Pregunta 40', (conv, {Pregunta40}) => {

  if (intentActivo (40))
  {
    if (Pregunta40   == "Malamente")       succsess(conv);

    else fail (conv, "En el álbum del mal querer Rosalía se siente malamente.");
  }

  else repetir (conv);

});












// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
