import { useState } from 'react'
import { HeartHandshake, Phone, Send, ShieldCheck, Sparkles } from 'lucide-react'

const RISK_WORDS = ['自杀', '想死', '死了算了', '我不想活了', '割腕', '跳楼', '失控', '伤害自己']
const PROFILE_KEYWORDS = [
  { keywords: ['产后', '宝宝', '哺乳'], label: '产后情绪问题', match: '产后情绪支持咨询师' },
  { keywords: ['职场', '加班', '领导', '人际'], label: '职场压力与人际冲突', match: '职场心理专家' },
  { keywords: ['学习', '考试', '人际冲突'], label: '青少年学业与社交', match: '青少年成长咨询师' },
  { keywords: ['孤独', '失眠', '焦虑'], label: '持续情绪低落', match: '情绪调节专家' },
]

function detectRisk(text) {
  return RISK_WORDS.some((word) => text.includes(word))
}

function buildProfile(text) {
  const matched = PROFILE_KEYWORDS.find((item) =>
    item.keywords.some((word) => text.includes(word))
  )
  const area = matched ? matched.label : '情绪与压力困扰'
  const expert = matched ? matched.match : '综合心理咨询师'

  return {
    summary: `根据您的描述，主要关注：${area}。`,
    expert,
  }
}

function getReply(text) {
  if (!text) {
    return '您好，我在这里倾听您的感受。可以简单说一下最近让您困扰的事情吗？'
  }

  const risk = detectRisk(text)
  if (risk) {
    return '我听到您现在非常痛苦。如果您有伤害自己的想法，请先拨打24小时心理援助热线：400-161-9995，或者直接联系身边信任的人。您的安全是最重要的。'
  }

  if (text.includes('很难受') || text.includes('难受')) {
    return '听到您现在的感受，我很担心您。您愿意说说是什么让您感到难受吗？我在这里陪伴您。'
  }

  if (text.includes('焦虑') || text.includes('紧张')) {
    return '我能感觉到您承受着不小的压力。让我们一起来梳理一下您的情况，我会帮您找到合适的支持方式。'
  }

  return '感谢您的分享。根据您说的情况，我可以帮您了解适合的咨询服务。您也可以随时告诉我更多关于您的感受。'
}

export default function AiConsult() {
  const [input, setInput] = useState('')
  const [chat, setChat] = useState([
    {
      role: 'assistant',
      text: '您好，欢迎来到心灵倾诉空间。我是您的AI倾听伙伴，可以陪伴您聊聊天，帮助您整理思绪。无论您有什么烦恼，我都会在这里倾听您。',
    },
  ])
  const [summary, setSummary] = useState(null)
  const [hotline, setHotline] = useState(false)
  const [recommend, setRecommend] = useState('继续聊聊您的感受，我可以更好地帮助您。')

  function handleSubmit() {
    const content = input.trim()
    if (!content) return

    const risk = detectRisk(content)
    const profile = buildProfile(content)
    const response = getReply(content)

    setChat((prev) => [
      ...prev,
      { role: 'user', text: content },
      { role: 'assistant', text: response },
    ])
    setSummary({
      chiefComplaint: content,
      impression: profile.summary,
      specialist: profile.expert,
      mood: content.includes('好') || content.includes('轻松') ? '状态尚可' : '需要关注',
    })
    setHotline(risk)
    setRecommend(risk ? '建议立即拨打心理援助热线或联系专业人员' : `根据您的情况，建议预约${profile.expert}`)
    setInput('')
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="section">
      <div className="stations-header">
        <p className="eyebrow">心灵倾诉空间</p>
        <h2>AI陪伴倾诉</h2>
        <p className="description">
          随时随地倾诉心事，获得温暖的共情回应与初步建议。
          我会陪伴您，帮您整理思绪，找到前进的力量。
        </p>
      </div>

      <div className="chat-panel">
        {chat.map((item, index) => (
          <div
            key={index}
            className={`chat-message ${item.role === 'assistant' ? 'assistant' : 'user'}`}
          >
            <p>{item.text}</p>
          </div>
        ))}
      </div>

      <div className="input-row">
        <input
          type="text"
          placeholder="输入您想说的话..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button type="button" className="btn-primary" onClick={handleSubmit}>
          <Send size={18} /> 发送
        </button>
      </div>

      {hotline && (
        <div className="alert danger" style={{ marginTop: '20px' }}>
          <ShieldCheck size={24} />
          <div>
            <strong>您不是一个人</strong>
            <p style={{ marginTop: '4px' }}>如果您有伤害自己的想法，请立即拨打24小时心理援助热线：<strong>400-161-9995</strong></p>
            <p style={{ marginTop: '4px' }}>您也可以联系身边信任的家人朋友，或者前往最近的医院急诊。</p>
          </div>
        </div>
      )}

      {summary && (
        <div className="panel" style={{ marginTop: '24px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={20} style={{ color: 'var(--primary)' }} />
            我为您整理的内容
          </h3>
          <div className="suggestion-list" style={{ marginTop: '16px' }}>
            <div className="suggestion-item">
              <span className="suggestion-number" style={{ background: 'var(--calm-blue)' }}>诉</span>
              <div className="suggestion-content">
                <strong>您分享的内容</strong>
                <p>{summary.chiefComplaint}</p>
              </div>
            </div>
            <div className="suggestion-item">
              <span className="suggestion-number" style={{ background: 'var(--gentle-yellow)' }}>感</span>
              <div className="suggestion-content">
                <strong>当前状态</strong>
                <p>{summary.mood}</p>
              </div>
            </div>
            <div className="suggestion-item">
              <span className="suggestion-number" style={{ background: 'var(--primary)' }}>析</span>
              <div className="suggestion-content">
                <strong>我的理解</strong>
                <p>{summary.impression}</p>
              </div>
            </div>
            <div className="suggestion-item">
              <span className="suggestion-number" style={{ background: 'var(--primary-light)' }}>助</span>
              <div className="suggestion-content">
                <strong>建议</strong>
                <p>{recommend}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="panel mini">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <HeartHandshake size={20} style={{ color: 'var(--primary)' }} />
          温馨提示
        </h3>
        <p style={{ marginTop: '12px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          我会在这里陪伴您倾听您的心声，帮您整理情绪和思绪。如果您需要更专业的支持，可以预约线下咨询服务，我会根据您的情况帮您匹配合适的咨询师。
        </p>
        <div style={{ marginTop: '16px', padding: '16px', background: 'var(--primary-soft)', borderRadius: 'var(--radius-lg)' }}>
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-dark)', fontWeight: '500' }}>
            <Phone size={18} />
            24小时心理援助热线：<strong>400-161-9995</strong>
          </p>
        </div>
      </div>
    </div>
  )
}
