const MovieCardSkeleton = () => {
    return (
        <div className="relative bg-[#20283E]/70 backdrop-blur-xl w-full rounded-lg aspect-[2/3] animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 rounded-lg" />
            <div className="absolute bottom-4 left-4 right-4">
                <div className="h-4 bg-gray-700 rounded w-2/3 mb-2" />
                <div className="h-3 bg-gray-700 rounded w-1/3" />
            </div>
        </div>
    )
}   

export default MovieCardSkeleton