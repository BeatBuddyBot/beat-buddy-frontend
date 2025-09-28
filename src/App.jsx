import {ColorModeContext, useMode} from "./theme.js";
import {CssBaseline, ThemeProvider} from "@mui/material";
import Topbar from "./scenes/global/Topbar.jsx";
import {Routes, Route} from "react-router-dom";
import Playlists from "./scenes/Playlists/index.jsx";
import Stats from "./scenes/Stats/index.jsx";
import Sidebar from "./scenes/global/Sidebar.jsx";
import PlaylistDetails from "./scenes/PlaylistDetails/index.jsx";


function App() {
    const [theme, colorMode] = useMode();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <Sidebar
                        style={{
                            height: '100vh',
                            position: 'fixed',
                        }}
                    />
                    <main className="content">
                        <Topbar />
                        <Routes>
                            <Route path='/playlists' element={<Playlists/>} />
                            <Route path='/playlists/:id' element={<PlaylistDetails />} />
                            <Route path='/stats' element={<Stats/>} />
                        </Routes>

                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default App
