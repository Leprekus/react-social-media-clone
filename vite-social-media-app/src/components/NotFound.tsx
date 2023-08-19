import Link from './Link';

export default function NotFound() {
  return (
    <div className='
        bg-black
        min-w-full
        min-h-screen
        text-white
        font-light
        flex
        flex-col
        gap-4
        justify-center
        items-center
    '>
        <h1 className='text-4xl flex items-center justify-center gap-4'>
           404
            <span className='text-xl'>| Not Found
        </span></h1>
        <Link
          href='/'
          className='
          px-4
          py-4
          rounded-md
          border
          border-violet-900
          focus:outline-violet-900
          bg-violet-950/70
          hover:bg-violet-950/60
          text-violet-400
          active:bg-violet-950/50
          transition
          w-36
          text-center
          '
          >Home</Link>
    </div>
  )
}
