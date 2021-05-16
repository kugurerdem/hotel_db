// Example POST method implementation:
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

async function getData(url = ''){
    return fetch(url)
        .then( (response) => response.json() )
        .then( (obj) => obj.data )
}

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";"
}

function getCookie(cname){
    let cookies = document.cookie.replace(/\s/g, '').split(";");
    for(let i = 0; i < cookies.length; i++){
        let expressions = cookies[i].split("=");
        let left = expressions[0];
        let right = expressions[1];
        // console.log(left);
        if( left == cname){
            return right;
        }
    }

    return null;
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

function getValueOfSelector(selector_id){
    let selector = document.getElementById(selector_id);
    let index = selector.selectedIndex;

    return index;
  }

function getTextOfSelector(selector_id){
    let selector = document.getElementById(selector_id);
    return selector.options[ getValueOfSelector(selector_id)].text;
}

function clearSelector(selector){
    let options = selector.options;
    for(let i = options.length - 1; options.length > 1; i--){
      options[i] = null;
    }
  }
