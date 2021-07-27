import React from 'react'
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { setSetting, renderControl } from "../../store/actions";
import { Slider, Switch } from 'antd';
import UploadImage from "../../components/upload-image"
import { imageModes } from '../../lib/constants'


const TriangleSetting = () => {
    const imgSetting = useSelector((store) => store[imageModes.Triangles], shallowEqual)
    const { accuracy, points, grayscale } = imgSetting;
    const dispatch = useDispatch()

    const onAfterChange = (type, value) => {
        dispatch(setSetting({ type, value }));
        dispatch(renderControl(true));
    }

    return (
        <div>
            <UploadImage />
            <div className="setting-item">
                <h4>Accuracy</h4>
                <Slider defaultValue={accuracy} min={0} max={100} onAfterChange={onAfterChange.bind(this, "accuracy")} />
            </div>
            <div className="setting-item">
                <h4>Points</h4>
                <Slider defaultValue={points} min={100} max={9000} onAfterChange={onAfterChange.bind(this, "points")}  />
            </div>
            <div className="setting-item">
                <h4>Grayscale Style</h4>
                <Switch defaultValue={grayscale} onChange={onAfterChange.bind(this, "grayscale")} />
            </div>
        </div>)
}

export default TriangleSetting

