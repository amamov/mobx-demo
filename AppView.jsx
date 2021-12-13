import React from "react";

export default function AppView({
  isLoggingIn,
  isAuthenticated,
  user,
  loggingCount,
  helloUser,
  currentName,
  currentPassword,
  handleLogInClick,
  handleLogOutClick,
  handleChangeName,
  handleChangePassword,
}) {
  return (
    <main>
      {isLoggingIn ? (
        <div>로그인 중</div>
      ) : user ? (
        <div>{helloUser}</div>
      ) : (
        "로그인 해주세요."
      )}
      <div>{loggingCount}</div>
      <input
        type="text"
        value={currentName}
        onChange={handleChangeName}
        placeholder="이름 입력"
      />
      <input
        type="password"
        value={currentPassword}
        onChange={handleChangePassword}
        placeholder="비밀번호 입력"
      />
      {!isAuthenticated ? (
        <button onClick={handleLogInClick}>로그인</button>
      ) : (
        <button onClick={handleLogOutClick}>로그아웃</button>
      )}
    </main>
  );
}
