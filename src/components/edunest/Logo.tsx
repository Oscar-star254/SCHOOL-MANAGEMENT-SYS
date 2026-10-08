import { Link } from 'react-router';
export function Logo({ inverse=false, compact=false }: { inverse?:boolean; compact?:boolean }) { return <Link to="/" className="logo-link" aria-label="EduNest home"><img src={compact?'/brand/edunest-symbol.svg':inverse?'/brand/edunest-white.svg':'/brand/edunest-logo.svg'} alt="EduNest" className={compact?'logo-symbol':'logo-full'}/></Link>; }
