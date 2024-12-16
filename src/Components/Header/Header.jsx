import { LOGO, pic } from "../../lib/media"
import "./Header.css"

export default function Header() {

    return (
        <>
            <div className="Header_contianer">
                <section className="Header_left">
                    <img className="Logo" src={LOGO} />
                    <p className="AboutText">HealthStrap</p>
                </section>
                <section className="Header_right">
                    <p className="AboutText">About</p>
                    <img className="ProfilePic" src={pic} />
                </section>
            </div>
        </>
    )
}