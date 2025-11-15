import { Navigate, Route, Routes } from 'react-router-dom';
import Topbar from './scenes/global/Topbar.jsx';
import Sidebar from './scenes/global/Sidebar.jsx';
import Playlists from './scenes/Playlists/index.jsx';
import Stats from './scenes/Stats/index.jsx';
import {
  THEME_ID as MATERIAL_THEME_ID,
  ThemeProvider,
} from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { materialTheme } from './theme.js';
import MusicPlayerBar from './scenes/global/MusicPlayerBar.jsx';

function App() {
  return (
    <ThemeProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider defaultColorScheme={'dark'}>
        <CssBaseline enableColorScheme />
        <div className="app">
          <Sidebar style={{ height: '100vh', position: 'fixed' }} />
          <main className="content">
            {/*<Topbar/>*/}
            <Routes>
              {/* redirect from / to /playlists */}
              <Route path="/" element={<Navigate to="/playlists" replace />} />
              <Route path="/playlists" element={<Playlists />} />
              <Route path="/stats" element={<Stats />} />
            </Routes>
          </main>
          <MusicPlayerBar />
        </div>
      </JoyCssVarsProvider>
    </ThemeProvider>
  );
}

export default App;
