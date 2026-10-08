export type OfflineAction={id:string;type:'attendance'|'marks';payload:unknown;createdAt:string};
const KEY='edunest_offline_queue';
export function pendingActions():OfflineAction[]{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return []}}
export function enqueue(type:OfflineAction['type'],payload:unknown){const action={id:crypto.randomUUID(),type,payload,createdAt:new Date().toISOString()};localStorage.setItem(KEY,JSON.stringify([...pendingActions(),action]));return action}
export async function flushQueue(send:(action:OfflineAction)=>Promise<void>){const queue=pendingActions(),failed:OfflineAction[]=[];for(const action of queue){try{await send(action)}catch{failed.push(action)}}localStorage.setItem(KEY,JSON.stringify(failed));return {sent:queue.length-failed.length,failed:failed.length}}
