
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'

export const LoadingButton = () => {
  return (
     <Button disabled>
        <Loader2 className="animate-spin h-4 w-4 mr-2" />
        Loading...
     </Button>
  )
}
