import { createContext, useContext, type ReactNode } from 'react';
import { Navigate } from 'react-router';
type User={id:string;name:string;role:string;schoolId:string|null;permissions:string[]};
const demoUser:User={id:'user-admin',name:'James Kariuki',role:'School Admin',schoolId:'school-baraka',permissions:['*']};
const AuthContext=createContext<{user:User|null}>({user:demoUser});
export function AuthProvider({children,user=demoUser}:{children:ReactNode;user?:User|null}){return <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>}
export function useAuth(){return useContext(AuthContext)}
export function Can({permission,children,fallback=null}:{permission:string;children:ReactNode;fallback?:ReactNode}){const {user}=useAuth();return user&&(user.permissions.includes('*')||user.permissions.includes(permission))?<>{children}</>:<>{fallback}</>}
export function Protected({children}:{children:ReactNode}){return useAuth().user?<>{children}</>:<Navigate to="/login" replace/>}
