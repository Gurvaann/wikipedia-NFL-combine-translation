class Combine {
    constructor(tab) {
        this.heightft = undefined;
        this.heightin = undefined;
        this.weight = undefined;
        this.dash = undefined;
        this.tensplit = undefined;
        this.twentysplit = undefined;
        this.shuttle = undefined;
        this.conedrill = undefined;
        this.vertical = undefined;
        this.broadft = undefined;
        this.broadin = undefined;
        this.bench = undefined;
        this.armspan = undefined;
        this.handspan = undefined;
        this.wonderlic = undefined;

        this.getValues(tab);
    }

    getValues(tab) {
        for (var element of tab) {
            var tab2 = element.split("=");
            var name = tab2[0].split(' ');
            name = name.join('');
            if (name in this) {
                var value = tab2[1].split('\n');
                value = value.join('').trim();
                if (value != "") {
                    this[name] = value;
                }
            }
        }
    }

    get height_m() {
        if (this.heightin == undefined) {
            return undefined;
        }
        var y = getValueFromStringWithFraction(this.heightin);
        return Math.floor(this.heightft * 30.48 + y * 2.54 + .5) / 100;
    }

    get horizontal_m() {
        if (this.broadin == undefined) {
            return undefined;
        }
        var y = getValueFromStringWithFraction(this.broadin);
        return Math.floor(this.broadft * 30.48 + y * 2.54 + .5) / 100;
    }

    get weight_kg() {
        if (this.weight == undefined) {
            return undefined;
        }
        return Math.floor(this.weight * .4536 + .5);
    }

    get hand_cm() {
        if (this.handspan == undefined) {
            return undefined;
        }
        var y = getValueFromStringWithFraction(this.handspan);
        return Math.floor(y * 2.54 + .5);
    }

    get arm_cm() {
        if (this.armspan == undefined) {
            return undefined;
        }
        var y = getValueFromStringWithFraction(this.armspan);
        return Math.floor(y * 2.54 + .5);
    }

    get vertical_cm() {
        if (this.vertical == undefined) {
            return undefined;
        }
        var y = getValueFromStringWithFraction(this.vertical);
        return Math.floor(y * 2.54 + .5);
    }

    static translate(str) {
        var tab = str.split('<ref>');
        var res = "{{NFL Scouting Combine \n| nom = ";
        if (tab.length > 1) {
            res = res + Combine.guessNameFromRef(tab[1]);
        }
        res = res + Combine.writeReferences(tab);
        var combine = new Combine(tab[0].split("|"));
        res = res + combine.writeValues() + "}}";
        return res;
    }

    static guessNameFromRef(ref) {
        //guess the player name from the ref
        //doesn't work for all cases
        //suppose the ref uses the french template
        var name = right(ref, 'titre');
        name = name.split('|');
        name = destroy(name[0], ["=", "Draft", "and ", "NFL", "Combine", "Profile", "Prospect", " - ", ",", "Stats", "News", "Video", "OG", "College"]);
        return name.trim()
    }

    static writeReferences(tab) {
        var res = "";
        for (var i = 1; i < tab.length; i++) {
            res = res + "<ref>" + left(tab[i], "</ref>") + "</ref>";
            if (i < tab.length - 1) {
                res += "{{,}}";
            }
        }
        return res;
    }

    writeValues() {
        var res = "";
        res += "\n| poids = " + (this.weight_kg != undefined ? this.weight_kg + " kg\<br\>(" + this.weight + " lbs)" : "-");
        res += "\n| taille = " + (this.height_m != undefined ? this.height_m + " m\<br\>(" + this.heightft + " ft " + this.heightin + " in)" : "-");
        res += "\n| bras = " + (this.arm_cm != undefined ? this.arm_cm + " cm\<br\>(" + this.armspan + " in)" : "-");
        res += "\n| main = " + (this.hand_cm != undefined ? this.hand_cm + " cm\<br\>(" + this.handspan + " in)" : "-");
        res += "\n| 40 sprint = " + (this.dash != undefined ? this.dash + " s" : "-");
        res += "\n| 10 sprint = " + (this.tensplit != undefined ? this.tensplit + " s" : "-");
        res += "\n| 20 sprint = " + (this.twentysplit != undefined ? this.twentysplit + " s" : "-");
        res += "\n| 20 shuttle = " + (this.shuttle != undefined ? this.shuttle + " s" : "-");
        res += "\n| cone = " + (this.conedrill != undefined ? this.conedrill + " s" : "-");
        res += "\n| vertical = " + (this.vertical_cm != undefined ? this.vertical_cm + " cm\<br\>(" + this.vertical + " in)" : "-");
        res += "\n| horizontal = " + (this.horizontal_m != undefined ? this.horizontal_m + " m\<br\>(" + this.broadft + " ft " + this.broadin + " in)" : "-");
        res += "\n| DP = " + (this.bench != undefined ? this.bench : "-");
        res += "\n| Wonderlic = " + (this.wonderlic != undefined ? this.wonderlic : "-");
        res = res.split('.');
        res = res.join(',');
        return res;
    }
}