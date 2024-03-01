var keycloak = new Keycloak();

function initKeycloak() {
    keycloak.init({ onLoad: 'login-required' }).then(function (authenticated) {
        getIn4User(keycloak.idTokenParsed);
        pasteToken(keycloak.token);
        alert(authenticated ? 'Xác thực thành công' : 'chưa được xác thực');
    }).catch(function () {
        alert('chưa được khởi tạo');
    });
}

function getIn4User(keycloakToken) {
    document.getElementById('username').innerHTML = keycloakToken.preferred_username;
    document.getElementById('firstName').innerHTML = keycloakToken.given_name;
    document.getElementById('lastName').innerHTML = keycloakToken.family_name;
    document.getElementById('name').innerHTML = keycloakToken.name;
    document.getElementById('email').innerHTML = keycloakToken.email;
}

function pasteToken(token) {
    document.getElementById('ta-token').value = token;
    document.getElementById('ta-refreshToken').value = keycloak.refreshToken;
}

var refreshToken = function () {
    keycloak.updateToken(-1)
        .then(function () {
            document.getElementById('ta-token').value = keycloak.token;
            document.getElementById('ta-refreshToken').value = keycloak.refreshToken;
        });
}

var logout = function () {
    keycloak.logout({ "redirectUri": "http://localhost:7070/logout.html" });
}