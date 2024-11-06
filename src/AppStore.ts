import { observable } from "mobx";
import { TAppStore } from "./types";

//Save token
export const AppStore: TAppStore = observable({ 
  authToken: null,
});

export default AppStore;