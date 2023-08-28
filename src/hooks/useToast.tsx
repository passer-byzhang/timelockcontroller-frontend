
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Toastify(promise:Promise<any>){
    //const resolveAfter2Seconds = new Promise(resolve => setTimeout(resolve, 2000))
    const notify = () => toast.promise(promise, {
      pending: "waiting for the promise to resolve",
      success: "promise resolved successfully",
      error: "promise failed to resolve"
    });
    return 
  }