import { useNavigate } from 'react-router-dom';

export default function useNavigateAndMoveUp() {
  const navigate = useNavigate();

  return function({locate}) {

    navigate(`/${locate}`);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
