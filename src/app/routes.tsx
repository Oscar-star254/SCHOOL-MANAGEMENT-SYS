import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';
import { AppShell } from '../components/edunest/AppShell';
import { Protected } from './auth';
const Marketing=lazy(()=>import('../pages/edunest/Marketing'));
const Dashboard=lazy(()=>import('../pages/edunest/Dashboard'));
const ModulePage=lazy(()=>import('../pages/edunest/ModulePage'));
const Login=lazy(()=>import('../pages/edunest/Auth').then(m=>({default:m.Login})));
const Register=lazy(()=>import('../pages/edunest/Auth').then(m=>({default:m.Register})));
const Forgot=lazy(()=>import('../pages/edunest/SupportFlows').then(m=>({default:m.Forgot})));
const Demo=lazy(()=>import('../pages/edunest/SupportFlows').then(m=>({default:m.Demo})));
const Platform=lazy(()=>import('../pages/edunest/Platform'));
const Legal=lazy(()=>import('../pages/edunest/Legal'));
const RegisterStudent=lazy(()=>import('../RegisterStudent'));
const wait=(node:React.ReactNode)=><Suspense fallback={<div className="route-loader"><img src="/brand/edunest-symbol.svg" alt=""/><span>Preparing your workspace…</span></div>}>{node}</Suspense>;
export const router=createBrowserRouter([
 {path:'/',element:wait(<Marketing/>)},{path:'/login',element:wait(<Login/>)},{path:'/register',element:wait(<Register/>)},{path:'/forgot-password',element:wait(<Forgot/>)},{path:'/demo',element:wait(<Demo/>)},{path:'/platform',element:wait(<Protected><Platform/></Protected>)},
 {path:'/privacy',element:wait(<Legal/>)},{path:'/terms',element:wait(<Legal/>)},{path:'/data-protection',element:wait(<Legal/>)},
 {path:'/app',element:<Protected><AppShell/></Protected>,children:[{index:true,element:wait(<Dashboard/>)},{path:':module',element:wait(<ModulePage/>)}]},
  {path:'/register-student',element:wait(<Protected><RegisterStudent/></Protected>)},
 {path:'*',element:<Navigate to="/" replace/>}
]);
