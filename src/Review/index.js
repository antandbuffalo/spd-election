import { useEffect } from "react";
import IconClose from "../Icons/IconClose";
import "./index.scss";
const Review = ({ onClickClose }) => {
    useEffect(() => {
        const htmlElement = document.querySelector('html');
        htmlElement.style.overflow = "hidden";

        return () => {
            const htmlElement = document.querySelector('html');
            htmlElement.style.overflow = "";
        }
    }, []);
    return <div className="review">
        <div className="btn-close-container">
            <button onClick={onClickClose}>
                <IconClose />
            </button>
        </div>

        <div className="heading">
            இந்த வலைத்தளத்தை மேம்படுத்த, உங்கள் கருத்துக்களை பகிரவும்
        </div>
        <br />
        <br />
        <div className="content">
            <div className="good">
                <div>
                    <input id="good" type="radio" value="good" name="reviewFeeling" />
                </div>

                <label for="good">இந்த வலைத்தளம் மிகவும் உபயோகமாக இருந்தது. இந்த சேவையை தொடரவும்</label>
            </div>
            <br />
            <br />
            <div className="bad">
                <input id="bad" type="radio" value="bad" name="reviewFeeling" />
                <label for="bad">தொடர வேண்டாம்</label>
            </div>
            <br />
            <br />
            <div className="others">
                <label for="text">மேலும் உங்கள் கருத்துக்களை இங்கே பதிவிடவும்</label>
                <textarea rows={8} id="text"></textarea>
            </div>
            <br />
            <br />
            <button className="submit">அனுப்புக</button>
        </div>
        <br />
        <br />
    </div>
}

export default Review;