import { imageSources } from "@/config/constants"
import { imgixLoader } from "@/lib/imgix-loader"

export const FeaturesSection = () => {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-8xl sm:text-center">
          <h2 className="font-semibold text-base leading-7 md:text-2xl">
            We've got what you need
          </h2>
          <h2 className="mt-2 font-bold text-4xl text-gray-900 uppercase tracking-tight sm:text-8xl">
            No car? No problem
          </h2>
          <p className="mt-6 text-gray-600 text-lg leading-8">
            Our exclusive collection offers unmatched luxury and speed for the
            ultimate driving experience
          </p>
        </div>
      </div>
      <div className="-mb-16 sm:-mb-24 relative overflow-hidden pt-16 xl:mb-0">
        <div
          className="mx-auto h-[300px] max-w-7xl bg-bottom bg-cover bg-no-repeat shadow-2xl xl:rounded-t-xl"
          style={{
            backgroundImage: `url(${imgixLoader({ src: imageSources.featureSection, width: 1280, quality: 100 })})`,
          }}
        />
        <div aria-hidden="true" className="relative hidden xl:block">
          <div className="-inset-x-20 absolute bottom-0 bg-linear-to-t from-white to-transparent pt-[3%]" />
        </div>
      </div>
    </div>
  )
}
