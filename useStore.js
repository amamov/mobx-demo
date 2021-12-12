import { userStore, postStore } from "./store";

export default function useStore() {
  return { userStore, postStore };
}
