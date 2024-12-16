import { useState } from "react"
import { googleIcon, LOGO } from "../../lib/media"
import "./Login.css"


export default function Login() {
    const shadowColor = "black"
    const lightColor = "white"
    const [colortext, setColortext] = useState(false)

    return (
        <>
            <div className="LoginContainer">
                <section className="Left">
                    <img className="LoginLogo" src={LOGO} />
                    <h1 style={{ fontSize: 50 }}>Hearth Strap</h1>
                </section>
                <hr style={{ width: "2px", height: "50%", backgroundColor: "black" }} />
                <section className="right">
                    <form className="FormulaireSignin">
                        <input placeholder="Username..." name="Unername" type="text" className="inputZone" />
                        <input placeholder="Password..." name="Password" type="password" className="inputZone" />
                        <input style={{ backgroundColor: colortext ? lightColor : shadowColor, color: colortext ? shadowColor : lightColor }} onMouseEnter={() => {
                            setColortext(!colortext)
                        }} onMouseLeave={() => {
                            setColortext(false)
                        }} name="Submit" value="Connecter-vous" type="submit" className="SubmitButton" />
                        <button className="GoogleSigninbutton">
                            <p>Connectez-vous avec </p>
                            <img className="GoogleLogo" src={googleIcon} />
                        </button>
                    </form>
                </section>
            </div>
        </>
    )
}