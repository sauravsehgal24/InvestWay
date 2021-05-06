import post from "axios";

export async function _post<T>(url,headers?,body?): Promise<T>{
    console.log("in post -----------")
    return post( url ).then(res=>{
        return res.data as unknown as T
    }).catch(err=>{
        console.log("----------------------")
        return err as unknown as T
    })      
}
   