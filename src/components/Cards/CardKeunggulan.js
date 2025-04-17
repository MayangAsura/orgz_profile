const CardKeunggulan = ({
  icon,
  title,
  description,
  bgColor = "bg-red-400",
}) => {
  return (
    <div className="flex w-full px-4 pt-6 text-center lg:pt-12 md:w-4/12">
      <div className="relative flex flex-col flex-1 w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg">
        <div className="flex-auto px-4 py-5">
          <div
            className={`inline-flex items-center justify-center w-12 h-12 p-3 mb-5 text-white rounded-full shadow-lg ${bgColor}`}
          >
            <i className={icon}></i>
          </div>
          <h6 className="text-xl font-semibold">{title}</h6>
          <p className="mt-2 mb-4 text-blueGray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CardKeunggulan;
