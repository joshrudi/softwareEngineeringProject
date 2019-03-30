function write_cookie(id_token) {
    document.cookie = id_token;
}

function read_cookie() {
    return document.cookie;
}
