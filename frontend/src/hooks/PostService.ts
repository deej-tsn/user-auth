import { getTokenFromCookies } from "./CookieService";


async function getPostsFromRank(rank : string) {
    let responseMessages = await fetch(`http://localhost:1323/posts/${rank}`,{
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url 
        });
    const res = await responseMessages;
    console.log(res);
    if(responseMessages.status == 200) return await res.json()
    return null;
}

async function getPostsFromToken() {
    const token = getTokenFromCookies();
    if (token === undefined) {
        return null;
    }
    let data = {jwt : token};
    let responseMessages = await fetch('http://localhost:1323/posts',{
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), 
        });
    const res = await responseMessages;
    console.log(res);
    if(responseMessages.status == 200) return await res.json()
    return null;
}

export {getPostsFromToken, getPostsFromRank}