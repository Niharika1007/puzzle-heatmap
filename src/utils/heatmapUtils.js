import dayjs from "dayjs"

export function generateYearDays() {

  const start = dayjs().startOf("year")

  const end = dayjs().endOf("year")

  const days = []

  let current = start

  while (current.isBefore(end) || current.isSame(end)) {

    days.push(current.clone())

    current = current.add(1, "day")

  }

  return days
}

export function activityToMap(activity) {

  const map = {}

  activity.forEach(item => {

    map[item.date] = item

  })

  return map
}

export function calculateStreak(map) {

  let streak = 0

  let current = dayjs()

  while (map[current.format("YYYY-MM-DD")]?.solved) {

    streak++

    current = current.subtract(1, "day")

  }

  return streak
}

export function getIntensity(activity) {

  if (!activity) return 0

  if (activity.score >= 90) return 4
  if (activity.score >= 70) return 3
  if (activity.score >= 40) return 2

  return 1
}
