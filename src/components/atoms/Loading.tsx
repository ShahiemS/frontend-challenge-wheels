import Lottie from "lottie-react";
import loadingAnimation from "../../assets/loading.json";

export default function Loading() {
  return (
    <div className="flex justify-center">
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        className="w-[400px] h-[400px]"
      />
    </div>
  );
}
