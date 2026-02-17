import React from "react"

const months=[
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
]

function MonthLabels(){

  return(

    <div style={style}>

      {months.map(m=>
        <span key={m}>{m}</span>
      )}

    </div>

  )

}

const style={

  display:"grid",
  gridTemplateColumns:"repeat(12,1fr)",
  fontSize:"10px",
  marginBottom:"4px"

}

export default MonthLabels
