import { Link } from "react-router-dom";

export default function StartTestPage({ resData }) {
  return (
    <div className="max-w-[1920px] max-h-[1080px] h-[100vh] mx-auto flex flex-col bg-white">
      {/* Top image section */}
      <div className="h-[400px] md:h-[400px] sm:h-[300px] overflow-hidden">
        <img
          src="/imgs/開始測驗.avif"
          alt="開始測驗"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content section */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-[255px]">
        <div className="">
          {/* Title */}
          <h1 className="text-[32px] sm:text-[40px] md:text-[52px] lg:text-[64px] ">
            五大性格特質
          </h1>
          <h2 className="flex flex-col sm:flex-row sm:items-center text-[32px] sm:text-[40px] md:text-[52px] lg:text-[64px] mb-[75px]">
            <p className="mr-0 sm:mr-[24px]">心理測驗</p>
            {/* Subtitle */}
            <p className="flex mt-2 h-[96px] items-center justify-start text-[16px] sm:text-[20px] md:text-[24px] text-gray-500 ">
              Big Five personality
              <br />
              traits test
            </p>
          </h2>

          {/* Description */}
          <div className="flex flex-col lg:flex-row justify-end gap-4 sm:gap-6 lg:gap-x-[30px]">
            <p className="text-[#00000098] max-w-full lg:max-w-[450px]">
              {resData?.description}
            </p>

            {/* Start button */}
            <Link
              to="/test"
              className="flex items-center justify-center gap-2 bg-[#4F61FF] text-white text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-medium px-8 sm:px-12 md:px-16 lg:px-[73px] py-3 sm:py-4 md:py-5 lg:py-[24px] hover:bg-[#3d4dd4] transition-colors"
            >
              <span>開始測驗</span>
              <span className="material-icons" style={{ fontSize: '32px' }}>
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
