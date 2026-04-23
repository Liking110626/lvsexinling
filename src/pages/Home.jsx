import { Building2, BrainCircuit, MessageCircleHeart } from 'lucide-react'

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <p className="eyebrow">欢迎来到绿色心灵</p>
          <h2 className="hero-title">
            您身边的心理健康服务平台
          </h2>
          <p className="hero-desc">
            当您感到疲惫、焦虑或需要倾听时，我们在这里为您提供温暖的支持与专业的帮助。
            不论您面临什么困扰，我们都会陪伴您找到适合的解决方案。
          </p>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon blue">
                <Building2 className="h-6 w-6" />
              </div>
              <h3>线下咨询站点</h3>
              <p>就近预约专业心理咨询师，面对面交流，获得更深入的支持与陪伴。</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon green">
                <BrainCircuit className="h-6 w-6" />
              </div>
              <h3>心理健康自测</h3>
              <p>通过专业问卷了解自己的心理状态，获得个性化的建议与支持。</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon yellow">
                <MessageCircleHeart className="h-6 w-6" />
              </div>
              <h3>AI智能倾诉</h3>
              <p>随时随地倾诉心事，获得共情回应与初步建议，减轻您的心理负担。</p>
            </div>
          </div>
        </div>
      </section>

      <section className="recommendation-panel">
        <h3>如果您正在经历困难</h3>
        <p>
          请记住，寻求帮助是勇敢的表现。无论您面临什么挑战，都有人愿意倾听和支持您。
        </p>

        <div className="suggestion-list">
          <div className="suggestion-item">
            <span className="suggestion-number">1</span>
            <div className="suggestion-content">
              <strong>感到焦虑不安时</strong>
              <p>可以先尝试AI倾诉，或者进行简单的心理自测，了解自己的情绪状态。</p>
            </div>
          </div>
          <div className="suggestion-item">
            <span className="suggestion-number">2</span>
            <div className="suggestion-content">
              <strong>需要专业帮助时</strong>
              <p>可以通过线下站点预约专业咨询师，获得一对一的心理支持服务。</p>
            </div>
          </div>
          <div className="suggestion-item">
            <span className="suggestion-number">3</span>
            <div className="suggestion-content">
              <strong>紧急情况求助</strong>
              <p>如果您处于危机状态，请立即拨打心理援助热线：400-161-9995（24小时）</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
