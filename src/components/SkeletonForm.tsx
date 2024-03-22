export default function SkeletonForm() {
    return (
        <div role="status" className="w-full md:w-3/4 h-[80svh] p-4 border border-gray-300 rounded-lg shadow animate-pulse md:p-6">
            <div className="h-2.5 bg-gray-300 rounded-full  w-48 mb-4"></div>
            <div className="h-2 bg-gray-300 rounded-full  mb-2.5"></div>
            <div className="h-2 bg-gray-300 rounded-full  mb-2.5"></div>
            <div className="h-2 bg-gray-300 rounded-full  mb-2.5"></div>
            <div className="h-2.5 bg-gray-300 rounded-full  w-80 mb-4"></div>
            <div className="h-2 bg-gray-300 rounded-full  mb-2.5"></div>
            <div className="h-2 bg-gray-300 rounded-full  mb-2.5"></div>
            <div className="h-2 bg-gray-300 rounded-full  mb-2.5"></div>
            <div className="h-2.5 bg-gray-300 rounded-full  w-12 mb-4"></div>
            <div className="h-2 bg-gray-300 rounded-full  mb-2.5"></div>
            <div className="h-2 bg-gray-300 rounded-full  mb-2.5"></div>
            <div className="h-2 bg-gray-300 rounded-full "></div>
            <span className="sr-only">Loading...</span>
        </div>
    );
}
