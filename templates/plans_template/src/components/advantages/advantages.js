import React, { useEffect, useState } from 'react';

const Advantages = () => {
  const [advantages, setAdvantages] = useState([]);
  useEffect(() => {
    setAdvantages([
      {
        name: 'Закрытая база квартир класса-люкс',
        image: '/img/adv_img/1.png',
      },
      {
        name: 'Роскошные планировки',
        image: '/img/adv_img/2.png',
      },
      {
        name: 'Заключение сделки напрямую с застройщиком',
        image: '/img/adv_img/3.png',
      },
      {
        name: 'Консультации экспертов 24/7',
        image: '/img/adv_img/4.png',
      },
      {
        name: 'Любые способы оплаты',
        image: '/img/adv_img/5.png',
      },
      {
        name: 'Презентации объектов',
        image: '/img/adv_img/6.png',
      },
    ]);
  }, []);
  return (
    <React.Fragment>
      <div className="tm">Преимущества портала новостроек</div>
      <div className="adv_list">
        <ul>
          {advantages.map((advantage) => {
            return (
              <li key={advantage.name}>
                <img src={advantage.image} />
                <span>{advantage.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Advantages;
