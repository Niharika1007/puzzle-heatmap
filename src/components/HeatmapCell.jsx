import React from "react"

function HeatmapCell({ intensity }) {

  const colors=[
    "#ebedf0",
    "#9be9a8",
    "#40c463",
    "#30a14e",
    "#216e39"
  ]

  return(

    <div style={{

      width:"16px",
      height:"16px",
      background:colors[intensity],
      borderRadius:"3px"

    }}/>

  )

}

export default HeatmapCell
