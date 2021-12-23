import React from "react"
import BtnComponent from "../btn-component"
import CityTitle from "../city-title"

const NameStep = ({params, nextStep}) => {
    return(<React.Fragment>
				<div className="title_inner">Как вас зовут?</div>
				<div className="block_phone">
					<div className="bp_title">Ваше имя</div>
					<div className="bp_inner">
						<form>
							<input id="name1" type="text" />
							<BtnComponent text={"Получить подборку"} params={params} clickFunct={nextStep} analog={true}/>
						</form>
					</div>
                </div>
    </React.Fragment>)
}

export default NameStep