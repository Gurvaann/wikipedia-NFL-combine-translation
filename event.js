var dicoTemplate = {
    // DICO AVEC LES FONCTIONS POUR TRADUIRE CHAQUE MODELE/TEMPLATE
    "nfl predraft": Combine.translate,
    "cite web": Ref.translate,
    "cite news": Ref.translate,
    "reflist": () => { return "{{Références}}" },
    "short description": () => { return "" },
    "defaultsort": (txt) => { return txt },
    "use mdy dates": () => { return "" },
    "use american english": () => { return "" },
    "american english": () => { return "" },
    "authority control": () => { return "" },
    "twitter": () => { return "" },
    "commons category": () => { return "" },
    "cbignore": () => { return "" }
}

function translate(txt) {
    var list = splitTemplates(txt);
    list = translateTemplatesOneByOne(list);
    txt = list.join('');
    return fixRefs(txt)
}

function splitTemplates(txt) {
    var tab = txt.split('{{');
    var list = [tab[0]];
    for (var i = 1; i < tab.length; i++) {
        list.push('{{');
        var tab2 = tab[i].split('}}');
        list.push(tab2[0]);
        for (var j = 1; j < tab2.length; j++) {
            list.push('}}');
            list.push(tab2[j]);
        }
    }
    return list
}

function translateTemplatesOneByOne(list) {
    var stack = [];
    for (let i = 0; i < list.length; i++) {
        if (list[i] === '{{') {
            stack.push(i);
        } else if (list[i] === '}}') {
            const start = stack.pop();
            const text = list.slice(start, i+1);
            const translatedText = translateTemplate(text.join(''));
            list.splice(start, i - start + 1, translatedText);
            i = start + 1;
        }
    }
    return list
}

function translateTemplate(txt) {
    var titre = left(left(left(right(txt, "{{"), "}}"), "|"), ":").trim().toLowerCase();
    if (titre in dicoTemplate) {
        return dicoTemplate[titre](txt);
    } else {
        console.log("error - template :'" + titre + "' not handled");
        return right(txt, "}}")
    }
}


var valid = document.getElementById('valid');
var parle = document.getElementById('parle');

valid.addEventListener('click', function () {
    var txt = parle.value;
    document.getElementById('resultat').value = translate(txt);
}, false);

parle.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        valid.click();
    }
});