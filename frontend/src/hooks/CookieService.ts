import Cookies from 'js-cookie';


function addTokenToCookies(token : string){
    Cookies.set('user-auth-example-jwt', token, {expires : 7});
}

function getTokenFromCookies() : string | undefined {
    let token = Cookies.get('user-auth-example-jwt');
    if (token === undefined) {
        console.log("token no present");
    }else{
        console.log("token aquired successfully")
    }
    return token;
}

function removeTokenFromCookies(){
    Cookies.remove('user-auth-example-jwt');
}

export {addTokenToCookies, getTokenFromCookies, removeTokenFromCookies}