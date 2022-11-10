
// Verändert die Texte innerhalb der Website abhängig von der ausgewählten Rechenmethode
function changeDescription() {
    let amountDescription = document.querySelector("#amountDescription");
    let resultDescription = document.querySelector("#resultDescription");
    let calcNetToGross = document.querySelector("#calcNetToGross").checked;

    // ==================== Wenn Netto zu Brutto ausgewählt ================================
    if (calcNetToGross) {
        amountDescription.innerHTML = "Nettobetrag (Preis ohne Mehrwertsteuer) in Euro";
        resultDescription.innerHTML = "Bruttobetrag (Endpreis)";
        // ================= Andernfalls ist Brutto zu Netto ausgewählt (wir haben ja nur zwei radio buttons) ================
    } else {
        amountDescription.innerHTML = "Bruttobetrag (Preis inklusive Mehrwertsteuer) in Euro";
        resultDescription.innerHTML = "Nettobetrag";
    }

}

function calculate(event) {
    // Hiermit verhindern wir das Neuladen der Seite
    event.preventDefault();

    // Erstmal alle Elemente aus dem HTML holen, bei checkbox brauchen wir das Attribut "checked"
    const calcNetToGross = document.getElementById("calcNetToGross").checked;
    const calcGrossToNet = document.getElementById("calcGrossToNet").checked;

    const taxRate19 = document.getElementById("taxRate19").checked;
    const taxRate7 = document.getElementById("taxRate7").checked;

    // Von unserem Textinput kriegen wir den Betrag mit einem Komma
    // JavaScript arbeitet mit Punkten anstatt Kommas, deshalb ersetzen wir hier das Komma durch einen Punkt
    // Danach benutzen wir Number() um den String in eine Zahl umzuwandeln
    const amountWithComma = document.getElementById("amount").value;
    const amount = Number(amountWithComma.replace(",", "."));

    // Hier lesen wir die Elemente ein die wir zur Ausgabe in unserem HTML benötigen
    const taxAmountElement = document.getElementById("taxAmount");
    const resultElement = document.getElementById("result");

    // =========== Absichern dass auch immer etwas aufgewählt wurde ========================================

    // Überprüfe ob keiner der beiden radio buttons, also Netto-zu-Brutto oder Brutto-zu-Netto, gechecked ist
    if (!(calcNetToGross || calcGrossToNet)) {
        console.error("One of the calculation methods has to be checked");
        return; // beende die funktion frühzeitig
    }

    // Überprüfe ob keiner der beiden radio buttons, also 19% oder 7%, gechecked ist
    if (!(taxRate19 || taxRate7)) {
        console.error("One of the tax rates has to be selected");
        return; // beende die funktion frühzeitig
    }

    // Überprüfe ob das Eingabefeld für den Betrag leer ist
    if (amountWithComma === "") {
        console.error("Amount is a required property");
        return; // beende die funktion frühzeitig
    }

    // =============== Berechnungen =====================================
    let result;
    let taxAmount;
    // Wenn Netto zu Brutto ausgewählt ist
    if (calcNetToGross) {
        // Wenn 19% ausgewählt ist
        if (taxRate19) {
            taxAmount = amount / 100 * 19; // 19%
            result = amount + taxAmount; // nettobetrag + 19%
            // Ansonsten ist 7% ausgewählt
        } else {
            taxAmount = amount / 100 * 7;
            result = amount + taxAmount;
        }
        // Brutto zu Netto
    } else {
        // 19%
        if (taxRate19) {
            result = amount / 119 * 100; // netto
            taxAmount = amount - result; // steueranteil
            // 7%
        } else {
            result = amount / 107 * 100; // netto
            taxAmount = amount - result; // steueranteil
        }
    }

    // Hier schreiben wir das Ergebnis zurück in unser HTML, mit toFixed formatieren wir die Zahl auf 2 Nachkommastellen
    // Mit replace(".", ",") ersetzten wir dann den Punkt von JavaScript wieder durch ein Komma
    // Mit template literals, können wir den string leichter formatieren 
    taxAmountElement.innerHTML = `${taxAmount.toFixed(2).replace(".", ",")} €`;
    resultElement.innerHTML = `${result.toFixed(2).replace(".", ",")} €`;
}