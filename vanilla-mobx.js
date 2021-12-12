//* npm run vanilla

const { observable, autorun, runInAction, reaction, action } = require("mobx");

/*
 * observable state : 관찰 가능한 상태(데이터)
 */
const state = observable({
  dataA: "This is dataA.",
  dataB: 17,
  dataC: [1, 2, 3],
  dataD: {
    name: "yoon sang seok",
    nickname1: "kyle",
    nickname2: "amamov",
  },
});

/*
 * action(fn)
 * observable state를 갱신하는 함수
 * 사용예시 : change("hello mobx!!")
 */
const change = action((data) => {
  state.dataA = data;
});

/*
 * runInAction(fn)
 * observable state를 즉시 갱신하는 함수
 */
runInAction(() => {
  state.dataA = "hello mobx";
  state.dataB = 123;
});

runInAction(() => {
  state.dataC = null;
});

change();

/*
 * autorun(fn)
 * 모든 observable state에 대해 action이 발생할때마다 실행된다.
 */
autorun(() => {
  console.log("action!!");
  console.log(state);
});

/*
 * reaction(fn)
 * 특정 observable state에 대해 action이 발생할때마다 실행된다.
 */
reaction(
  () => {
    // return state의 dataC가 바뀌었을때만 실행된다.
    return state.dataC;
  },
  () => {
    console.log("reaction!!");
  }
);
