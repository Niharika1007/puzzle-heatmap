import dayjs from "dayjs"


export function generateYearDays(){

  const start=dayjs().startOf("year")
  const end=dayjs().endOf("year")

  const days=[]

  let current=start

  while(current.isBefore(end)||current.isSame(end)){

    days.push(current)

    current=current.add(1,"day")

  }

  return days

}


export function activityToMap(activity){

  const map={}

  activity.forEach(a=>{

    map[a.date]=a

  })

  return map

}


export function getIntensity(activity){

  if(!activity) return 0

  if(activity.score>80) return 4
  if(activity.score>60) return 3
  if(activity.score>40) return 2
  if(activity.score>20) return 1

  return 1

}


export function calculateStreak(map){

  let streak=0

  let current=dayjs()

  while(map[current.format("YYYY-MM-DD")]){

    streak++

    current=current.subtract(1,"day")

  }

  return streak

}
