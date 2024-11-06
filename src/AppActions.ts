import { action } from "mobx";
import AppStore from "./AppStore";

//Manage the store
export const AppActions = {
  setAuthToken: action((token: string): void => {
    AppStore.authToken = token;
  }),
}

export default AppActions;