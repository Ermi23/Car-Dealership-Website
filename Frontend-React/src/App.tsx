// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';

// const App: React.FC = () => {
// 	return (
// 		<Router>
// 			<Routes>
// 				<Route path="/" element={<Home />} />
// 			</Routes>
// 		</Router>
// 	);
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';

const App: React.FC = () => {
	return (
		<Router>
			<AppRoutes />
		</Router>
	);
};

export default App;