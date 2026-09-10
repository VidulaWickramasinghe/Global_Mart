'use client';
import { createContext, useContext, useEffect, useState, useCallback, useRef, type ReactNode } from 'react';
import { toast, Toaster } from 'sonner';
import { type StoreData, getProduct } from '@/lib/catalog';
const empty:StoreData={cart:[],wishlist:[],recent:[],orders:[],profile:{},user:null};
export async function storeRequest<T=StoreData>(body?:Record<string,unknown>):Promise<T>{const response=await fetch('/api/store',{method:body?'POST':'GET',credentials:'same-origin',headers:body?{'Content-Type':'application/json'}:undefined,body:body?JSON.stringify(body):undefined});const data=await response.json() as T & {error?:string};if(!response.ok)throw new Error(data.error??'Something went wrong. Please try again.');return data;}
type Context={data:StoreData;loading:boolean;busy:boolean;error:string;cartOpen:boolean;setCartOpen:(open:boolean)=>void;refresh:()=>Promise<void>;change:(body:Record<string,unknown>)=>Promise<boolean>;add:(id:string,quantity?:number)=>Promise<void>;save:(id:string)=>Promise<void>;setData:(data:StoreData)=>void};
const StoreContext=createContext<Context|null>(null);
export function StoreProvider({children}:{children:ReactNode}){const[data,setData]=useState<StoreData>(empty);const[loading,setLoading]=useState(true);const[busy,setBusy]=useState(false);const[error,setError]=useState('');const[cartOpen,setCartOpen]=useState(false);const pending=useRef(false);
const refresh=useCallback(async()=>{setLoading(true);try{setData(await storeRequest());setError('');}catch(e){setError((e as Error).message);}finally{setLoading(false);}},[]);
useEffect(()=>{void refresh()},[refresh]);
async function change(body:Record<string,unknown>){if(pending.current)return false;pending.current=true;setBusy(true);try{setData(await storeRequest(body));setError('');return true;}catch(e){toast.error((e as Error).message);return false;}finally{setBusy(false);pending.current=false;}}
async function add(id:string,quantity=1){const p=getProduct(id);if(!p)return;const next=(data.cart.find(i=>i.productId===id)?.quantity??0)+quantity;if(next>Math.min(p.stock,10)){toast.error('You can add up to '+Math.min(p.stock,10)+' of this item.');return;}if(await change({action:'cart',productId:id,quantity:next})){toast.success('Added to your bag');setCartOpen(true);}}
async function save(id:string){const saved=!data.wishlist.includes(id);if(await change({action:'wishlist',productId:id,saved}))toast.success(saved?'Saved to your wishlist':'Removed from your wishlist');}
return <StoreContext.Provider value={{data,loading,busy,error,cartOpen,setCartOpen,refresh,change,add,save,setData}}>{children}<Toaster position="bottom-right" richColors closeButton/></StoreContext.Provider>}
export function useStore(){const store=useContext(StoreContext);if(!store)throw new Error('StoreProvider missing');return store;}
