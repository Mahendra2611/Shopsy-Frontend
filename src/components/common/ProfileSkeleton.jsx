export default function ProfileSkeleton() {
    return (
      <div className=" w-[100vw] h-[100vh] p-6 border  shadow-md bg-white dark:bg-gray-800 dark:border-gray-700">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
          <div className="mt-4 h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="mt-2 h-3 w-40 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
        <div className="mt-6 space-y-3">
          <div className="h-3 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-3 w-5/6 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-3 w-3/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      </div>
    );
  }
  