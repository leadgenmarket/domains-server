import React, { useEffect, useState } from 'react';
import CityTitle from '../city-title';
import BtnComponent from '../btn-component';
import SliderStep from './slider-step';
import TextStep from './text-step';
import RoomsStep from './rooms-step';
import axios from 'axios';

const Step = ({ step, params, index, length, nextStep, prevStep, raionsStep, roomsStep, form, setForm, }) => {
  const [prices, setPrices] = useState({min_value:3000000, max_value:15000000})
  useEffect(async ()=>{
    let response = await axios.get("/tmp_prices/"+domainSettings.city.ID)
    setPrices(response.data.payload)
  })
  return (
    <section className="header" style={{ background: params.background != "" ? `url("https://admin.leadactiv.ru/file-store/${params.background}") center / cover no-repeat` : `url("https://admin.leadactiv.ru/templates/plans_template/build/img/hd_bg_0810.jpg")` }}>
      <div
        style={{
          backgroundColor: 'rgba(0,0,0, .56)',
          width: '100%',
          padding: '100px 0px',
        }}
      >
        <div style={{ display: 'block' }} className="hd_inn">
          <div className="page_view">
            <p class="step_ident">Шаг {index + 1}/{length}</p>
            <CityTitle params={params} />
            <div class="title_inner">{step.title}</div>
            {step.type == 'text' ||
              step.type == 'raions' ||
              step.type == 'sdacha' ? (
              <TextStep
                step={step}
                params={params}
                index={index}
                length={length}
                nextStep={nextStep}
                prevStep={prevStep}
                form={form}
                setForm={setForm}
              />
            ) : step.type == 'rooms' ? (
              <RoomsStep
                step={step}
                params={params}
                index={index}
                length={length}
                raionsStep={raionsStep}
                nextStep={nextStep}
                prevStep={prevStep}
                form={form}
                setForm={setForm}
              />
            ) : (
              <SliderStep
                step={step}
                raionsStep={raionsStep}
                roomsStep={roomsStep}
                params={params}
                index={index}
                length={length}
                nextStep={nextStep}
                prevStep={prevStep}
                form={form}
                prices={prices}
                setForm={setForm}
              />
            )}
            <div className="btn_block">
              {index > 0 ? (
                <BtnComponent
                  text={'Назад'}
                  params={params}
                  clickFunct={prevStep}
                  analog={true}
                />
              ) : (
                ''
              )}
              <BtnComponent
                text={'Дальше'}
                params={params}
                clickFunct={nextStep}
                analog={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Step;
