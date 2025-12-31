const DAYS = 45;
const storageKey = 'k8s45-progress';
const themeKey = 'k8s45-theme';
const state = JSON.parse(localStorage.getItem(storageKey)) || Array(DAYS).fill(false);
const theme = localStorage.getItem(themeKey) || 'light';
if(theme==='dark') document.documentElement.setAttribute('data-theme','dark');

function render(){
  const main = document.getElementById('main');
  main.innerHTML = '';
  const list = document.createElement('div'); list.className='day-list';
  for(let i=0;i<DAYS;i++){
    const el = document.createElement('div'); el.className='day';
    if(state[i]) el.classList.add('completed');
    el.innerHTML = `<a href="../days/day-${String(i+1).padStart(2,'0')}/README.md">Day ${i+1}</a><button data-day="${i}">${state[i]? 'Undo':'Done'}</button>`;
    list.appendChild(el);
  }
  main.appendChild(list);
  const pct = Math.round((state.filter(Boolean).length/DAYS)*100);
  document.getElementById('progress').innerText = `${pct}%`;
}

document.addEventListener('click',(e)=>{
  if(e.target.tagName==='BUTTON' && e.target.dataset.day!==undefined){
    const d = Number(e.target.dataset.day); state[d]=!state[d]; localStorage.setItem(storageKey,JSON.stringify(state)); render();
  }
});

document.getElementById('theme-toggle').addEventListener('click',()=>{
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur==='dark' ? 'light' : 'dark';
  if(next==='dark') document.documentElement.setAttribute('data-theme','dark'); else document.documentElement.removeAttribute('data-theme');
  localStorage.setItem(themeKey, next);
});

render();
