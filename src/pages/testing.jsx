import { useMemo, useState } from 'react'
import { BookOpen, Brain, UserCircle } from 'lucide-react'

const SCALE_CONFIG = {
  elderly: {
    title: '老年人心理健康评估',
    description: '了解您最近的孤独感、情绪状态和认知情况，获得贴心的关怀建议。',
    questions: [
      { id: 'q1', text: '最近一周是否经常觉得没有人陪伴？' },
      { id: 'q2', text: '是否会觉得兴趣减少，喜欢的事情变少了？' },
      { id: 'q3', text: '是否出现记忆力下降或找词困难？' },
    ],
    tips: '保持社交活动、培养兴趣爱好、与家人朋友保持联系，都有助于提升心理健康。如有需要，可以预约专业咨询。',
    recommendation: '建议多参与社区活动，与邻居朋友多交流。',
  },
  professional: {
    title: '职场心理健康评估',
    description: '了解您在工作生活中的压力状态、睡眠质量和情绪变化，获得实用的调节建议。',
    questions: [
      { id: 'q1', text: '最近是否觉得工作后仍然难以放松？' },
      { id: 'q2', text: '是否经常出现加班后睡眠不佳？' },
      { id: 'q3', text: '是否担心当前状态会影响职业发展？' },
    ],
    tips: '工作之余请记得给自己留出休息时间。可以尝试深呼吸、散步或与朋友倾诉来缓解压力。',
    recommendation: '建议每天留出15-30分钟做自己喜欢的事情，帮助身心放松。',
  },
  minor: {
    title: '青少年心理健康评估',
    description: '了解您最近的学习压力、情绪状态和人际相处情况，获得友好的支持建议。',
    questions: [
      { id: 'q1', text: '你是否常觉得学习任务太重，压力很大？' },
      { id: 'q2', text: '是否会担心与同学或老师的相处问题？' },
      { id: 'q3', text: '你是否觉得父母不太了解你的感受？' },
    ],
    tips: '每个人都会有压力和烦恼，这是正常的。试着和信任的人聊聊你的感受，或者写下来也是一种好的表达方式。',
    recommendation: '记得照顾好自己，合理安排学习和休息时间。',
  },
}

const MODES = ['孩子自评', '家长观察']
const ANSWER_OPTIONS = ['否', '有时', '经常']

export default function Testing() {
  const [userGroup, setUserGroup] = useState(null)
  const [mode, setMode] = useState(MODES[0])
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [readAloud, setReadAloud] = useState(false)

  const config = SCALE_CONFIG[userGroup]

  const score = useMemo(() => {
    return Object.values(answers).reduce((sum, value) => sum + (value || 0), 0)
  }, [answers])

  const resultText = useMemo(() => {
    if (!submitted) return ''
    if (score <= 2) return '您的心理健康状态良好，继续保持现在的积极生活方式。'
    if (score <= 5) return '您目前有一些心理压力，建议尝试一些放松方法，如运动、倾诉或寻求专业支持。'
    return '您目前承受较大的心理压力，建议寻求专业心理咨询师的帮助。'
  }, [score, submitted])

  function handleAnswer(id, index) {
    setAnswers((prev) => ({ ...prev, [id]: index }))
  }

  function reset() {
    setSubmitted(false)
    setAnswers({})
    setUserGroup(null)
    setMode(MODES[0])
  }

  if (!userGroup) {
    return (
      <div className="section">
        <div className="selector-grid">
          <h2>选择适合您的评估类型</h2>
          <div className="selector-row">
            <button className="tile" type="button" onClick={() => setUserGroup('elderly')}>
              <UserCircle className="h-8 w-8" style={{ color: 'var(--calm-blue)', marginBottom: '12px' }} />
              <strong>老年人评估</strong>
              <p>了解近期的情绪状态和心理需求，获得贴心关怀建议。</p>
            </button>
            <button className="tile" type="button" onClick={() => setUserGroup('professional')}>
              <Brain className="h-8 w-8" style={{ color: 'var(--primary)', marginBottom: '12px' }} />
              <strong>职场人士评估</strong>
              <p>了解工作压力和情绪状态，获得实用的调节建议。</p>
            </button>
            <button className="tile" type="button" onClick={() => setUserGroup('minor')}>
              <BookOpen className="h-8 w-8" style={{ color: 'var(--gentle-yellow)', marginBottom: '12px' }} />
              <strong>青少年评估</strong>
              <p>了解学习和人际方面的心理状态，获得友好支持。</p>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="section">
      <div className="stations-header">
        <p className="eyebrow">心理健康自测</p>
        <h2>{config.title}</h2>
        <p className="description">{config.description}</p>
      </div>

      {userGroup === 'minor' && (
        <div className="controls-row">
          <div className="tab-group">
            {MODES.map((item) => (
              <button
                key={item}
                type="button"
                className={`tab ${mode === item ? 'active' : ''}`}
                onClick={() => setMode(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="panel mini" style={{ marginTop: '24px' }}>
        <p style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
          <BookOpen size={18} style={{ color: 'var(--primary)' }} />
          {readAloud ? '已开启语音播报，当前问题将为您朗读。' : '如需辅助阅读，可开启语音播报功能。'}
        </p>
        <button
          type="button"
          className="btn-ghost"
          onClick={() => setReadAloud((prev) => !prev)}
          style={{ marginTop: '12px' }}
        >
          {readAloud ? '关闭语音读题' : '启用语音读题'}
        </button>
      </div>

      <div className="question-list">
        {config.questions.map((question, index) => (
          <div key={question.id} className="question-card">
            <div className="question-label">
              <span className="question-number">{index + 1}.</span>
              <p className="question-text">{question.text}</p>
            </div>
            <div className="option-row">
              {ANSWER_OPTIONS.map((text, optionIndex) => (
                <button
                  key={text}
                  type="button"
                  className={`option ${answers[question.id] === optionIndex ? 'selected' : ''}`}
                  onClick={() => handleAnswer(question.id, optionIndex)}
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="result-panel">
        <p className="result-note">温馨提示：本测试仅供参考，不作为医学诊断依据。</p>
        <button className="btn-primary" type="button" onClick={() => setSubmitted(true)}>
          查看评估结果
        </button>
      </div>

      {submitted && (
        <div className="panel" style={{ marginTop: '24px' }}>
          <h3>您的评估结果</h3>
          <p style={{ marginTop: '12px', fontSize: '1rem', color: 'var(--text-primary)' }}>
            {resultText}
          </p>
          <div style={{ marginTop: '20px', display: 'grid', gap: '16px' }}>
            <div className="suggestion-item">
              <span className="suggestion-number">1</span>
              <div className="suggestion-content">
                <strong>贴心建议</strong>
                <p>{config.tips}</p>
              </div>
            </div>
            <div className="suggestion-item">
              <span className="suggestion-number">2</span>
              <div className="suggestion-content">
                <strong>行动建议</strong>
                <p>{config.recommendation}</p>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn-secondary"
            onClick={reset}
            style={{ marginTop: '20px' }}
          >
            重新进行评估
          </button>
        </div>
      )}
    </div>
  )
}
