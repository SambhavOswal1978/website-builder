import { useNavigate } from "react-router";
import '../../../../../fonts.css';
import '../../../../../index.css';
import '../../../../../variable.css';

// import '../../../fonts.css';
// import '../../../index.css';
// import '../../../variable.css';

export const HomeNavbar = () => {
  const navigate = useNavigate();

    return (
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', fontFamily:'Poppins', padding:'16px 0'}}>
            <a href='/' style={{display:'flex', alignItems:'center', textDecoration:'none'}}>
                <img src="logo.svg" height={56} />
            </a>
            <div style={{fontSize:14, fontWeight:'bold', display:'flex', alignItems:'center', gap:20}}>
                <div onClick={() => {navigate('/about-us')}} className='button' style={{color:'rgba(27,43,101,0.65)', cursor:'pointer'}}>
                    About us!
                </div>
                <div className='button loginBtn' style={{backgroundColor: "var(--primary-color)", color:'white', padding:'8px 18px', borderRadius:10}}>
                    Login/Register
                </div>
            </div>
        </div>
    );
}