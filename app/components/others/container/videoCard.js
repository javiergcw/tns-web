const VideoCard = ({ link, title, date, duration, category, color }) => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="relative">
        <iframe
          width="100%"
          height="200"
          src={link}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-t-lg"
        ></iframe>
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">{date}</p>
        <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">{category} · {duration}</p>
        <div className="absolute bottom-0 right-0 m-4">
          <span className={`inline-block w-4 h-4 rounded-full ${color}`}></span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
