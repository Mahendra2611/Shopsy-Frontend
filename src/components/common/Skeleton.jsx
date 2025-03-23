const SkeletonCard = () => {
    return (
      <div className="bg-background-light dark:bg-background-dark p-4 shadow-md rounded-lg animate-pulse">
        <div className="w-full h-32 md:h-48 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
        <div className="mt-2 h-4 w-3/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="mt-2 h-3 w-1/2 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="mt-2 h-3 w-1/3 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
    );
  };
  
  const Skeleton = ({ count = 6 }) => {
    return (
      <div className="grid h-[100vh] grid-cols-2 sm:grid-cols-2 bg-background-light dark:bg-background-dark md:grid-cols-3 lg:grid-cols-4 gap-3">
        {Array.from({ length: count }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  };
  
  export default Skeleton;

  export const DashboardSkeleton = () => {
    return (
      <div className="flex-1 p-6 bg-background-light dark:bg-background-dark">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 animate-pulse bg-gray-300 dark:bg-gray-700 h-8 w-48 rounded"></h2>
  
        {/* Action Buttons Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          ))}
        </div>
  
        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-300 dark:bg-gray-700 p-4 rounded-lg shadow-lg animate-pulse">
              <div className="h-4 w-32 bg-gray-400 dark:bg-gray-600 rounded mb-2"></div>
              <div className="h-8 w-20 bg-gray-400 dark:bg-gray-600 rounded mb-3"></div>
              <div className="h-6 w-24 bg-gray-500 dark:bg-gray-600 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  

  
  