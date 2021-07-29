import React from 'react'
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { setSetting, renderControl } from "../../store/actions";
import { Slider, Switch } from 'antd';
import UploadImage from "../../components/upload-image"
import {imageModes} from '../../libs/constants'


const PoissonSetting = ()=>{
    const imgSetting = useSelector((store) => store[imageModes.Poissons],shallowEqual)
    const { space, size, filled, stroke } = imgSetting;
    const dispatch = useDispatch()

    const onAfterChange = (type,value)=>{
        dispatch(setSetting({ type, value }));
        dispatch(renderControl(true));
    }

    return (
        <div>
            <UploadImage />
            <div className="setting-item">
                <h4>Dot Space</h4>
                <Slider defaultValue={space} min={0} max={20} onAfterChange={onAfterChange.bind(this,'space')} />
            </div>
            <div className="setting-item">
                <h4>Dot Size</h4>
                <Slider defaultValue={size} min={1} max={20} onAfterChange={onAfterChange.bind(this, "size")} />
            </div>
            <div className="setting-item">
                <h4>Fill Dots</h4>
                <Switch defaultChecked={filled} onChange={onAfterChange.bind(this, "filled")} />
            </div>
            <div className="setting-item">
                <h4>Stroke</h4>
                <Switch defaultChecked={stroke} onChange={onAfterChange.bind(this, "stroke")} />
            </div>
        </div>
    )
}

export default PoissonSetting;

