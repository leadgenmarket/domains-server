import { useEffect, useState } from 'react';

const BtnComponent = ({ params, clickFunct, text, analog, type }) => {
  const defaultStyle = { background: `#${params.main_color}`, borderColor: `#${params.secondary_color}`, };
  const [styleC, setStyle] = useState({ background: `#${params.main_color}` });

  useEffect(() => {
    setStyle({
      background: `#${params.main_color}`,
      borderColor: `#${params.secondary_color}`,
    });
  }, [params]);

  const hoveredStyle = {
    background: `#${params.main_color}`,
    color: `#${params.secondary_color}`,
    borderColor: `#${params.secondary_color}`,
  };
  if (analog) {
    return (
      <button
        className={type !== "square" ? "btn_main back_btn" : "btn_more jkd_list_btn"}
        onMouseLeave={() => setStyle(defaultStyle)}
        onMouseEnter={() => setStyle(hoveredStyle)}
        onClick={clickFunct}
        style={styleC}
      >
        {text}
      </button>
    );
  }
  return (
    <button
      className={type !== "square" ? "btn_main btn_start" : "jk_btn"}
      href="#"
      onMouseLeave={() => setStyle(defaultStyle)}
      onMouseEnter={() => setStyle(hoveredStyle)}
      onClick={clickFunct}
      style={styleC}
    >
      {text}
    </button>
  );
};

export default BtnComponent;
