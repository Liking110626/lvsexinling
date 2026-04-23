import { useMemo, useState } from 'react'
import { Calendar, CheckCircle2, Compass, MapPin, Navigation } from 'lucide-react'

const STATIONS = [
  {
    id: 1,
    name: '静心心理咨询中心',
    distance: '1.2km',
    category: '名医',
    specialties: ['产后抑郁', '亲子沟通'],
    doctor: '王医生',
    experience: '15年咨询经验',
    cases: 520,
    style: '温暖陪伴型',
    slots: [
      { time: '09:00', remaining: 2, level: '名医' },
      { time: '11:00', remaining: 1, level: '名医' },
      { time: '14:00', remaining: 3, level: '资深' },
    ],
  },
  {
    id: 2,
    name: '绿意心灵诊所',
    distance: '2.4km',
    category: '资深',
    specialties: ['职场压力', '焦虑释放'],
    doctor: '李医生',
    experience: '10年咨询经验',
    cases: 380,
    style: '理性客观型',
    slots: [
      { time: '10:00', remaining: 4, level: '资深' },
      { time: '13:00', remaining: 2, level: '普通' },
      { time: '16:00', remaining: 5, level: '资深' },
    ],
  },
  {
    id: 3,
    name: '安心驿站心理服务',
    distance: '3.1km',
    category: '普通',
    specialties: ['学业压力', '人际冲突'],
    doctor: '陈医生',
    experience: '8年咨询经验',
    cases: 260,
    style: '温和引导型',
    slots: [
      { time: '09:30', remaining: 6, level: '普通' },
      { time: '12:30', remaining: 3, level: '普通' },
      { time: '15:30', remaining: 1, level: '资深' },
    ],
  },
]

const CATEGORY_OPTIONS = ['全部', '名医', '资深', '普通']
const VIEW_MODES = ['按专家', '按时间']

export default function Stations() {
  const [filter, setFilter] = useState('全部')
  const [viewMode, setViewMode] = useState('按专家')
  const [selectedStation, setSelectedStation] = useState(null)
  const [booked, setBooked] = useState(null)

  const filteredStations = useMemo(() => {
    if (filter === '全部') return STATIONS
    return STATIONS.filter((item) => item.category === filter)
  }, [filter])

  function handleBook(stationId, slotTime) {
    setBooked({ stationId, slotTime })
  }

  const currentStation = STATIONS.find((item) => item.id === selectedStation)

  return (
    <div className="section">
      <div className="stations-header">
        <h2>线下咨询站点</h2>
        <p>预约专业心理咨询师，面对面交流，获得专业支持与陪伴。</p>
      </div>

      <div className="controls-row">
        <div className="tab-group">
          {VIEW_MODES.map((mode) => (
            <button
              key={mode}
              type="button"
              className={`tab ${viewMode === mode ? 'active' : ''}`}
              onClick={() => setViewMode(mode)}
            >
              {mode}
            </button>
          ))}
        </div>
        <div className="tab-group">
          {CATEGORY_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              className={`tag ${filter === option ? 'selected' : ''}`}
              onClick={() => setFilter(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="grid-container">
        <div className="grid-left">
          {filteredStations.map((station) => (
            <section key={station.id} className="station-card">
              <div className="station-meta">
                <div>
                  <span className="station-category">{station.category}门诊</span>
                  <h3 className="station-name">{station.name}</h3>
                </div>
                <span className="distance-badge">
                  <MapPin size={14} /> {station.distance}
                </span>
              </div>

              <div className="chip-row">
                {station.specialties.map((tag) => (
                  <span key={tag} className="pill">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="doctor-card">
                <div className="doctor-info">
                  <p>专家医生</p>
                  <p>{station.doctor}</p>
                </div>
                <span className="pill">{station.style}</span>
              </div>
              <div className="chip-row" style={{ marginTop: '8px' }}>
                <span className="pill">已协助 {station.cases}+ 家庭</span>
                <span className="pill">{station.experience}</span>
              </div>

              <div className="slot-list">
                {station.slots.map((slot) => (
                  <button
                    key={`${station.id}-${slot.time}`}
                    type="button"
                    className="slot-btn"
                    onClick={() => handleBook(station.id, slot.time)}
                  >
                    <div>
                      <span className="slot-time">{slot.time}</span>
                      <span className="slot-remaining"> · {slot.remaining} 个余量</span>
                    </div>
                    <span className={`pill ${slot.level === '名医' ? 'premium' : ''}`}>
                      {slot.level}
                    </span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="btn-secondary"
                onClick={() => setSelectedStation(station.id)}
                style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}
              >
                <Compass size={18} /> 查看到店指引
              </button>
            </section>
          ))}
        </div>

        <aside className="panel-sidebar">
          <h3>到店服务指南</h3>
          {currentStation ? (
            <div>
              <span className="eyebrow">{currentStation.name}</span>
              <div style={{ marginTop: '16px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '4px' }}>咨询师专长</p>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                    {currentStation.specialties.join('、')}
                  </p>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '4px' }}>咨询服务特点</p>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                    {currentStation.style}，{currentStation.experience}。
                  </p>
                </div>
              </div>
              <div className="chip-row" style={{ marginTop: '16px' }}>
                <span className="pill">
                  <Navigation size={14} /> 交通指引
                </span>
                <span className="pill">
                  <Calendar size={14} /> 候诊须知
                </span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '16px' }}>
                建议提前10分钟到达，让自己在咨询前有时间放松和准备。
              </p>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <Compass size={48} style={{ color: 'var(--text-muted)', marginBottom: '12px' }} />
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
                选择一个咨询站点，查看详细的服务信息和到店指南。
              </p>
            </div>
          )}
        </aside>
      </div>

      {booked && (
        <div className="toast">
          <CheckCircle2 size={20} />
          <span>
            已为您锁定 {STATIONS.find((item) => item.id === booked.stationId)?.name} {booked.slotTime} 时段
          </span>
        </div>
      )}
    </div>
  )
}
