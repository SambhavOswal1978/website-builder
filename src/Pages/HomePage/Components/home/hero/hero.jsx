import Cookies from "js-cookie"; // Add js-cookie for cookie management
export const hero = ({username}) => {
    const savedUsername = Cookies.get("username");
    return (
        <div style={{display:'flex', alignItems:'center', paddingTop:28}}>
            <div>
                <h1>Hi, {username}</h1>
                <h3 style={{color:'var(--secondary-color)'}}>Welcome to no code website builder</h3>
                <p style={{width: 'calc(60%)', fontWeight:'300'}}>Lebih dari 500+ contoh komponen yang dirancang secara profesional, sepenuhnya responsif, dan dibuat dengan ahli yang dapat Anda masukkan ke dalam proyek Tailwind, Bootstrap, dan React sesuaikan dengan keinginan Anda.</p>
            </div>
            <img style={{width: 'calc(40%)'}} src="/Icons/hero-image.png"></img>
        </div>
    )
}
