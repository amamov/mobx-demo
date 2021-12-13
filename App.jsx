import React, { useCallback } from "react";
import { observer, useLocalObservable } from "mobx-react";
import useStore from "./stores/useStore";
import AppView from "./AppView";

function App() {
  //* State Dependency Injection (State 의존성 주입)
  const { userStore } = useStore();

  const localState = useLocalObservable(() => ({
    //* local observable state
    currentName: "",
    currentPassword: "",

    //* action
    handleChangeName(event) {
      this.currentName = event.target.value;
    },
    handleChangePassword(event) {
      this.currentPassword = event.target.value;
    },
  }));

  const handleLogInClick = useCallback(() => {
    const name = localState.currentName;
    const password = localState.currentPassword;
    if (name && password) {
      userStore.logIn({
        name,
        password,
      });
    } else {
      alert("이름과 비밀번호를 입력해주세요. (아무거나 작성 가능)");
    }
  }, []);

  const handleLogOutClick = useCallback(() => {
    userStore.logOut();
  }, []);

  return (
    <AppView
      currentName={localState.currentName}
      currentPassword={localState.currentPassword}
      handleChangeName={localState.handleChangeName}
      handleChangePassword={localState.handleChangePassword}
      isLoggingIn={userStore.isLoggingIn}
      isAuthenticated={userStore.isAuthenticated}
      loggingCount={userStore.loggingCount}
      user={userStore.user}
      helloUser={userStore.helloUser}
      handleLogInClick={handleLogInClick}
      handleLogOutClick={handleLogOutClick}
    />
  );
}

export default observer(App);
