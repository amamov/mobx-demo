const { observable, autorun, runInAction, reaction, action } = require("mobx");

// 전역 state, observable이 state를 관리한다.
const state = observable({
  dataA: "dataA",
  dataB: 17,
  dataC: [1, 2, 3],
});

// observable state가 바뀔때마다(action이 발생할때마다) 실행된다. 모든 state에 대해
autorun(() => {
  console.log("action!!");
  console.log(state);
});

// observable state가 바뀔때마다(action이 발생할때마다) 실행된다. 특정 state에 대해
reaction(
  () => {
    // return state의 dataC가 바뀌었을때만 실행된다.
    return state.dataC;
  },
  () => {
    console.log("reaction!!");
  }
);

// action을 하나로 묶는다. (실행하고 싶을때 실행한다.)
const change = action(() => {
  state.dataA = "hello mobx!!!";
});

// action을 하나로 묶는다. (즉시 실행된다.)
runInAction(() => {
  state.dataA = "hello mobx";
  state.dataB = 123;
});

runInAction(() => {
  state.dataC = null;
});

change();
