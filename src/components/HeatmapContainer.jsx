import React, { useEffect, useState } from "react"
import HeatmapGrid from "./HeatmapGrid"
import MonthLabels from "./MonthLabels"

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


  // ✅ SAFE loading function
  async function loadActivityData() {

    try {

      const data = await getAllActivity()

      setActivity(data)

      const map = activityToMap(data)

      setStreak(calculateStreak(map))

    }
    catch(err){
      console.error(err)
    }
    finally{
      setLoading(false)
    }

  }


  // ✅ SAFE useEffect pattern
  useEffect(() => {

    loadActivityData()

  }, [])


  async function completeToday(){

    await saveActivity({

      date: dayjs().format("YYYY-MM-DD"),
      score: Math.floor(Math.random()*100),
      solved: true

    })

    loadActivityData()

  }


  if(loading){
    return <div>Loading heatmap...</div>
  }


  return(

    <div style={{padding:"20px"}}>

      <h2>
        {activity.length} contributions in {dayjs().year()}
      </h2>

      <button onClick={completeToday}>
        Complete Today Puzzle
      </button>

      <MonthLabels/>

      <HeatmapGrid activity={activity}/>

      <div>
        🔥 Current streak: {streak}
      </div>

    </div>

  )

}

export default HeatmapContainer
