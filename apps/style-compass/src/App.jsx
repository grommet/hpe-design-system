import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Grommet } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { StyleCompass } from './routes/StyleCompass';

function App() {
  return (
    <Grommet
      theme={hpe}
      themeMode="light"
      full="min"
      options={{ box: { cssGap: true } }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<StyleCompass />} />
        </Routes>
      </BrowserRouter>
    </Grommet>
  );
}

export default App;
