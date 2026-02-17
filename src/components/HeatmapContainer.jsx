import { useEffect, useState } from "react"
import HeatmapGrid from "./HeatmapGrid"
import {
  getAllActivity,
  saveActivity
} from "../db/activityDB"

import {
  calculateStreak,
  activityToMap
} from "../utils/heatmapUtils"

import dayjs from "dayjs"

function HeatmapContainer() {

  const [activity, setActivity] = useState([])
  const [streak, setStreak] = useState(0)
  const [loading, setLoading] = useState(true)


  // Proper async loader
  const loadActivity = async () => {

    try {

      const data = await getAllActivity()

      setActivity(data || [])

      const map = activityToMap(data || [])

      const streakCount = calculateStreak(map)

      setStreak(streakCount)

    }
    catch (error) {

      console.error("Error loading activity:", error)

      setActivity([])
      setStreak(0)

    }
    finally {

      setLoading(false)

    }

  }


  // Correct useEffect pattern
  useEffect(() => {

    loadActivity()

  }, [])


  const completeToday = async () => {

    try {

      await saveActivity({

        date: dayjs().format("YYYY-MM-DD"),

        solved: true,

        score: Math.floor(Math.random() * 100),

        timeTaken: Math.floor(Math.random() * 300),

        difficulty: Math.floor(Math.random() * 3) + 1

      })

      await loadActivity()

    }
    catch (error) {

      console.error("Error saving activity:", error)

    }

  }


  if (loading) {

    return <div>Loading heatmap...</div>

  }


  return (

    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 0 5px rgba(0,0,0,0.1)"
      }}
    >

      <h2>

        {activity.length} contributions in {dayjs().year()}

      </h2>


      <button
        onClick={completeToday}
        style={{
          background: "green",
          color: "white",
          padding: "6px 12px",
          border: "none",
          borderRadius: "4px",
          marginTop: "10px",
          marginBottom: "10px",
          cursor: "pointer"
        }}
      >

        Complete Today Puzzle

      </button>


      <HeatmapGrid activity={activity} />


      <div style={{ marginTop: "10px" }}>

        Less

        <span style={{ marginLeft: "5px" }}></span>

        More

      </div>


      <div style={{ marginTop: "10px" }}>

        🔥 Current streak: <b>{streak}</b> days

      </div>


    </div>

  )

}

export default HeatmapContainer
