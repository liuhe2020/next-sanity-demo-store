export default function Skeleton() {
  return (
    <div className='grid gap-4 mx-auto xs:grid-cols-2 xs:gap-2.5 lg:grid-cols-3'>
      {Array.from({ length: 6 }, (_, index) => index + 1).map((i) => (
        <div
          key={i}
          className='space-y-6 pb-[10%] w-full h-full bg-stone-50 rounded-2xl overflow-hidden relative before:absolute before:inset-0  before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:-translate-x-full before:via-white/40 before:to-transparent isolate before:border-t before:border-white/40 lg:pb-10 lg:h-[400px]'
        >
          <div className='px-[10%] bg-[#eeedec]'>
            <div className='aspect-square' />
          </div>
          <div className='space-y-1.5 px-[10%]'>
            <div className='h-4 w-5/6 rounded-md bg-[#eeedec] mx-auto' />
            <div className='h-4 w-5/6 rounded-md bg-[#eeedec] mx-auto' />
          </div>
          <div className='w-28 h-4 rounded-md bg-[#eeedec] mx-auto' />
        </div>
      ))}
    </div>
  );
}
