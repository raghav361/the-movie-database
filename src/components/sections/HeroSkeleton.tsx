const HeroSkeleton = () => {
  return (
    <div className="w-full h-[clamp(20rem,25vh+5vw,40rem)] bg-gray-400 animate-pulse flex flex-col justify-center">
      <div className="flex flex-col items-center">
        <div className="h-12 w-1/6 bg-gray-300 rounded mb-4"></div>
        <div className="h-10 w-3/6 bg-gray-300 rounded"></div>
      </div>
    </div>

    // <div className="w-full h-[35vh] bg-gray-400 animate-pulse">
    //   <div className="px-60 py-32">
    //     <div className="flex flex-col my-2 pl-[22.22rem]">
    //       <div className="h-12 w-1/6 bg-gray-300 rounded"></div>
    //     </div>
    //     <div className="flex items-center justify-center my-2">
    //       <div className="h-10 w-3/6 bg-gray-300 rounded"></div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default HeroSkeleton;
