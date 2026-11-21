import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Eraser, ImagePlus, Palette, Pencil, RotateCcw, Save, Sparkles, Trash2, Upload, X } from 'lucide-react'
import './styles.css'

const SIZE = 20
const EMPTY_COLOR = ''
const STORAGE_KEY = 'pixel-art-studio-gallery'

const createBlankCanvas = () => Array.from({ length: SIZE * SIZE }, () => EMPTY_COLOR)

function App() {
  const [palette, setPalette] = useState([])
  const [selectedColor, setSelectedColor] = useState('#ff5d73')
  const [pixels, setPixels] = useState(createBlankCanvas)
  const [gallery, setGallery] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
  })
  const [isDrawing, setIsDrawing] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/palette.json').then((response) => response.json()).then(setPalette)
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gallery))
  }, [gallery])

  useEffect(() => {
    const stopDrawing = () => setIsDrawing(false)
    window.addEventListener('mouseup', stopDrawing)
    return () => window.removeEventListener('mouseup', stopDrawing)
  }, [])

  const paintedPixels = useMemo(() => pixels.filter(Boolean).length, [pixels])

  const paintPixel = useCallback((index) => {
    setPixels((current) => {
      if (current[index] === selectedColor) return current
      const next = [...current]
      next[index] = selectedColor
      return next
    })
  }, [selectedColor])

  const resetCanvas = () => setPixels(createBlankCanvas())

  const notify = (text) => {
    setMessage(text)
    window.setTimeout(() => setMessage(''), 2200)
  }

  const saveDrawing = () => {
    if (!paintedPixels) { notify('Pictează ceva înainte de salvare.'); return }
    const drawing = { id: Date.now(), pixels, createdAt: new Date().toLocaleDateString('ro-RO', { day: '2-digit', month: 'short' }) }
    setGallery((current) => [drawing, ...current])
    notify('Desenul a fost salvat în galerie.')
  }

  const loadDrawing = (drawing) => {
    setPixels(drawing.pixels)
    notify('Desen încărcat pentru editare.')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const deleteDrawing = (id) => setGallery((current) => current.filter((drawing) => drawing.id !== id))

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Pixel Art Studio">
          <span className="brand-mark"><Sparkles size={17} /></span>
          <span>pixel<span>studio</span></span>
        </a>
        <div className="topbar-meta"><span className="status-dot" /> Proiect nou <b>•</b> {paintedPixels} / {SIZE * SIZE} pixeli</div>
      </header>

      <main className="layout">
        <section className="workspace-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Atelierul tău</p>
              <h1>Desenează în pixeli.</h1>
              <p className="subtitle">Construiește ceva memorabil, câte un pixel pe rând.</p>
            </div>
            <div className="canvas-size"><span>CANVAS</span><strong>20 × 20</strong></div>
          </div>

          <div className="canvas-wrap">
            <div className="canvas" onMouseLeave={() => setIsDrawing(false)}>
              {pixels.map((color, index) => (
                <button
                  key={index}
                  className={`pixel ${color ? 'painted' : ''}`}
                  style={{ backgroundColor: color || undefined }}
                  aria-label={`Pixel ${index + 1}${color ? `, ${color}` : ', gol'}`}
                  onMouseDown={(event) => { event.preventDefault(); setIsDrawing(true); paintPixel(index) }}
                  onMouseEnter={() => isDrawing && paintPixel(index)}
                  onMouseUp={() => setIsDrawing(false)}
                />
              ))}
            </div>
          </div>

          <div className="canvas-actions">
            <button className="button button-primary" onClick={saveDrawing}><Save size={17} /> Salvează desenul</button>
            <button className="button button-quiet" onClick={resetCanvas}><RotateCcw size={16} /> Resetează</button>
            <span className="hint"><Pencil size={14} /> Click + drag pentru a desena</span>
          </div>
        </section>

        <aside className="tools-card">
          <div className="tool-title"><span className="icon-box"><Palette size={17} /></span><div><h2>Paletă de culori</h2><p>Alege o culoare pentru pixelii tăi</p></div></div>
          <div className="palette-grid">
            {palette.map((color) => (
              <button key={color.hex} className={`swatch ${selectedColor === color.hex ? 'selected' : ''}`} style={{ backgroundColor: color.hex }} title={color.name} aria-label={color.name} onClick={() => setSelectedColor(color.hex)}>
                {selectedColor === color.hex && <span className="swatch-check">✓</span>}
              </button>
            ))}
          </div>
          <div className="current-color"><span className="current-dot" style={{ backgroundColor: selectedColor }} /><div><small>CULOARE SELECTATĂ</small><strong>{palette.find((item) => item.hex === selectedColor)?.name || selectedColor}</strong></div><button title="Golește celulele" aria-label="Golește celulele" onClick={() => setSelectedColor(EMPTY_COLOR)}><Eraser size={16} /></button></div>
        </aside>
      </main>

      <section className="gallery-section">
        <div className="gallery-heading"><div><p className="eyebrow">Colecția ta</p><h2>Galerie <span>{gallery.length}</span></h2></div><p className="gallery-description">Desenele tale salvate, gata de reluat.</p></div>
        {gallery.length === 0 ? (
          <div className="empty-gallery"><div className="empty-icon"><ImagePlus size={25} /></div><div><strong>Galeria este goală</strong><p>Salvează primul tău desen și îl vei găsi aici.</p></div></div>
        ) : (
          <div className="gallery-grid">
            {gallery.map((drawing, drawingIndex) => <div className="gallery-item" key={drawing.id}>
              <button className="thumbnail" onClick={() => loadDrawing(drawing)} aria-label={`Încarcă desenul ${drawingIndex + 1}`}>
                {drawing.pixels.map((color, index) => <span key={index} style={{ backgroundColor: color || '#f0eff6' }} />)}
              </button>
              <div className="gallery-item-footer"><div><strong>Desen #{gallery.length - drawingIndex}</strong><small>{drawing.createdAt}</small></div><div className="item-actions"><button onClick={() => loadDrawing(drawing)} title="Încarcă" aria-label="Încarcă"><Upload size={15} /></button><button className="delete" onClick={() => deleteDrawing(drawing.id)} title="Șterge" aria-label="Șterge"><Trash2 size={15} /></button></div></div>
            </div>)}
          </div>
        )}
      </section>

      {message && <div className="toast"><span>✓</span>{message}<button onClick={() => setMessage('')}><X size={14} /></button></div>}
      <footer>PIXELSTUDIO <span>•</span> creează liber, pixel cu pixel</footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
