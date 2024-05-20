import { createStore } from "vuex";
import users from "./users";
import businesses from "./businesses";
import talents from "./talents";
import sectors from "./sectors";
import offers from "./offers";
import candidacies from "./candidacies";
import stats from "./stats";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    users,
    businesses,
    talents,
    sectors,
    offers,
    candidacies,
    stats,
  },
});
