export default async function({ $axios, $auth }) {
    if (!$auth.loggedIn) {
        return;
    }

    let token = window.localStorage.getItem("auth_token");
    console.debug("auth token: ", token);
    if (!token) {
        //token cookie not exists
        //do login with server.
        console.debug('do login with server');

        let method = $auth.strategy.name;
        var userToken = "";
        switch (method) {
            case 'google':
                userToken = $auth.$storage.getState("_token." + method);
                break;
            default:
                console.error("login method not defined.");
                alert('login failed');
                return;
        }

        let reqData = {
            'method': method,
            'token': userToken,
            'email': $auth.user.email,
        };
        console.debug("reqData", reqData);

        try {
            let resp = await $axios.post('login', reqData);
            let authToken = resp.data.token;
            window.localStorage.setItem("auth_token", authToken);
            console.log("setAuthToken OK");
        } catch (e) {
            alert("与服务器的通讯发生错误了" + e);
            return;
        }
    }
}