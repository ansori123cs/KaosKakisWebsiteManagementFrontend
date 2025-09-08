// import { BrowserRouter as Router, Routes, Route } from "react-router";
// import SignIn from "./pages/AuthPages/SignIn";
// import SignUp from "./pages/AuthPages/SignUp";
// import NotFound from "./pages/OtherPage/NotFound";
// import UserProfiles from "./pages/UserProfiles";
// import Videos from "./pages/UiElements/Videos";
// import Images from "./pages/UiElements/Images";
// import Alerts from "./pages/UiElements/Alerts";
// import Badges from "./pages/UiElements/Badges";
// import Avatars from "./pages/UiElements/Avatars";
// import Buttons from "./pages/UiElements/Buttons";
// import LineChart from "./pages/Charts/LineChart";
// import BarChart from "./pages/Charts/BarChart";
// import Calendar from "./pages/Calendar";
// import BasicTables from "./pages/Tables/BasicTables";
// import FormElements from "./pages/Forms/FormElements";
// import Blank from "./pages/Blank";
// import AppLayout from "./layout/AppLayout";
// import { ScrollToTop } from "./components/common/ScrollToTop";
// import Home from "./pages/Dashboard/Home";

// export default function App() {
//   return (
//     <>
//       <Router>
//         <ScrollToTop />
//         <Routes>
//           {/* Dashboard Layout */}
//           <Route element={<AppLayout />}>
//             <Route index path="/" element={<Home />} />

//             {/* Others Page */}
//             <Route path="/profile" element={<UserProfiles />} />
//             <Route path="/calendar" element={<Calendar />} />
//             <Route path="/blank" element={<Blank />} />

//             {/* Forms */}
//             <Route path="/form-elements" element={<FormElements />} />

//             {/* Tables */}
//             <Route path="/basic-tables" element={<BasicTables />} />

//             {/* Ui Elements */}
//             <Route path="/alerts" element={<Alerts />} />
//             <Route path="/avatars" element={<Avatars />} />
//             <Route path="/badge" element={<Badges />} />
//             <Route path="/buttons" element={<Buttons />} />
//             <Route path="/images" element={<Images />} />
//             <Route path="/videos" element={<Videos />} />

//             {/* Charts */}
//             <Route path="/line-chart" element={<LineChart />} />
//             <Route path="/bar-chart" element={<BarChart />} />
//           </Route>

//           {/* Auth Layout */}
//           <Route path="/signin" element={<SignIn />} />
//           <Route path="/signup" element={<SignUp />} />

//           {/* Fallback Route */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </Router>
//     </>
//   );
// }
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/AuthPages/SignIn';
import SignUp from './pages/AuthPages/SignUp';
import NotFound from './pages/OtherPage/NotFound';
import UserProfiles from './pages/UserProfiles';
import Videos from './pages/UiElements/Videos';
import Images from './pages/UiElements/Images';
import Alerts from './pages/UiElements/Alerts';
import Badges from './pages/UiElements/Badges';
import Avatars from './pages/UiElements/Avatars';
import Buttons from './pages/UiElements/Buttons';
import LineChart from './pages/Charts/LineChart';
import BarChart from './pages/Charts/BarChart';
import Calendar from './pages/Calendar';
import BasicTables from './pages/Tables/BasicTables';
import FormElements from './pages/Forms/FormElements';
import Blank from './pages/Blank';
import AppLayout from './layout/AppLayout';
import { ScrollToTop } from './components/common/ScrollToTop';
import Home from './pages/Dashboard/Home';
import ProtectedRoute from './routes/ProtectedRoute';
import LandingPage from './routes/user/LandingPage';
import DashboardPage from './routes/admin/dashboard/DashboardPage';
import UkuranPage from './routes/admin/master/ukuran/UkuranPage';
import WarnaPage from './routes/admin/master/warna/WarnaPage';
import MesinPage from './routes/admin/master/mesin/MesinPage';
import BahanPage from './routes/admin/master/bahan/BahanPage';
import FormAddBahan from './routes/admin/master/bahan/FormAddBahan';
import FormEditBahan from './routes/admin/master/bahan/FormEditBahan';
import FormAddMesin from './routes/admin/master/mesin/FormAddMesin';
import FormEditMesin from './routes/admin/master/mesin/FormEditMesin';
import FormAddUkuran from './routes/admin/master/ukuran/FormAddUkuran';
import FormEditUkuran from './routes/admin/master/ukuran/FormEditUkuran';
import FormAddWarna from './routes/admin/master/warna/FormAddWarna';
import FormEditWarna from './routes/admin/master/warna/FormEditWarna';
import KaosKakiPage from './routes/admin/kaos-kakis/KaosKakiPage';
import FormAddKaosKaki from './routes/admin/kaos-kakis/FormAddKaosKaki';
import FormEditKaosKaki from './routes/admin/kaos-kakis/FormEditKaosKaki';
import DetailKaosKaki from './routes/admin/kaos-kakis/DetailKaosKaki';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* user anonymus */}
        {/* Homepage */}
        <Route index path='/' element={<LandingPage />} />

        {/* admin page */}
        <Route element={<AppLayout />}>
          {/* dashboar page */}
          <Route index path='/dashboard' element={<DashboardPage />} />
          {/* master page */}
          {/* master jenis bahan */}
          <Route path='/bahan' element={<BahanPage />} />
          <Route path='/bahan/new' element={<FormAddBahan />} />
          <Route path='/bahan/edit/:id' element={<FormEditBahan />} />
          {/* master jenis ukuran */}
          <Route path='/ukuran' element={<UkuranPage />} />
          <Route path='/ukuran/new' element={<FormAddUkuran />} />
          <Route path='/ukuran/edit/:id' element={<FormEditUkuran />} />
          {/* master jenis warna */}
          <Route path='/warna' element={<WarnaPage />} />
          <Route path='/warna/new' element={<FormAddWarna />} />
          <Route path='/warna/edit/:id' element={<FormEditWarna />} />
          {/* master jenis warnamesin */}
          <Route path='/mesin' element={<MesinPage />} />
          <Route path='/mesin/new' element={<FormAddMesin />} />
          <Route path='/mesin/edit/:id' element={<FormEditMesin />} />

          {/* kaos-kaki page */}
          <Route path='/kaos-kaki' element={<KaosKakiPage />} />
          <Route path='/kaos-kaki/new' element={<FormAddKaosKaki />} />
          <Route path='/kaos-kaki/edit/:id' element={<FormEditKaosKaki />} />
          <Route path='/kaos-kaki/detail/:id' element={<DetailKaosKaki />} />
        </Route>

        {/* Dashboard Layout */}
        <Route element={<AppLayout />}>
          <Route index path='/template' element={<Home />} />

          {/* Protected - hanya user login */}
          <Route
            path='/profile'
            element={
              <ProtectedRoute role='user'>
                <UserProfiles />
              </ProtectedRoute>
            }
          />

          {/* Protected - hanya admin */}
          <Route
            path='/calendar'
            element={
              <ProtectedRoute role='admin'>
                <Calendar />
              </ProtectedRoute>
            }
          />

          {/* Others */}
          <Route path='/blank' element={<Blank />} />
          <Route path='/form-elements' element={<FormElements />} />
          <Route path='/basic-tables' element={<BasicTables />} />
          <Route path='/alerts' element={<Alerts />} />
          <Route path='/avatars' element={<Avatars />} />
          <Route path='/badge' element={<Badges />} />
          <Route path='/buttons' element={<Buttons />} />
          <Route path='/images' element={<Images />} />
          <Route path='/videos' element={<Videos />} />
          <Route path='/line-chart' element={<LineChart />} />
          <Route path='/bar-chart' element={<BarChart />} />
        </Route>

        {/* Auth */}
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />

        {/* Fallback */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}
