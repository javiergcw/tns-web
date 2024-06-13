import { useDispatch, useSelector } from 'react-redux';
import { toggleLanguage } from '../../../store/actions'

export default function LanguageToggle() {
  const isEnglish = useSelector((state) => state.isEnglish);
  const dispatch = useDispatch();

  return (
    <div className="flex items-center">
      <p className='mx-2'>
        {isEnglish ? "Translate:" : "Traducir:"}

      </p>
      <div
        onClick={() => dispatch(toggleLanguage())}
        className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer ${isEnglish ? 'bg-gray-300' : 'bg-gray-300'}`}
      >
        <div
          className={`w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${isEnglish ? 'translate-x-7' : ''}`}
          style={{
            backgroundImage: `url(${isEnglish ? '/images/flags/uk.png' : '/images/flags/col.png'})`,
            backgroundSize: 'cover',
          }}
        />
      </div>
    </div>
  );
}