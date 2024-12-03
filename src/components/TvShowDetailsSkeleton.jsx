// src/components/TvShowDetailsSkeleton.jsx
const TvShowDetailsSkeleton = () => {
    return (
      <div className='w-screen flex flex-col min-h-screen relative bg-[#121829] p-16 pb-24'>
        <div className="flex flex-col mt-8 gap-8">
          {/* Hero Section Skeleton */}
          <div className='px-16 flex items-center justify-center relative w-full'>
            <div className='w-full bg-gray-800 rounded-3xl aspect-[21/9] h-[500px] animate-pulse' />
            
            <div className='absolute flex flex-col gap-4 p-8 bottom-8 left-24 w-2/5 bg-white/10 rounded-3xl backdrop-blur-xl'>
              <div className="flex items-center gap-2">
                <div className="w-20 h-6 bg-gray-700 rounded-full animate-pulse" />
                <div className="w-16 h-6 bg-gray-700 rounded-full animate-pulse" />
              </div>
              <div className="w-3/4 h-8 bg-gray-700 rounded-lg animate-pulse" />
            </div>
          </div>
  
          {/* Details Section Skeleton */}
          <div className='flex justify-center px-16 gap-14 mt-12'>
            {/* Poster Skeleton */}
            <div className="w-1/4 rounded-xl shadow-xl aspect-[2/3] bg-gray-800 animate-pulse" />
  
            <div className="flex flex-col gap-6 w-2/5">
              {/* Genres Skeleton */}
              <div className="flex gap-4 flex-wrap">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-24 h-8 bg-gray-800 rounded-full animate-pulse" />
                ))}
              </div>
  
              {/* Overview Skeleton */}
              <div className="space-y-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-full h-4 bg-gray-800 rounded animate-pulse" />
                ))}
              </div>
  
              {/* Info Grid Skeleton */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex items-center gap-3 bg-gray-800/50 p-4 rounded-lg animate-pulse">
                    <div className="w-8 h-8 rounded-full bg-gray-700" />
                    <div className="flex-1">
                      <div className="w-20 h-3 bg-gray-700 rounded mb-2" />
                      <div className="w-16 h-4 bg-gray-700 rounded" />
                    </div>
                  </div>
                ))}
              </div>
  
              {/* Additional Info Skeletons */}
              {[1, 2].map(section => (
                <div key={section} className="mt-6">
                  <div className="w-32 h-4 bg-gray-800 rounded mb-4 animate-pulse" />
                  <div className="flex gap-4 flex-wrap">
                    {[1, 2].map(i => (
                      <div key={i} className="w-32 h-8 bg-gray-800 rounded-lg animate-pulse" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default TvShowDetailsSkeleton