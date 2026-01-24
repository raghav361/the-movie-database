interface SkeletonCardProps {
  variant?: "portrait" | "landscape";
}

const SkeletonCard = ({ variant = "portrait" }: SkeletonCardProps) => {
  if (variant === "portrait") {
    return (
      <div className="w-[clamp(8rem,10vw,14rem)] flex-shrink-0 animate-pulse py-5">
        <div className="w-full h-[clamp(12rem,14vw,18rem)] bg-gray-300 rounded-lg mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-1"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
      </div>
    );
  }

  // Landscape variant (for Latest Trailers)
  return (
    <div className="flex flex-col items-center justify-start w-[clamp(16rem,22vw,22rem)] flex-shrink-0 animate-pulse">
      <div className="w-full h-[clamp(10rem,12vw,14rem)] bg-gray-300 rounded-lg mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-1"></div>
    </div>
  );
};

export default SkeletonCard;
