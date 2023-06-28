class Auth {
  constructor(options) {
    this.url = options.baseUrl;
    this.headers = options.headers;
  }




  signUp(userEmail, userPassword) {
    return fetch (`${this.url}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        password: userPassword,
        email: userEmail,
      })
    });
  }



  signIn() {

  }


}

export const auth = new Auth({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
});
