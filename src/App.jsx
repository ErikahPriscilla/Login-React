// import Login from "./components/props/Login.jsx";
// import Login from "./components/state/Login.jsx";
// import Login from "./components/CSS/Login.jsx";
//import Login from './components/tailwind/Login.jsx';

import { BrowserRouter as Router } from 'react-router-dom';

import AppRoutes from './routes/AppRoutes.jsx';

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
