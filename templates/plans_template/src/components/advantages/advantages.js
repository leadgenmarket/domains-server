import React, { useEffect, useState } from 'react';

const Advantages = () => {
  const [advantages, setAdvantages] = useState([]);
  useEffect(() => {
    setAdvantages(domainSettings.domain.Advantages);
  }, [domainSettings.domain.Advantages]);
  return (
    <React.Fragment>
      <div className="tm">{domainSettings.domain.AdvantagesTitle}</div>
      <div className="adv_list">
        <ul>
          {advantages.map((advantage) => {
            return (
              <li key={advantage.name}>
                <img src={"https://admin.leadactiv.ru/file-store/" + advantage.image} />
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
