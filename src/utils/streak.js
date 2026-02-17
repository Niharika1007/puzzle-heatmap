export function calculateStreak(activity) {

  const dates = activity
    .map(a => new Date(a.date))
    .sort((a, b) => b - a)

  let streak = 0
  let current = new Date()

  current.setHours(0,0,0,0)

  for (let date of dates) {

    date.setHours(0,0,0,0)

    const diff =
      (current - date) / (1000 * 60 * 60 * 24)

    if (diff === streak)
      streak++
    else
      break
  }

  return streak
}
