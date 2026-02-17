import React from "react"

function HeatmapCell({ intensity }) {

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
        backgroundColor: colors[intensity],
        border: "1px solid #ccc"
      }}
    />
  )
}

export default HeatmapCell
