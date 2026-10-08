const API_URL=import.meta.env.VITE_API_URL||'/api/v1';
export class ApiError extends Error{constructor(message:string,public status:number,public code='request_failed'){super(message)}}
export async function api<T>(path:string,options:RequestInit={}){
 const token=localStorage.getItem('edunest_access_token');const response=await fetch(`${API_URL}${path}`,{...options,headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{}) ,...options.headers}});const body=await response.json();if(!response.ok)throw new ApiError(body.error?.message||'Something went wrong.',response.status,body.error?.code);return body.data as T;
}
