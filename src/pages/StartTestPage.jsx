import { Link } from "react-router-dom";

export default function StartTestPage({ resData }) {
  return (
    <div className="max-w-[1920px] max-h-[1080px] h-[100vh]  mx-auto flex flex-col bg-white">
      {/* Top image section */}
      <div className="h-[400px] overflow-hidden">
        <img
          src="/imgs/開始測驗.avif"
          alt="開始測驗"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content section */}
      <div className="flex-1 flex flex-col justify-center px-[255px]">
        <div className="">
          {/* Title */}
          <h1 className="text-[64px] leading-[1.5]">五大性格特質</h1>
          <h2 className="flex items-center text-[64px] leading-[1.5] h-[96px] mb-6">
            <p className="mr-[24px]">心理測驗</p>
            {/* Subtitle */}
            <p className="flex mt-[48px] items-center justify-center text-[24px] text-gray-500 mb-12">
              Big Five personality
              <br />
              traits test
            </p>
          </h2>

          {/* Description */}
          <div className="flex items-start justify-between gap-12">
            <p className="text-[14px] leading-[1.8] text-gray-600 max-w-[600px]">
              {resData?.description}
            </p>

            {/* Start button */}
            <Link
              to="/test"
              className="flex items-center gap-2 bg-[#4F61FF] text-white text-[32px] font-medium px-[73px] py-[24px] hover:bg-[#3d4dd4] transition-colors"
            >
              <span>開始測驗</span>
              <span className="material-icons" style={{ fontSize: "48px" }}>
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
