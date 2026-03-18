import styles from './Gallery.module.css'

const THUMB_SIZE = 64
const GRID_SIZE = 20
const CELL = THUMB_SIZE / GRID_SIZE

export default function Gallery({ drawings, onLoad, onDelete }) {
    if (drawings.length === 0) {
        return (
            <div className={styles.gallery}>
                <div className={styles.header}>
                    <span className={styles.label}>GALLERY</span>
                    <span className={styles.count}>0 saved</span>
                </div>
                <div className={styles.empty}>
                    <span className={styles.emptyIcon}>◻</span>
                    <p>No drawings yet.<br />Save one to start.</p>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.gallery}>
            <div className={styles.header}>
                <span className={styles.label}>GALLERY</span>
                <span className={styles.count}>{drawings.length} saved</span>
            </div>
            <div className={styles.list}>
                {drawings.map((drawing) => (
                    <div key={drawing.id} className={styles.item}>
                        <button className={styles.thumbBtn} onClick={() => onLoad(drawing)} title={`Load: ${drawing.name}`}>
                            <canvas
                                width={THUMB_SIZE}
                                height={THUMB_SIZE}
                                className={styles.thumb}
                                ref={(canvas) => {
                                    if (!canvas) return
                                    const ctx = canvas.getContext('2d')
                                    ctx.clearRect(0, 0, THUMB_SIZE, THUMB_SIZE)
                                    ctx.fillStyle = '#111118'
                                    ctx.fillRect(0, 0, THUMB_SIZE, THUMB_SIZE)
                                    drawing.grid.forEach((row, ri) => {
                                        row.forEach((color, ci) => {
                                            if (color) {
                                                ctx.fillStyle = color
                                                ctx.fillRect(ci * CELL, ri * CELL, CELL, CELL)
                                            }
                                        })
                                    })
                                }}
                            />
                            <div className={styles.thumbOverlay}><span>LOAD</span></div>
                        </button>
                        <div className={styles.itemMeta}>
                            <span className={styles.itemName}>{drawing.name}</span>
                            <span className={styles.itemDate}>{drawing.date}</span>
                        </div>
                        <button className={styles.deleteBtn} onClick={() => onDelete(drawing.id)} title="Delete">✕</button>
                    </div>
                ))}
            </div>
        </div>
    )
}