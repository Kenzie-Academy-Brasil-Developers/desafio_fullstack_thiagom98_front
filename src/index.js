import ReactDom from "react-dom";
import App from "./App"

import 'react-toastify/dist/ReactToastify.css';

import './assets/styles/reset.css';
import './assets/styles/style.css';

ReactDom.render(<App />, document.querySelector(".root"));