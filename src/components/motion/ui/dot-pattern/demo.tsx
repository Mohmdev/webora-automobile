'use client'

import DotPattern from '.'

export function Quote() {
  return (
    <>
      <div className="mx-auto mb-10 max-w-7xl px-6 md:mb-20 xl:px-0">
        <div className="relative flex flex-col items-center border border-red-500">
          <DotPattern width={5} height={5} />

          <div className="-left-1.5 -top-1.5 absolute h-3 w-3 bg-red-500 text-white" />
          <div className="-bottom-1.5 -left-1.5 absolute h-3 w-3 bg-red-500 text-white" />
          <div className="-right-1.5 -top-1.5 absolute h-3 w-3 bg-red-500 text-white" />
          <div className="-bottom-1.5 -right-1.5 absolute h-3 w-3 bg-red-500 text-white" />

          <div className="relative z-20 mx-auto max-w-7xl rounded-[40px] py-6 md:p-10 xl:py-20">
            <p className="text-red-500 text-xs md:text-md lg:text-lg xl:text-2xl">
              I believe
            </p>
            <div className="text-2xl tracking-tighter md:text-5xl lg:text-7xl xl:text-8xl">
              <div className="flex gap-1 md:gap-2 lg:gap-3 xl:gap-4">
                <h1 className="font-semibold">"Design should be</h1>
                <p className="font-thin">easy to</p>
              </div>
              <div className="flex gap-1 md:gap-2 lg:gap-3 xl:gap-4">
                <p className="font-thin">understand</p>
                <h1 className="font-semibold">because</h1>
                <p className="font-thin">simple</p>
              </div>
              <div className="flex gap-1 md:gap-2 lg:gap-3 xl:gap-4">
                <p className="font-thin">ideas</p>
                <h1 className="font-semibold">are quicker to</h1>
              </div>
              <h1 className="font-semibold">grasp..."</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
