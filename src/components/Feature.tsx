import { IFeatureProps } from "../types";

const Feature: React.FC<IFeatureProps> = ({
  header,
  description,
  image,
  isReversed,
}) => {
  return (
    <div
      className={`flex flex-col gap-4 md:gap-6 border-b pb-6 border-gray-300 ${
        isReversed ? "md:flex-row-reverse shadow-xl" : "md:flex-row"
      } justify-between items-center`}
    >
      <div className="w-[90%] md:w-[50%] mx-4 text-center text-center">
        <h1 className="text-xl md:text-4xl font-bold mb-2 text-blue-800">
          {header}
        </h1>
        <p className="text-sm md:text-xl">{description}</p>
      </div>
      <div className="w-[70%] md:w-[50%] flex justify-center items-center rounded-md">
        <img src={image} className="rounded-md" />
      </div>
    </div>
  );
};

export default Feature;
