function changeFraction(str){
    //str : string
    //changes every fraction character (eg :"⅛") in the string into a fraction looking like " 1/8"
    //return : string
    var str2 = "";
    for (var i=0; i<str.length;i++){
        if(str[i]=="⅛"){
            var x = " 1/8";
        } else 
        if(str[i]=="¼"){
            var x = " 1/4";
        } else 
        if(str[i]=="⅜"){
            var x = " 3/8";
        } else 
        if(str[i]=="½"){
            var x = " 1/2";
        } else 
        if(str[i]=="⅝"){
            var x = " 5/8";
        } else 
        if(str[i]=="¾"){
            var x = " 3/4";
        } else 
        if(str[i]=="⅞"){
            var x = " 7/8";
        } else {
            var x = str[i];
        }
        str2 = str2 + x;
    }
    return str2
}

function getValueFromStringWithFraction(str){
    //str : string
    //get the numerical value of a sting with a fraction
    //return : float 
    value = changeFraction(str);
    value = value.split(' ');
    var y =0;
    for (var x of value){
        var z = eval(x);
        if (!Number.isNaN(z) && z!=undefined){
            y+=z;                    
        }
    }
    return y
}

function formatnum(str) {
    //str : string
    //transforms a number into a french format by replacing . by ,
    //and adding the french wikipedia template formatnum for number above 1000
    //return : string
    if (str==undefined){
        return undefined;
    };
    var str = str.trim();
    var str2 = str.split("\'\'\'");
    
    
    if (str2.length>1){
        str3 = str2[1].split(',');
        if (str3.length>1 && !isNaN(str2[1])){
            str3.unshift("{{formatnum:")
            str3.push("}}");
        }
        str2[1] = str3.join('');
        str = str2.join("\'\'\'");
    } else {
        str2 = str.trim();
        str3 = str2.split(',');
        if (str3.length>1){
            str3.unshift(" {{formatnum:")
            str3.push("}} ");
            str = str3.join('');
        }
    }
    str = str.split('.');
    str = str.join(',');
    str = str.split('\n');
    str = str.join('');
    return str
}