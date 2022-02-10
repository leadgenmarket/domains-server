import { useEffect, useState } from 'react';

const BtnComponent = ({ params, clickFunct, text, analog }) => {
  const defaultStyle = { background: `#${params.main_color}` };
  const [styleC, setStyle] = useState({ background: `#${params.main_color}` });

  useEffect(() => {
    setStyle({ background: `#${params.main_color}` });
  }, [params]);

  const hoveredStyle = {
    background: `#${params.main_color}`,
    color: `#${params.secondary_color}`,
    borderColor: `#${params.secondary_color}`,
  };
  if (analog) {
    return (
      <button
        className="btn_main back_btn"
        onMouseLeave={() => setStyle(defaultStyle)}
        onMouseEnter={() => setStyle(hoveredStyle)}
        onClick={clickFunct}
      //style={styleC}
      >
        {text}
      </button>
    );
  }
  return (
    <button
      className="btn_main"
      href="#"
      onMouseLeave={() => setStyle(defaultStyle)}
      onMouseEnter={() => setStyle(hoveredStyle)}
      onClick={clickFunct}
    //style={styleC}
    >
      {text}
    </button>
  );
};

export default BtnComponent;
