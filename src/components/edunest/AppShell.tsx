import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router';
import { Bell, ChevronDown, Command, HelpCircle, Menu, Moon, Plus, Search, Sun, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Logo } from './Logo';
import { Avatar, Badge, Button } from './ui';
import { navGroups } from '../../app/data';

export function AppShell(){
 const [open,setOpen]=useState(false),[command,setCommand]=useState(false),[dark,setDark]=useState(()=>localStorage.getItem('theme')==='dark');
 const loc=useLocation(), nav=useNavigate();
 useEffect(()=>{ document.documentElement.classList.toggle('dark',dark); localStorage.setItem('theme',dark?'dark':'light') },[dark]);
 useEffect(()=>{setOpen(false)},[loc.pathname]);
 useEffect(()=>{const h=(e:KeyboardEvent)=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();setCommand(v=>!v)}};addEventListener('keydown',h);return()=>removeEventListener('keydown',h)},[]);
 const links=navGroups.flatMap(g=>g.items);
 return <div className="app-frame">
   <aside className={`sidebar ${open?'sidebar-open':''}`}>
    <div className="sidebar-brand"><Logo inverse/><Button variant="ghost" className="mobile-close" aria-label="Close menu" onClick={()=>setOpen(false)}><X/></Button></div>
    <div className="school-switcher"><span className="school-mark">BH</span><span><strong>Baraka Hills Academy</strong><small>Professional plan</small></span><ChevronDown size={16}/></div>
    <nav className="side-nav">{navGroups.map(group=><div className="nav-group" key={group.label}><span className="nav-label">{group.label}</span>{group.items.map(({slug,label,icon:Icon})=><NavLink key={slug} to={slug==='dashboard'?'/app':`/app/${slug}`} end={slug==='dashboard'} className={({isActive})=>isActive?'nav-item active':'nav-item'}><Icon size={18}/><span>{label}</span>{slug==='admissions'&&<em>8</em>}</NavLink>)}</div>)}</nav>
    <div className="sidebar-foot"><div className="trial"><span><strong>Professional plan</strong><small>Renews 28 Feb 2026</small></span><Badge tone="success">Active</Badge></div><div className="powered">Powered by <strong>EduNest</strong></div></div>
   </aside>
   {open&&<div className="sidebar-scrim" onClick={()=>setOpen(false)}/>}
   <main className="app-main">
    <header className="topbar"><Button variant="ghost" className="menu-button" onClick={()=>setOpen(true)} aria-label="Open menu"><Menu/></Button><button className="command-trigger" onClick={()=>setCommand(true)}><Search size={17}/><span>Search students, staff, invoices…</span><kbd><Command size={12}/> K</kbd></button><div className="top-actions"><Button variant="ghost" aria-label="Help"><HelpCircle size={19}/></Button><Button variant="ghost" aria-label="Toggle theme" onClick={()=>setDark(v=>!v)}>{dark?<Sun size={19}/>:<Moon size={19}/>}</Button><Button variant="ghost" className="notification" aria-label="Notifications"><Bell size={19}/><i/></Button><span className="top-divider"/><Avatar name="James Kariuki"/><span className="profile-copy"><strong>James Kariuki</strong><small>School Admin</small></span></div></header>
    <div className="content"><Outlet/></div>
    <nav className="mobile-nav">{links.slice(0,4).map(({slug,label,icon:Icon})=><NavLink key={slug} to={slug==='dashboard'?'/app':`/app/${slug}`} end={slug==='dashboard'}><Icon/><span>{label.split(' ')[0]}</span></NavLink>)}<button onClick={()=>setOpen(true)}><Menu/><span>More</span></button></nav>
   </main>
   <AnimatePresence>{command&&<motion.div className="command-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={()=>setCommand(false)}><motion.section className="command-menu" initial={{opacity:0,y:-12,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:-8}} onMouseDown={e=>e.stopPropagation()}><div className="command-input"><Search/><input autoFocus placeholder="Search everything in Baraka Hills…"/></div><span className="command-label">Quick navigation</span>{links.slice(0,8).map(({slug,label,icon:Icon})=><button key={slug} onClick={()=>{nav(slug==='dashboard'?'/app':`/app/${slug}`);setCommand(false)}}><Icon/><span>{label}</span><small>Open</small></button>)}<footer><span>↑↓ Navigate</span><span>↵ Open</span><span>esc Close</span></footer></motion.section></motion.div>}</AnimatePresence>
 </div>
}
