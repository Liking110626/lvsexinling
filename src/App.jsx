import {
  Building2,
  Heart,
  Home,
  MessageCircleHeart,
  Stethoscope,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import './App.css'
import AiConsult from './pages/AiConsult'
import HomePage from './pages/Home'
import Stations from './pages/Stations'
import Testing from './pages/Testing'

const PLATFORM_NAME = '绿色心灵'

const NAV_ITEMS = [
  { key: 'HomePage', label: '首页', icon: Home },
  { key: 'Stations', label: '站点', icon: Building2 },
  { key: 'Testing', label: '自测', icon: Stethoscope },
  { key: 'AiConsult', label: 'AI咨询', icon: MessageCircleHeart },
]

const PAGE_MAP = {
  HomePage,
  Stations,
  Testing,
  AiConsult,
}

function App() {
  const [currentPage, setCurrentPage] = useState('HomePage')
  const PageComponent = PAGE_MAP[currentPage] ?? HomePage

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
              onClick={() => setCurrentPage('HomePage')}
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
              {NAV_ITEMS.slice(1).map((item) => {
                const Icon = item.icon
                const isActive = item.key === currentPage

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setCurrentPage(item.key)}
                    className={`nav-btn ${isActive ? 'active' : ''}`}
                  >
                    <span className="nav-icon">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="nav-info">
                      <span className="nav-title">{item.label}</span>
                      <span className="nav-desc">{item.hint}</span>
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

      {/* 移动端底部导航 */}
      <nav className="mobile-nav">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = item.key === currentPage

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setCurrentPage(item.key)}
              className={`mobile-nav-btn ${isActive ? 'active' : ''}`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

export default App
