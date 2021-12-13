import { observable, action } from "mobx";

export const userStore = observable({
  //* observable state
  isLoggingIn: false,
  isAuthenticated: false,
  loggingCount: 0,
  user: {
    name: "",
    password: "",
  },

  //* action
  logIn(userData) {
    // action이 이미 감싸져 있음 (observable 감싸져 있기 때문)
    this.isLoggingIn = true;

    // 비동기 로직 (API)
    setTimeout(
      action(() => {
        this.user = userData;
        this.isLoggingIn = false;
        this.isAuthenticated = true;
        this.loggingCount++;
      }),
      2000
    );
  },
  logOut() {
    this.user = {
      name: "",
      password: "",
    };
    this.isAuthenticated = false;
  },

  //* computed value
  get helloUser() {
    if (this.isAuthenticated) return `${this.user.name} 안녕하세요!`;
    else `로그인해주세요!`;
  },
});
