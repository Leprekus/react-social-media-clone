import Button from '../ui/Button';
import Textarea from '../ui/Textarea';


export default function ChatInputSkeleton() {
  return (
    <div className='p-4 bg-[#262930] border-t border-charcoal mt-auto'>
    <div className='flex gap-6 items-end justify-end max-w-md mx-auto text-lg pb-2'>
      <Textarea
        className={`
        resize-none 
        rounded-[20px
        max-h-[60vh] 
        sm:rounded-md 
        sm:h-14 
        sm:pt-5
        bg-gray-600
        animate-pulse
        `}
      />
      <Button className={` w-14 h-14 animate-pulse bg-gray-600 border-transparent`}>
        
      </Button>
    </div>
  </div>
  )
}
