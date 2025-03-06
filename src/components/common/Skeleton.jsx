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
      <div className="grid grid-cols-2 sm:grid-cols-2 bg-background-light dark:bg-background-dark md:grid-cols-3 lg:grid-cols-4 gap-3">
        {Array.from({ length: count }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  };
  
  export default Skeleton;
  