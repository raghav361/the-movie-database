import { Movie } from '../../types/trending';
import { Show } from '../../types/popular';
import RatingCircle from '../common/RatingCircle';

type Props = {
  item: Movie | Show;
  type: 'movie' | 'show';
};

const ReusableCard: React.FC<Props> = ({ item, type }) => {
  const title = type === 'movie' ? (item as Movie).title : (item as Show).original_name;
  const date = type === 'movie' ? (item as Movie).release_date : (item as Show).first_air_date;

  return (
    <div className="w-[clamp(8rem,10vw,14rem)]">
      <div className="relative">
        {item.poster_path || item.backdrop_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w1280${item.poster_path}`}
            alt={title}
            className="rounded-xl w-full h-[clamp(12rem,14vw,18rem)] my-4"
            loading="lazy"
          />
        ) : (
          //If there is no image, show a placeholder with the title
          <div className="w-[clamp(9.5rem,10vw,16rem)] h-[clamp(14rem,14vh,20rem)] rounded-xl my-4 text-center flex items-center justify-center bg-gradient-to-br from-emerald-500 via-emerald-200 via-cyan-200 to-cyan-500 truncate font-semibold">
            {title}
          </div>
        )}
        <div className="flex flex-col items-center justify-center">
          <span className="absolute bg-black rounded-full bottom-0">
            <RatingCircle value={Math.round(item.vote_average * 10)} size={40} />
          </span>
        </div>
      </div>
      <div className="p-2 text-black">
        <h3 className="text-sm font-semibold truncate">{title}</h3>
        <p className="text-sm text-gray-400">{date}</p> 
      </div>
    </div>
  );
};

export default ReusableCard;
