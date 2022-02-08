import React from 'react';
import CityTitle from '../city-title';
import BtnComponent from '../btn-component';
import SliderStep from './slider-step';
import TextStep from './text-step';
import RoomsStep from './rooms-step';

const Step = ({
  step,
  params,
  index,
  length,
  nextStep,
  prevStep,
  raionsStep,
  roomsStep,
  form,
  setForm,
}) => {
  return (
    <section className="header">
      <div
        style={{
          backgroundColor: 'rgba(0,0,0, .56)',
          width: '100%',
          padding: '100px 0px',
        }}
      >
        <div style={{ display: 'block' }} className="hd_inn">
          <div className="page_view">
            <p class="step_ident">Шаг 1/4</p>
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
