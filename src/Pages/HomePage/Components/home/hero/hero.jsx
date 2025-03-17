import Cookies from "js-cookie"; // Add js-cookie for cookie management


export const hero = ({username}) => {
    const savedUsername = Cookies.get("username");
    return (
        <div style={{display:'flex', alignItems:'center', paddingTop:28}}>
            <div>
                <h1>Hi, {savedUsername}</h1>
                <h3 style={{color:'var(--secondary-color)'}}>Welcome to Wizzy.dnd </h3>
                <p style={{width: 'calc(90%)', fontWeight:'300'}}> <div style={{textAlign:"justify"}}>We are delighted to introduce Wizzy.dnd, a free and open-source no-code website builder designed for simplicity and efficiency. With an intuitive drag-and-drop interface, users can seamlessly create static web pages without coding. Export clean HTML & CSS effortlessly and build websites with ease. Empowering creativity through simplicity.</div> </p>
            </div>
            <img style={{width: 'calc(40%)'}} src="/Icons/hero-image.png"></img>
        </div>
    )
}
