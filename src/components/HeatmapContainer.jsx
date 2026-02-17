import { useEffect, useState, useCallback } from "react"
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

  const loadActivity = useCallback(async () => {

    const data = await getAllActivity()

    setActivity(data)

    const map = activityToMap(data)

    setStreak(calculateStreak(map))

  }, [])

  useEffect(() => {

    loadActivity()

  }, [loadActivity])

  const completeToday = async () => {

    await saveActivity({

      date: dayjs().format("YYYY-MM-DD"),

      solved: true,

      score: Math.floor(Math.random() * 100),

      timeTaken: Math.floor(Math.random() * 300),

      difficulty: Math.floor(Math.random() * 3) + 1

    })

    loadActivity()

  }

  return (
    <div className="bg-white p-6 rounded shadow inline-block">

      <h2 className="text-lg font-semibold mb-3">

        {activity.length} contributions in {dayjs().year()}

      </h2>

      <button
        onClick={completeToday}
        className="bg-green-600 text-white px-3 py-1 rounded mb-4"
      >
        Complete Today Puzzle
      </button>

      <HeatmapGrid activity={activity} />

      {/* legend */}
      <div className="flex gap-1 mt-4 text-xs">

        Less

        <div className="w-[12px] h-[12px] bg-gray-200"></div>
        <div className="w-[12px] h-[12px] bg-green-200"></div>
        <div className="w-[12px] h-[12px] bg-green-400"></div>
        <div className="w-[12px] h-[12px] bg-green-600"></div>
        <div className="w-[12px] h-[12px] bg-green-800"></div>

        More

      </div>

      <div className="mt-3">

        🔥 Current streak: <b>{streak}</b> days

      </div>

    </div>
  )
}

export default HeatmapContainer
