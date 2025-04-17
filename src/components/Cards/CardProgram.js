const CardProgram = ({ image, title, description }) => {
  return (
    <div className="flex w-full px-2 pt-6 text-center lg:pt-12 md:w-5/12">
      <div className="relative flex flex-col flex-1 w-full min-w-0 p-8 mb-8 break-words bg-white rounded-lg shadow-lg">
        <img
          alt={title}
          src={image}
          className="w-1/2 mx-auto align-middle rounded-full rounded-t-lg shadow-lg"
        />
        <h5 className="mt-4 text-xl font-bold">{title}</h5>
        <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CardProgram;
