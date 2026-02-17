import React from "react"
import HeatmapCell from "./HeatmapCell"
import { generateYearDays, activityToMap, getIntensity } from "../utils/heatmapUtils"

function HeatmapGrid({ activity }) {

  const days = generateYearDays()

  const activityMap = activityToMap(activity)

  console.log("Days count:", days.length)

  return (
    <div style={{ display: "flex", marginTop: "10px" }}>

      {/* Labels */}
      <div style={{
        display: "grid",
        gridTemplateRows: "repeat(7, 14px)",
        marginRight: "5px"
      }}>
        <div>Mon</div>
        <div></div>
        <div>Wed</div>
        <div></div>
        <div>Fri</div>
        <div></div>
        <div></div>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: "repeat(7, 14px)",
          gridAutoFlow: "column",
          gridAutoColumns: "14px",
          gap: "3px",
          border: "1px solid gray",
          padding: "5px"
        }}
      >
        {days.map(day => {

          const date = day.format("YYYY-MM-DD")

          const activityDay = activityMap[date]

          return (
            <HeatmapCell
              key={date}
              intensity={getIntensity(activityDay)}
            />
          )

        })}
      </div>

    </div>
  )
}

export default HeatmapGrid
