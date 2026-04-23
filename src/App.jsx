import {
  Building2,
  Heart,
  LayoutDashboard,
  MessageCircleHeart,
  Sparkles,
  Stethoscope,
  Users,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import './App.css'
import AiConsult from './pages/AiConsult'
import Home from './pages/Home'
import Stations from './pages/Stations'
import Testing from './pages/Testing'

const PLATFORM_NAME = '绿色心灵'

const PAGES = [
  { key: 'Stations', label: '线下站点', hint: '预约 · 导航 · 专家', icon: Building2 },
  { key: 'Testing', label: '心理自测', hint: '全生命周期评估', icon: Stethoscope },
  { key: 'AiConsult', label: 'AI预问诊', hint: '共情导诊 · 风险识别', icon: MessageCircleHeart },
]

const PAGE_MAP = {
  Home,
  Stations,
  Testing,
  AiConsult,
}

function App() {
  const [currentPage, setCurrentPage] = useState('Home')
  const PageComponent = PAGE_MAP[currentPage] ?? Home

  useEffect(() => {
    document.title = `${PLATFORM_NAME} - 心理健康服务平台`
  }, [])

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <button
              type="button"
              onClick={() => setCurrentPage('Home')}
              className="logo-btn"
            >
              <div className="logo-icon">
                <Heart className="h-6 w-6" />
              </div>
              <div className="logo-text">
                <h1>{PLATFORM_NAME}</h1>
              </div>
            </button>
          </div>

          <nav className="nav-section">
            <div className="nav-grid">
              {PAGES.map((page) => {
                const Icon = page.icon
                const isActive = page.key === currentPage

                return (
                  <button
                    key={page.key}
                    type="button"
                    onClick={() => setCurrentPage(page.key)}
                    className={`nav-btn ${isActive ? 'active' : ''}`}
                  >
                    <span className="nav-icon">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="nav-info">
                      <span className="nav-title">{page.label}</span>
                      <span className="nav-desc">{page.hint}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <PageComponent onNavigate={setCurrentPage} />
      </main>
    </div>
  )
}

export default App
