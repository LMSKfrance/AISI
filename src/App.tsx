import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Toolbar } from './components/Toolbar';
import { FlowCanvas } from './components/FlowCanvas';
import { Inspector } from './components/Inspector';
import { Footer } from './components/Footer';
import { BirthDataPage } from './pages/BirthDataPage';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { AisiAdminDesignSystemPage } from './pages/admin/AisiAdminDesignSystemPage';
import { isAdmin } from './auth/adminAuth';
import styles from './App.module.css';

function NodesPage() {
  return (
    <>
      <Toolbar dnaNumber="05" title="Analysis Workspace / Node Graph" />
      <FlowCanvas />
      <Inspector />
      <Footer />
    </>
  );
}

function PlaceholderPage({ title, num }: { title: string; num: string }) {
  return (
    <>
      <Toolbar dnaNumber={num} title={title} />
      <div className={styles.placeholder}>
        <span className={styles.dnaNumber}>{num}</span>
        <span className={styles.dnaUppercase}>{title}</span>
      </div>
      <Footer />
    </>
  );
}

function AdminGate() {
  return isAdmin() ? <AdminDashboard /> : <AdminLogin />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/design-system" element={isAdmin() ? <AisiAdminDesignSystemPage /> : <Navigate to="/admin" replace />} />
        <Route path="/admin" element={<AdminGate />} />
        <Route
          path="/*"
          element={
            <div className={styles.appLayout}>
              <Sidebar />
              <Routes>
                <Route path="/" element={<BirthDataPage />} />
                <Route path="/nodes" element={<NodesPage />} />
                <Route path="/chart" element={<PlaceholderPage title="Chart" num="01" />} />
                <Route path="/calendar" element={<PlaceholderPage title="Calendar" num="02" />} />
                <Route path="/decisions" element={<PlaceholderPage title="Decisions" num="03" />} />
                <Route path="/compare" element={<PlaceholderPage title="Compare" num="04" />} />
                <Route path="/reports" element={<PlaceholderPage title="Reports" num="06" />} />
                <Route path="/learn" element={<PlaceholderPage title="Learn" num="07" />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
