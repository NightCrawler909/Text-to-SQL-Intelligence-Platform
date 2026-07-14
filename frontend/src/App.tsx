import { useState } from 'react'
import Plot from 'react-plotly.js'
import CodeMirror from '@uiw/react-codemirror'
import { sql } from '@codemirror/lang-sql'
import './App.css'

// Inline SVG Icons for premium look without adding dependencies
const DatabaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M3 5V19A9 3 0 0 0 21 19V5"></path>
    <path d="M3 12A9 3 0 0 0 21 12"></path>
  </svg>
)

const LayoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="3" y1="9" x2="21" y2="9"></line>
    <line x1="9" y1="21" x2="9" y2="9"></line>
  </svg>
)

const TableIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="3" y1="9" x2="21" y2="9"></line>
    <line x1="3" y1="15" x2="21" y2="15"></line>
    <line x1="9" y1="3" x2="9" y2="21"></line>
    <line x1="15" y1="3" x2="15" y2="21"></line>
  </svg>
)

const MessageSquareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
)

const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
)

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
)

const ActivityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
)

const BarChartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"></line>
    <line x1="12" y1="20" x2="12" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="14"></line>
  </svg>
)

const ZapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
)

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
)

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v18"></path>
    <path d="M3 12h18"></path>
    <path d="M18.36 5.64l-12.72 12.72"></path>
    <path d="M5.64 5.64l12.72 12.72"></path>
  </svg>
)

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
)

function App() {
  const [query, setQuery] = useState('')
  const [chatHistory, setChatHistory] = useState<{role: string, content: string}[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [result, setResult] = useState<any>(null)
  
  // SQL Editor State
  const [editableSql, setEditableSql] = useState('-- Generated SQL will appear here\\n')

  // Connection State
  const [showModal, setShowModal] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [dbConfig, setDbConfig] = useState({
    db_type: 'mysql',
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'test_db'
  })

  // AI Settings State
  const [geminiApiKey, setGeminiApiKey] = useState('')
  const [geminiModel, setGeminiModel] = useState('gemini-3.1-flash')

  // Export Results
  const exportData = (format: 'csv' | 'json') => {
    if (!result?.data?.raw_rows) return alert('No data to export')
    const rows = result.data.raw_rows
    
    let content = ''
    let type = ''
    let extension = ''

    if (format === 'json') {
      content = JSON.stringify(rows, null, 2)
      type = 'application/json'
      extension = 'json'
    } else {
      const keys = Object.keys(rows[0])
      content = keys.join(',') + '\\n' + rows.map((r: any) => keys.map(k => r[k]).join(',')).join('\\n')
      type = 'text/csv'
      extension = 'csv'
    }

    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `export.${extension}`
    a.click()
  }

  // Connect Database
  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:8000/api/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dbConfig)
      })
      if (res.ok) {
        setIsConnected(true)
        setShowModal(false)
      } else {
        alert('Connection failed')
      }
    } catch (err) {
      alert('Error connecting to backend API')
    }
  }

  // Execute Query
  const handleExecute = async () => {
    if (!query) return
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:8000/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          query, 
          database: dbConfig.db_type, 
          chat_history: chatHistory,
          gemini_api_key: geminiApiKey,
          gemini_model: geminiModel
        })
      })
      const data = await response.json()
      
      // Extract SQL query block for editor
      const rawSql = data.sql || ''
      const sqlMatch = rawSql.match(/```sql\\n([\\s\\S]*?)```/)
      const cleanSql = sqlMatch ? sqlMatch[1] : rawSql.replace('-- Agent output:\\n', '')
      
      setEditableSql(cleanSql)
      setResult(data)
      setChatHistory([...chatHistory, { role: 'user', content: query }, { role: 'assistant', content: cleanSql }])
      setQuery('')
    } catch (error) {
      console.error(error)
      alert("Error connecting to backend API.")
    } finally {
      setIsLoading(false)
    }
  }

  // Optimize SQL
  const handleOptimize = async () => {
    if (!editableSql) return
    setIsOptimizing(true)
    try {
      const response = await fetch('http://localhost:8000/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          sql: editableSql,
          gemini_api_key: geminiApiKey,
          gemini_model: geminiModel
        })
      })
      const data = await response.json()
      if (data.status === 'success' && data.suggestions) {
        // Just append suggestions as comments for now
        setEditableSql(prev => `/*\nAI OPTIMIZATION SUGGESTIONS:\n${data.suggestions}\n*/\n\n${prev}`)
      } else {
        alert("Optimization failed: " + (data.message || "Unknown error"))
      }
    } catch(err) {
      console.error(err)
    } finally {
      setIsOptimizing(false)
    }
  }

  const chartData = result?.data ? [
    {
      x: result.data.x,
      y: result.data.y,
      type: result.data.type,
      marker: { color: '#38bdf8', line: { color: 'rgba(56, 189, 248, 0.5)', width: 2 } },
      opacity: 0.8
    }
  ] : []

  return (
    <div className="app-container">
      
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel">
            <h3>Connect Database</h3>
            <form onSubmit={handleConnect} className="connect-form">
              <select value={dbConfig.db_type} onChange={e => setDbConfig({...dbConfig, db_type: e.target.value})}>
                <option value="mysql">MySQL</option>
                <option value="postgresql">PostgreSQL</option>
                <option value="snowflake">Snowflake</option>
                <option value="duckdb">DuckDB</option>
              </select>
              
              {dbConfig.db_type !== 'duckdb' && (
                <>
                  <input placeholder="Host" value={dbConfig.host} onChange={e => setDbConfig({...dbConfig, host: e.target.value})} />
                  <input placeholder="Port" value={dbConfig.port} onChange={e => setDbConfig({...dbConfig, port: e.target.value})} />
                  <input placeholder="User" value={dbConfig.user} onChange={e => setDbConfig({...dbConfig, user: e.target.value})} />
                  <input type="password" placeholder="Password" value={dbConfig.password} onChange={e => setDbConfig({...dbConfig, password: e.target.value})} />
                </>
              )}
              
              <input placeholder={dbConfig.db_type === 'duckdb' ? "Database Path (e.g. :memory:)" : "Database Name"} value={dbConfig.database} onChange={e => setDbConfig({...dbConfig, database: e.target.value})} />
              
              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
                <button type="submit" className="execute-btn">Connect</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Left Sidebar */}
      <aside className="sidebar sidebar-left glass-panel">
        <div className="brand">
          <div className="brand-icon"><DatabaseIcon /></div>
          <h2>Enterprise SQL</h2>
        </div>
        
        <div className="section">
          <div className="section-header">
            <span className="section-icon"><ZapIcon /></span>
            <h3 className="section-title">Connection</h3>
          </div>
          <button className="connect-btn" onClick={() => setShowModal(true)}>
            {isConnected ? `Connected: ${dbConfig.db_type}` : 'Manage Connections'}
          </button>
        </div>

        <div className="section ai-settings-section">
          <div className="section-header">
            <span className="section-icon"><SettingsIcon /></span>
            <h3 className="section-title">AI Settings</h3>
          </div>
          <div className="connect-form" style={{ marginTop: '10px' }}>
            <input 
              type="password" 
              placeholder="Gemini API Key" 
              value={geminiApiKey} 
              onChange={e => setGeminiApiKey(e.target.value)} 
              style={{ width: '100%', marginBottom: '8px', padding: '8px', borderRadius: '4px', border: '1px solid #334155', backgroundColor: '#0f172a', color: 'white', boxSizing: 'border-box' }}
            />
            <select 
              value={geminiModel} 
              onChange={e => setGeminiModel(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #334155', backgroundColor: '#0f172a', color: 'white', boxSizing: 'border-box' }}
            >
              <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
              <option value="gemini-3.0-flash">Gemini 3.0 Flash</option>
              <option value="gemini-3.1-flash">Gemini 3.1 Flash</option>
              <option value="gemini-3.1-pro">Gemini 3.1 Pro</option>
            </select>
          </div>
        </div>

        <div className="section schema-section">
          <div className="section-header">
            <span className="section-icon"><LayoutIcon /></span>
            <h3 className="section-title">Schema Explorer</h3>
          </div>
          <div className="schema-list">
            {['users', 'orders', 'products', 'inventory', 'events'].map(table => (
              <div key={table} className="schema-item">
                <span className="schema-icon"><TableIcon /></span>
                <span>{table}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        
        {/* Chat History Section */}
        <div className="chat-history-container">
           {chatHistory.map((msg, i) => (
             <div key={i} className={`chat-msg ${msg.role}`}>
               <strong>{msg.role === 'user' ? 'You' : 'AI'}: </strong>
               <span>{msg.content.substring(0, 100)}{msg.content.length > 100 ? '...' : ''}</span>
             </div>
           ))}
        </div>

        <div className="section">
          <div className="section-header">
            <span className="section-icon"><MessageSquareIcon /></span>
            <h3 className="section-title">Natural Language Query (Supports Follow-ups)</h3>
          </div>
          <div className="query-wrapper">
            <textarea 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="E.g., What is the total revenue by month? ... then follow up with 'What about just for 2023?'"
              className="query-input"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="action-bar">
          <button 
            className="execute-btn" 
            onClick={handleExecute}
            disabled={isLoading || !query}
          >
            {isLoading ? 'Processing Query...' : 'Generate & Execute'}
          </button>
        </div>

        <div className="section editor-section">
          <div className="section-header" style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
            <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
              <span className="section-icon"><CodeIcon /></span>
              <h3 className="section-title">SQL Editor</h3>
            </div>
            <button className="optimize-btn" onClick={handleOptimize} disabled={isOptimizing || !editableSql}>
              <SparklesIcon /> {isOptimizing ? 'Optimizing...' : 'AI Optimize'}
            </button>
          </div>
          <div className={`sql-editor-container ${isLoading ? 'skeleton-pulse' : ''}`}>
            <CodeMirror
              value={editableSql}
              height="200px"
              theme="dark"
              extensions={[sql()]}
              onChange={(value) => setEditableSql(value)}
              className="cm-editor-custom"
            />
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="sidebar sidebar-right glass-panel">
        <div className="section">
          <div className="section-header">
            <span className="section-icon"><ActivityIcon /></span>
            <h3 className="section-title">Analysis</h3>
          </div>
          <div className="confidence-card">
            <div className="score-circle" style={{ '--score-pct': `${result ? result.confidence : 0}%` } as React.CSSProperties}>
              <span className="score-value">{result ? result.confidence : '--'}</span>
            </div>
            <div className="score-details">
              <div className="check-item"><CheckCircleIcon /> AST Validation</div>
              <div className="check-item"><CheckCircleIcon /> Schema Grounding</div>
              <div className="check-item"><CheckCircleIcon /> Policy Firewall</div>
            </div>
          </div>
        </div>

        <div className="section">
          <h3 className="section-title">Execution Plan</h3>
          <div className={`execution-plan ${isLoading ? 'skeleton-pulse' : ''}`}>
            {result ? result.execution_plan : 'Awaiting execution...'}
          </div>
        </div>

        <div className="section viz-section">
          <div className="section-header" style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
            <h3 className="section-title">Visualizations</h3>
            <div className="export-actions">
               <button onClick={() => exportData('csv')} className="export-btn" title="Export CSV"><DownloadIcon /> CSV</button>
               <button onClick={() => exportData('json')} className="export-btn" title="Export JSON"><DownloadIcon /> JSON</button>
            </div>
          </div>
          <div className={`viz-container ${isLoading ? 'skeleton-pulse' : ''}`}>
            {result && result.data ? (
              <Plot
                data={chartData}
                layout={{ autosize: true, margin: { l: 40, r: 20, t: 20, b: 40 }, paper_bgcolor: 'transparent', plot_bgcolor: 'transparent', font: { color: '#94a3b8' } }}
                useResizeHandler={true}
                style={{ width: '100%', height: '100%' }}
                config={{ displayModeBar: false }}
              />
            ) : (
              <div className="viz-placeholder">
                <BarChartIcon />
                <span>Chart Area</span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  )
}

export default App
