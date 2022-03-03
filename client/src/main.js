import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";



// 5. Create and mount the root instance.
const app = createApp(App);

app.use(router);

app.mount("#app");

// Now the app has started!
