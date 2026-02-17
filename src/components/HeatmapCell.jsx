import React from "react"

function HeatmapCell({ intensity = 0 }) {

  const colors = [
    "#ebedf0",
    "#9be9a8",
    "#40c463",
    "#30a14e",
    "#216e39"
  ]

  return (
    <div
      style={{
        width: "12px",
        height: "12px",
        backgroundColor: colors[intensity] || "#ebedf0",
        borderRadius: "2px"
      }}
    />
  )
}

export default HeatmapCell
