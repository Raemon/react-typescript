import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';

const colorRatingToHSV0 = (rating: number) => {
  if (rating === 100) {
    console.log("100")
    return `hsl(120, 30%, 80%)`;
  }
  const hue = 0 //rating * 0.15; // Shifts from 0 to 15 (slight orange) as rating increases
  const saturation = 80 - (rating * 0.6); // Scales from 60% to 20% as rating increases
  const lightness = 30 + (rating * 0.8); // Scales 1-100 to 20-100
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
const colorRatingToHSV05 = (rating: number) => {
  if (rating <= 50) {
    // Transition from red to light gray
    const hue = rating * 0.35; // Red hue
    const saturation = 100 - (rating / 50) * 100; // Decrease saturation from 100% to 0%
    const lightness = 30 + (rating / 50) * 60; // Increase lightness from 30% to 90%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  } else {
    // Transition from light gray to dark green
    const hue = 120 * .65// Increase hue from 0 to 120
    const saturation = ((rating - 50) / 50) * 100; // Increase saturation from 0% to 100%
    const lightness = 90 - ((rating - 50) / 50) * 60; // Decrease lightness from 90% to 30%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }
};
const colorRatingToHSV10 = (rating: number) => {
  const hue = 0;
  const saturation = 100 - rating;
  const lightness = 50 + (rating / 2);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
const colorRatingToHSV20 = (rating: number) => {
  const hue = (rating / 100) * 120 - 10;
  const saturation = 80
  const lightness = 40
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export const homes = [
  {HomeComponent: Home, colorRatingToHSV: colorRatingToHSV0, height: 27, background: "#181a2c", color: "white"},
]

const App = (): JSX.Element => {
  return (
    <React.StrictMode>
      <BrowserRouter basename={"/ailabwatch-experimenting"}>
        <Routes>
          <Route
            path="/"
            element={
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0, padding: 0, margin: 0, width: '100vw', height: '100vh', }}>
                {homes.map(({ HomeComponent, ...props }, index) => (
                  <div key={index} style={{ width: '200%', height: '200%', transform: 'scale(0.5)', transformOrigin: 'top left', }}>
                    <HomeComponent {...props} first={false} v={index} />
                  </div>
                ))}
              </div>
            }
          />
          {homes.map(({ HomeComponent, ...props }, index) => (
            <Route key={index} path={`/${index}`} element={<HomeComponent {...props} v={index} />} />
          ))}
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App
