
const calculate = () => {
    event.preventDefault();
    //=========== Betrag vom Input ========================
    let input = Number(document.getElementById("input").value);
    //=========== Alle Berechnungen ========================
    let mehrwertErgebnis = calculateMehrwert(input);
    //=========== Aufschlag oder Abzug ========================
    if (document.querySelector("#radio_aufschlagen").checked) {
        aufschlagen(mehrwertErgebnis, input);
    }
    else if (document.querySelector("#radio_abziehen").checked) {
        abziehen(mehrwertErgebnis, input);

    } else {
        console.log("Bitte auswählen was berechnet werden soll!");
    }

}

//=========== Mehrwertsteuer berechnen ========================
const calculateMehrwert = (input) => {
    event.preventDefault();
    let mehrwert7 = Number(input * 0.07);
    let mehrwert19 = Number(input * 0.19);

    //=========== Auswahl Satz ========================
    const radio7 = document.querySelector("#satz7");
    const radio19 = document.querySelector("#satz19");
    if (radio7.checked) {
        document.querySelector("#mehrwert_output").innerHTML = mehrwert7;
        return mehrwert7;

    } else if (radio19.checked) {
        document.querySelector("#mehrwert_output").innerHTML = mehrwert19;
        return mehrwert19;

    } else {
        console.log("Bitte eins auswählen!");
    }

}


//=========== Aufschlag berechnen ========================
const aufschlagen = (mehrwertErgebnis, input) => {
    event.preventDefault();
    let aufschlagen = input + mehrwertErgebnis;
    document.querySelector("#b-n_output").innerHTML = aufschlagen;

}
//=========== Abzug berechnen ========================
const abziehen = (mehrwertErgebnis, input) => {
    event.preventDefault();
    let abziehen = input - mehrwertErgebnis;
    document.querySelector("#b-n_output").innerHTML = abziehen;
    console.log(abziehen);
}


//=========== text ändern ========================



const text = () => {
    if (document.querySelector("#radio_aufschlagen").checked) {
        document.querySelector("#label_input").innerHTML = "Nettobetrag (Preis ohne Mehrwertsteuer in Euro)";
    }
    else if (document.querySelector("#radio_abziehen").checked) {
        document.querySelector("#label_input").innerHTML = "Bruttobetrag (Preis mit Mehrwertsteuer in Euro)";

    } else {
        console.log("Bitte auswählen was berechnet werden soll!");
    }
}
