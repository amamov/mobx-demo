const { observable, action } = require("mobx");

const postStore = observable({
  data: [],
  addPost(data) {
    this.data.push(data);
  },
  get postLength() {
    return this.data.length; // computed
  },
});

const userStore = observable({
  isLoggingIn: false,
  data: null,
  logIn(data) {
    this.isLoggingIn = true;
    // 비동기 로직
    setTimeout(
      action(() => {
        this.data = data;
        this.isLoggingIn = false;
        postStore.data.push(1);
      }),
      2000
    );
  },
  logOut() {
    this.data = null;
  },
});

export { userStore, postStore };
