import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AccentProvider } from './components/AccentContext.jsx';
import PasswordGate from './components/PasswordGate.jsx';
import AppLayout from './layouts/AppLayout.jsx';
import IndexPage from './pages/IndexPage.jsx';
import FoundationsPage from './pages/FoundationsPage.jsx';
import HomepagePage from './pages/HomepagePage.jsx';
import MapPage from './pages/MapPage.jsx';
import IconsPage from './pages/IconsPage.jsx';
import DestinationLandingPage from './pages/DestinationLandingPage.jsx';
import DestinationLandingTemplatePage from './pages/DestinationLandingTemplatePage.jsx';
import DestinationT1Page from './pages/DestinationT1Page.jsx';
import DestinationT2Page from './pages/DestinationT2Page.jsx';
import DestinationT3Page from './pages/DestinationT3Page.jsx';
import ItineraryPage from './pages/ItineraryPage.jsx';
import JourneyTypePage from './pages/JourneyTypePage.jsx';
import JourneyFinderPage from './pages/JourneyFinderPage.jsx';
import InspirationPage from './pages/InspirationPage.jsx';
import EnquiryPage from './pages/EnquiryPage.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AccentProvider>
      <PasswordGate>
      <BrowserRouter>
        <Routes>
          {/* Fullscreen — no sidebar layout */}
          <Route path="/homepage" element={<HomepagePage />} />

          {/* All other pages use the sidebar layout */}
          <Route element={<AppLayout />}>
            <Route index element={<IndexPage />} />
            <Route path="foundations" element={<FoundationsPage />} />
            <Route path="maps" element={<MapPage />} />
            <Route path="icons" element={<IconsPage />} />
            <Route path="destinations" element={<DestinationLandingPage />} />
            <Route path="destination-landing" element={<DestinationLandingTemplatePage />} />
            <Route path="destination-t1" element={<DestinationT1Page />} />
            <Route path="destination-t2" element={<DestinationT2Page />} />
            <Route path="destination-t3" element={<DestinationT3Page />} />
            <Route path="itinerary" element={<ItineraryPage />} />
            <Route path="journey-type" element={<JourneyTypePage />} />
            <Route path="journey-finder" element={<JourneyFinderPage />} />
            <Route path="inspiration" element={<InspirationPage />} />
            <Route path="enquiry" element={<EnquiryPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </PasswordGate>
    </AccentProvider>
  </React.StrictMode>
);
