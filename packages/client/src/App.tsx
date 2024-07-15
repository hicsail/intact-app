import { ThemeProvider } from './theme/theme.provider.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppBarLayout } from './layouts/app-bar.layout.tsx';
import { Paths } from './constants/paths.ts';
import { HomePage } from './pages/home.page.tsx';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route element={<AppBarLayout />}>
            <Route path={Paths.HOME} element={<HomePage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
