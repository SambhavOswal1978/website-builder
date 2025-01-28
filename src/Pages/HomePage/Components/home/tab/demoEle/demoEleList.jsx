import { demoEle } from "./demoEle";

export const demoEleList = () => {
    return (
        <div style={{marginTop:24}}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <h1 style={{fontWeight:'normal', margin:0,}}>Elements</h1>
                <div className='button' style={{height:'fit-content', alignItems:'center', backgroundColor: "var(--primary-color)", color:'white', padding:'8px 18px', borderRadius:10}}>Get Started</div>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'25% 25% 25% 25%', justifyContent:'space-between', gap:24, marginTop:24, marginBottom:24, marginRight:84}}>
                {demoEle("Image", "Add images to your webpage to make it more attractive", "/Icons/home/image-icon.svg")}
                {demoEle("Heading","Heading is used to for main points", "/Icons/home/heading.svg")}
                {demoEle("Text Editor", "Gives you the flexibility to change the text content through rich editor", "/Icons/home/para.svg")}
                {demoEle("Button", "Used for a clickable action", "/Icons/home/button.svg")}
                {demoEle("Video", "Used to display video", "/Icons/home/video.svg")}
                {demoEle("Youtube Video", "Used to display video hosted on youtube", "/Icons/home/youtube.svg")}
                {demoEle("Social Icons", "Add social icons to your website","/Icons/home/social.svg")}
                {demoEle("Google Maps", "Add google maps and show your location to customers on website", "/Icons/home/maps.svg")}
            </div>
        </div>
    );
}