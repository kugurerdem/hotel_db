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

function setCookie(cname, cvalue, exdays=1) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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

function getValueOfSelector(selector_id){
    let selector = document.getElementById(selector_id);
    let index = selector.selectedIndex;

    return index;
  }

function getTextOfSelector(selector_id){
    let selector = document.getElementById(selector_id);
return selector.options[ getValueOfSelector(selector_id)].text;
}
