import React, { useEffect, useState } from 'react'
import './App.css'

const DAYS = 45

function DayCard({ i, done, onToggle }: { i: number; done: boolean; onToggle: (i:number)=>void }){
  return (
    <div className={`card ${done? 'done':''}`}>
      <div className="day">Day {i+1}</div>
      <button onClick={()=>onToggle(i)} aria-pressed={done}>{done? 'Completed':'Mark done'}</button>
    </div>
  )
}

export default function App(){
  const [days, setDays] = useState<boolean[]>(()=>{
    try{ const raw = localStorage.getItem('k8s45-react-days'); if(raw) return JSON.parse(raw) }catch(e){}
    return Array(DAYS).fill(false)
  })
  const [theme, setTheme] = useState<string>(()=> localStorage.getItem('k8s45-theme') || 'light')

  useEffect(()=>{ document.body.classList.toggle('dark', theme==='dark'); localStorage.setItem('k8s45-theme', theme) }, [theme])
  useEffect(()=>{ localStorage.setItem('k8s45-react-days', JSON.stringify(days)) }, [days])

  const toggle = (i:number)=> setDays(d=>{ const copy = [...d]; copy[i]=!copy[i]; return copy })
  const completed = days.filter(Boolean).length

  return (
    <div className="app">
      <header className="header">
        <h1>Kubernetes 45 — Tracker</h1>
        <div className="controls">
          <div className="progress">{completed}/{DAYS} ({Math.round((completed/DAYS)*100)}%)</div>
          <button onClick={()=>setTheme(t=> t==='dark'?'light':'dark')} className="theme">Toggle Theme</button>
        </div>
      </header>

      <main>
        <section className="grid">
          {days.map((d,i)=>(<DayCard key={i} i={i} done={d} onToggle={toggle}/>))}
        </section>
      </main>

      <footer className="footer">
        <small>Progress saved in localStorage • Responsive & Dark mode</small>
      </footer>
    </div>
  )
}
