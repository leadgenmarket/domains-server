const LocationPin = ({fill}) =>(
    <div style={{position: "relative", height: 0, width: "35px", marginRight:"10px", padding: 0, paddingBottom: "40px" }}>
        {/* <svg style={{position: "absolute", height: "100%", width: "100%", left: 0, top: 0}} xmlns="http://www.w3.org/2000/svg" fill={fill} width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg> */}
        <svg style={{position: "absolute", height: "60%", width: "100%", left: 0, top: 0}} xmlns="http://www.w3.org/2000/svg" fill={fill} width="24" height="24" viewBox="0 0 24 24" ><path d="M12,0C7.8,0,4.5,3.4,4.5,7.6c0,4.2,3,9.2,7.5,16.4c4.5-7.2,7.5-12.2,7.5-16.4C19.5,3.4,16.2,0,12,0z M12,11.6c-2.3,0-4.1-1.8-4.1-4.1S9.7,3.3,12,3.3s4.1,1.8,4.1,4.1S14.3,11.6,12,11.6z"/></svg>
    </div>
)

export default LocationPin

