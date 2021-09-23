import React, { useCallback } from "react";
import { observer, useLocalObservable } from "mobx-react";
import useStore from "./useStore";

function App() {
  const { userStore, postStore } = useStore();

  const localState = useLocalObservable(() => ({
    name: "",
    password: "",
    handleChangeName(e) {
      this.name = e.target.value;
    },
    handleChangePassword(e) {
      this.password = e.target.value;
    },
  }));

  const handleLogInClick = useCallback(() => {
    userStore.logIn({
      nickname: "amamov",
      password: "비밀번호",
    });
  }, []);

  const handleLogOutClick = useCallback(() => {
    userStore.logOut();
  }, []);

  return (
    <main>
      {userStore.isLoggingIn ? (
        <div>로그인 중</div>
      ) : userStore.data ? (
        <div>{userStore.data.nickname}</div>
      ) : (
        "로그인 해주세요."
      )}
      {!userStore.data ? (
        <button onClick={handleLogInClick}>로그인</button>
      ) : (
        <button onClick={handleLogOutClick}>로그아웃</button>
      )}
      <div>{postStore.postLength}</div>
      <input value={localState.name} onChange={localState.handleChangeName} />
      <input
        value={localState.password}
        type="password"
        onChange={localState.handleChangePassword}
      />
    </main>
  );
}

export default observer(App);
