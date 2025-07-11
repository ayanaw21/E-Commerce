
'use client'


import { Loader2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"


type SubmitButtonProps = {
    className?:string;
    text?:string;
};
const SubmitButton = ({className='',text='submit'}:SubmitButtonProps) => {
    const {pending} = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className={`${className} mt-2`} size='lg'>
        {pending? (
            <>
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin"/>
            Please wait...
            </>
        ): (text)}
    </Button>
  )
}

export default SubmitButton