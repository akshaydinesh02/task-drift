import { features } from "../constants";
import Feature from "./Feature";

const Features = () => {
  return (
    <section className="bg-gray-100">
      <div className="max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto">
        <div className="flex justify-between my-4 md:my-8 lg:my-12">
          <h1 className="w-full text-center text-3xl md:text-5xl font-extrabold">
            Features
          </h1>
        </div>
        <div className="flex flex-col gap-6 md:gap-12 items-center justify-center">
          {features.map((feature, _i) => (
            <Feature
              id={feature.id}
              key={feature.id}
              header={feature.header}
              description={feature.description}
              image={feature.image}
              isReversed={_i % 2 !== 0} // Alternate layout based on index
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
