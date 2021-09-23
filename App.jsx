import React, { useCallback } from "react";
import { observer, useLocalObservable } from "mobx-react";
import useStore from "./useStore";

// https://mobx-react.js.org/state-outsourcing : Props들을 observable로 바꿔주는 법

function App() {
  // useStore을 사용하지 않고 그냥 import에서 바로 불러와서 사용해도 된다.
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
