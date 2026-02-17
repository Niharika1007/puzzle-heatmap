import React, { useMemo } from "react"
import HeatmapCell from "./HeatmapCell"

import {
  generateYearDays,
  activityToMap,
  getIntensity
} from "../utils/heatmapUtils"

function HeatmapGrid({ activity }) {

  const days = useMemo(() => generateYearDays(), [])

  const map = useMemo(() => activityToMap(activity), [activity])


  return (

    <div style={{ display:"flex" }}>


      {/* WEEK LABELS */}

      <div style={weekLabels}>

        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>

      </div>



      {/* GRID */}

      <div style={gridStyle}>

        {days.map(day=>{

          const date=day.format("YYYY-MM-DD")

          return(

            <HeatmapCell
              key={date}
              intensity={getIntensity(map[date])}
            />

          )

        })}

      </div>


    </div>

  )

}


const gridStyle={

  display:"grid",
  gridTemplateRows:"repeat(7,16px)",
  gridAutoFlow:"column",
  gridAutoColumns:"16px",
  gap:"4px"

}


const weekLabels={

  display:"grid",
  gridTemplateRows:"repeat(7,16px)",
  gap:"4px",
  marginRight:"8px",
  fontSize:"12px",
  color:"#666"

}


export default HeatmapGrid
