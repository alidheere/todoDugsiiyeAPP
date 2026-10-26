'use client';
import { revalidatepage } from "../actions/revalidate-products"

const RevalidateButton = () => {
  return (
   <button onClick={revalidatepage} className="bg-amber-200 border-4"> revalidate</button>
  )
}

export default RevalidateButton