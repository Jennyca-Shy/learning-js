//Globale Variablen
let leds, lampen, breite, hoehe;
let bausteinArt = "falsch";
let bausteine = ['r', 'R', 'B', 'W'];
let diagramm = [];
let anzahl_led = 0;
let anzahl_lampen = 0;
let lampen_index = [];
let led_index = [];
let ausgabe = [];
let index = 0;
let tabelle = "";
let lichter = [];
let arrays = [];
let elem = document.getElementById("main2");
let an_aus_tabelle = [];
let m;
let n;

//Wenn Button "weiter" gedrückt wird
function weiter() {
    if (seite == 1) {
        breite = parseInt(document.getElementById("n").value);
        hoehe = parseInt(document.getElementById("m").value);
        lampen = parseInt(document.getElementById("lampen").value);
        leds = parseInt(document.getElementById("led").value);
        if (hoehe != "" && breite != "" && hoehe > 1 && breite >= Math.max(lampen, leds) && lampen != "" && lampen > 0 && leds != "" && leds > 0) {
            seite2(lampen, leds);
            seite += 1;
        } else {
            alert("Bitte gebe eine gültige Konstruktion ein!");
        }
    } else if (seite == 2) {
        seite3(lampen, leds);
        seite += 1;
    }else if(seite == 3){
        berechnen1();
    }
}

//Generierung der zweiten Seite
function seite2(lampen, leds) {
    let newElement;
    let newLamp;
    let newSpalte;
    let newTextarea;
    let bauteil = "Lampe";
    let bauteil_id = "lampe_";
    document.getElementById("content").innerHTML = "";
    document.getElementById("titel").innerHTML = "<p>Gebe bitte die Spalte der Lampen und LEDs an. Lampen können nur in der ersten Zeile und LEDs nur in der letzten Zeile verbaut werden.</p>";
    for (let j = 0; j<2; j++){
        for (let i = 1; i <= lampen; i++) {
            newElement = document.createElement("div");
            newSpalte = document.createElement("p");
            newSpalte.appendChild(document.createTextNode('Spalte der '+i+'. ' + bauteil + ':'));
            newLamp = document.createElement("textarea");
            newLamp.id = bauteil_id +i;
            newLamp.setAttribute("cols", "10");
            newLamp.setAttribute("rows", "1");
            newTextarea = document.createElement("p");
            newTextarea.appendChild(newLamp);
            newElement.appendChild(newSpalte);
            newElement.appendChild(newTextarea);
            document.getElementById("content").appendChild(newElement);
        }
        bauteil = "LED";
        bauteil_id = "led_";
        lampen = leds;
    }
    console.log(newElement);
    diagramm = Array(hoehe).fill(null).map(() => Array(breite).fill(0));
    let newRow;
    console.log(diagramm);
    console.log(diagramm);
    document.getElementById("grid").innerHTML = "";
    for(let i = 0; i<hoehe; i++){
        newRow = document.createElement("div");
        newRow.setAttribute("class", "row");
        newRow.setAttribute("id", "row" + i);
        for (let j=0; j<breite; j++){
            newElement = document.createElement("div");
            newElement.setAttribute("class", "column");
            newElement.setAttribute("id", i+"_"+j);
            newRow.appendChild(newElement);
        }
        document.getElementById("grid").appendChild(newRow);
    }
    window.addEventListener('click', onClick);
}

//Generierung der dritten Seite
function seite3(lampen, leds) {
    let temp2 = [];
    let lampe;
    let led;
    let temp;
    let temporal;
    anzahl_lampen = lampen;
    anzahl_led = leds;
    const setlamp = new Set();
    const setled = new Set();
    for (let i = 1; i <= lampen; i++) {
        temp = "lampe_" +i;
        temp2.push(0);
        temp = document.getElementById(temp).value;
        temporal = temp-1;
        temp2.push(parseInt(temporal));
        lampen_index.push(temp2);
        setlamp.add(temporal);
        if (setlamp.size != i || temp > breite){
            alert("Gebe eine gültige Konstruktion an! Die Seite wird neu geladen");
            window.location.href = window.location.href;
            return;
        }
        temp2 = [];
        lampe = "0_"+temporal;
        console.log(lampe);
        document.getElementById(lampe).innerHTML = "";
        document.getElementById(lampe).appendChild(document.createTextNode("Q"+i));
    }
    for (let i = 1; i <= leds; i++) {
        temp = "led_" +i;
        temp2.push(hoehe-1);
        temp = document.getElementById(temp).value;
        temporal = temp-1;
        temp2.push(parseInt(temporal));
        led_index.push(temp2);
        setled.add(temporal);
        if (setled.size != i || temp > breite){
            alert("Gebe eine gültige Konstruktion an! Die Seite wird neu geladen");
            window.location.href = window.location.href;
            return;
        }
        temp2 = [];
        led = "".concat(hoehe-1, "_", temporal);
        console.log(led);
        document.getElementById(led).innerHTML = "";
        document.getElementById(led).appendChild(document.createTextNode("L"+i));
    }
    console.log(lampen_index);
    console.log(led_index);
    document.getElementById("content").innerHTML = "";
    document.getElementById("titel").innerHTML = "Drücke auf den jeweiligen Button und anschließend auf die Position auf der Konstruktion rechts, um diesen Baustein hinzufügen. Beachte, dass das gedrückte Feld auf der Konstruktion der linken Hälfte des Bausteins entspricht!";
    newElement = document.createElement("button");
    newElement.setAttribute("class", "WW");
    newElement.setAttribute("id", "WW");
    newElement.setAttribute("onclick", "baustein('WW')");
    document.getElementById("content").appendChild(newElement);
    document.getElementById("WW").innerHTML = "WW";
    newElement = document.createElement("button");
    newElement.setAttribute("class", "BB");
    newElement.setAttribute("id", "BB");
    newElement.setAttribute("onclick", "baustein('BB')");
    document.getElementById("content").appendChild(newElement);
    document.getElementById("BB").innerHTML = "BB";
    newElement = document.createElement("button");
    newElement.setAttribute("class", "rR");
    newElement.setAttribute("id", "rR");
    newElement.setAttribute("onclick", "baustein('rR')");
    document.getElementById("content").appendChild(newElement);
    document.getElementById("rR").innerHTML = "rR";
    newElement = document.createElement("button");
    newElement.setAttribute("class", "Rr");
    newElement.setAttribute("id", "Rr");
    newElement.setAttribute("onclick", "baustein('Rr')");
    document.getElementById("content").appendChild(newElement);
    document.getElementById("Rr").innerHTML = "Rr";
}
function baustein(data){
    if (data == "WW"){
        bausteinArt = "WW";
    }else if (data == "rR"){
        bausteinArt = "rR";
    }else if (data == "Rr"){
        bausteinArt = "Rr";
    }else if (data == "BB"){
        bausteinArt = "BB";
    }
}
const onClick = (event) => {
    let data;
    let farbe;
    let ides;
    let links;
    if (event.target.nodeName === 'DIV'){
        if (bausteinArt != "falsch"){
            console.log(event.target.id);
            data = event.target.id.split("_");
            function toNumber(value) {
                return Number(value);
            }
            data = data.map(toNumber);
            if (data[0] != 0 && data[0] != hoehe-1 && data[1] != breite-1){
                console.log("richtig");
                ides = event.target.id;
                farbe = document.getElementById(ides).style.backgroundColor;
                console.log(farbe);
                links = data[1]+1;
                rechts = data[0] + "_" + links; 
                if (farbe == "" && document.getElementById(rechts).style.backgroundColor == ""){
                    if (bausteinArt == "WW"){
                        document.getElementById(ides).style.backgroundColor = "#ffffff";
                        document.getElementById(rechts).style.backgroundColor = '#ffffff';
                        document.getElementById(rechts).style.borderColor = "black #847E89 #847E89";
                        document.getElementById(ides).style.borderColor = "black #847E89 #847E89";
                        diagramm[data[0]][data[1]] = "W";
                        diagramm[data[0]][links] = "W";
                    }else if (bausteinArt == "BB"){
                        document.getElementById(ides).style.backgroundColor = "#0000ff";
                        document.getElementById(rechts).style.backgroundColor = '#0000ff';
                        document.getElementById(rechts).style.borderColor = "black #847E89 #847E89";
                        document.getElementById(ides).style.borderColor = "black #847E89 #847E89";
                        diagramm[data[0]][data[1]] = "B";
                        diagramm[data[0]][links] = "B";
                    }else if(bausteinArt == "rR"){
                        document.getElementById(ides).style.backgroundColor = "#EF3232";
                        document.getElementById(rechts).style.backgroundColor = '#EF3232';
                        document.getElementById(rechts).style.borderColor = "black #847E89 #847E89";
                        diagramm[data[0]][data[1]] = "r";
                        diagramm[data[0]][links] = "R";
                    }else if(bausteinArt == "Rr"){
                        document.getElementById(ides).style.backgroundColor = "#EF3232";
                        document.getElementById(rechts).style.backgroundColor = '#EF3232';
                        document.getElementById(ides).style.borderColor = "black #847E89 #847E89";
                        diagramm[data[0]][data[1]] = "R";
                        diagramm[data[0]][links] = "r";
                    }
                }else{
                    alert("Man kann nicht auf einen Baustein noch eines draufbauen!");
                }
            }else{
                alert("Bausteine bitte richtig platzieren!");
            }
        }
    }
}
function null_eins(){
    document.getElementById("text2").innerHTML = tabelle;
}
function buchstaben(){
    document.getElementById("text2").innerHTML = an_aus_tabelle;
}
function berechnen1(){
    elemt.style.display = 'block';
    berechnen();
}
function zurueck(){
    elem.style.display = 'none';
}
function berechnen(){
    n = breite;
    m = hoehe;
    bausteine = ['r', 'R', 'B', 'W'];
    ausgabe = [];
    lichter = [];
    tabelle = "<table><tr>";
    an_aus_tabelle = "<table><tr>";
    arrays = [];

    for (let i=1; i<=anzahl_lampen; i++){
        tabelle += "<th>";
        tabelle += "Q"+i;
        tabelle += "</th>";
        an_aus_tabelle += "<th>";
        an_aus_tabelle += "Q"+i;
        an_aus_tabelle += "</th>";
    }
    for (let i=1; i<=anzahl_led; i++){
        tabelle += "<th>";
        tabelle += "L"+i;
        tabelle += "</th>";
        an_aus_tabelle += "<th>";
        an_aus_tabelle += "L"+i;
        an_aus_tabelle += "</th>";
    }
    an_aus_tabelle += "</tr>";
    tabelle += "</tr>";
    alles(anzahl_lampen, [], 0);
    tabelle += "</table>";
    an_aus_tabelle += "</table>";
    document.getElementById("text2").innerHTML = tabelle;
}
function alles(b, an_aus, a){
    if (a==b){
        tabelle += "<tr>";
        an_aus_tabelle += "<tr>";
        let leds2 = Array(hoehe).fill(null).map(() => Array(breite).fill(0));
        for (let i=0; i<anzahl_lampen; i++){
            leds2[lampen_index[i][0]][lampen_index[i][1]] = an_aus[i];
            if (an_aus[i] == 0){
                an_aus_tabelle += "<td id='aus'>";
                tabelle += "<td id='aus'>";
                an_aus_tabelle += "aus";
            }else{
                an_aus_tabelle += "<td id='an'>";
                tabelle += "<td id='an'>";
                an_aus_tabelle += "an";
            }
            tabelle += an_aus[i];
            an_aus_tabelle += "</td>";
            tabelle += "</td>";
        }
        for (let i=0; i<m; i++){
            let j = 0;
            while (j<n && i<m){
                if (bausteine.includes(diagramm[i][j])){
                    lichter = [];
                    lichter.push(leds2[i-1][j]);
                    lichter.push(leds2[i-1][j+1]);
                    bauteil = [];
                    bauteil.push(diagramm[i][j]);
                    bauteil.push(diagramm[i][j+1]);
                    if (bauteil[0] == 'W' && bauteil[1] == 'W' && (lichter[0] != 1 || lichter[1] != 1)){
                        leds2[i][j] = 1;
                        leds2[i][j+1] = 1;
                    }else if(bauteil[0] == 'B' && bauteil[1] == 'B' && (lichter[0] != 0 || lichter[1] != 0)){
                        leds2[i][j] = lichter[0];
                        leds2[i][j+1] = lichter[1];
                    }else{
                        if ((bauteil[0] == 'r' && bauteil[1] == 'R' && lichter[1] != 1) || (bauteil[0] == 'R' && bauteil[1] == 'r' && lichter[0] != 1)){
                            leds2[i][j] = 1;
                            leds2[i][j+1] = 1;
                        }
                    }
                j+=1;
                }
            j+=1;
            }
        }
        let ausgaben = [];
        ausgaben.push(an_aus);
        for (let i=0; i<anzahl_led; i++){
            ausgaben.push(leds2[led_index[i][0]-1][led_index[i][1]]);
            if ( leds2[led_index[i][0]-1][led_index[i][1]] == 0){
                an_aus_tabelle += "<td id='aus'>";
                tabelle += "<td id='aus'>";
                an_aus_tabelle += "aus";
            }else{
                an_aus_tabelle += "<td id='an'>";
                tabelle += "<td id='an'>";
                an_aus_tabelle += "an";
            }
            an_aus_tabelle += "</td>";
            tabelle += leds2[led_index[i][0]-1][led_index[i][1]];
            tabelle += "</td>";
        }
        tabelle += "</tr>";
        an_aus_tabelle += "</tr>";
        ausgabe.push(ausgaben);
        console.log(leds2);
    }else{
        an_aus.push(0);
        for (let i=0; i<2; i++){
            an_aus[a] = i;
            let abc = an_aus.slice();
            alles(b, abc, a+1);
        }
    }
}
function aktualisieren(){
    window.location.href = window.location.href;
}