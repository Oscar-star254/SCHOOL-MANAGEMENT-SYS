import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react';
import { X, Search, Inbox } from 'lucide-react';

const cx = (...v: Array<string | false | null | undefined>) => v.filter(Boolean).join(' ');

export function Button({ className, variant='primary', size='md', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary'|'secondary'|'ghost'|'danger'|'dark'; size?: 'sm'|'md'|'lg' }) {
  return <button className={cx('button', `button-${variant}`, `button-${size}`, className)} {...props} />;
}
export function Card({ children, className }: { children: ReactNode; className?: string }) { return <section className={cx('card', className)}>{children}</section>; }
export function Badge({ children, tone='neutral' }: { children: ReactNode; tone?: 'success'|'warning'|'danger'|'info'|'neutral'|'violet' }) { return <span className={cx('badge', `badge-${tone}`)}>{children}</span>; }
export function Avatar({ name, className }: { name: string; className?: string }) { const initials=name.split(' ').map(x=>x[0]).slice(0,2).join(''); return <span className={cx('avatar', className)} aria-label={name}>{initials}</span>; }
export function Input({ label, icon, className, ...props }: InputHTMLAttributes<HTMLInputElement> & { label?: string; icon?: ReactNode }) { return <label className="field"><span className="field-label">{label}</span><span className="input-wrap">{icon}<input className={cx('input', className)} {...props}/></span></label>; }
export function SearchInput(props: InputHTMLAttributes<HTMLInputElement>) { return <Input icon={<Search size={17}/>} aria-label="Search" {...props}/>; }
export function Select({ label, children, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { label?: string; children: ReactNode }) { return <label className="field"><span className="field-label">{label}</span><select className="input" {...props}>{children}</select></label>; }
export function Modal({ open, title, children, onClose }: { open:boolean; title:string; children:ReactNode; onClose:()=>void }) { if(!open)return null; return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><section className="modal" role="dialog" aria-modal="true" aria-label={title} onMouseDown={e=>e.stopPropagation()}><header className="modal-head"><div><span className="eyebrow">EduNest workspace</span><h2>{title}</h2></div><Button variant="ghost" size="sm" aria-label="Close" onClick={onClose}><X size={19}/></Button></header>{children}</section></div>; }
export function EmptyState({ title, description }: { title:string; description:string }) { return <div className="empty"><span className="empty-icon"><Inbox/></span><h3>{title}</h3><p>{description}</p></div>; }
