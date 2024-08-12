export default function decorate(block) {

    // block.querySelector(".state-dropdown")
    let stateOptions = ``;
    let cityOptions = ``;
    stateOptions += `
                <div>sdfsdfasds</div>
     `

    block.innerHTML = `
        <div class="dropdowns">
            <div class="state-dropdown dropdown">
                <div class="option active">Maharashtra</div>
                 <div class="state-options options dp-none">
                    ${stateOptions}
                 </div>

            </div>

            <div class="city-dropdown dropdown">
                <div class="option active">Mumbai</div>
                 <div class="city-options options dp-none">
                        ${cityOptions}
                 </div>
            </div>
        </div>
       <div class="map-btn-wrapper">
            <div class="branch-info">
                <p>Find The Nearest Branch From Your Place</p>
                <p>Branch - Borivali east Distance - 1.4km</p>
                <button class="btn-locate">Locate me</button>
             </div>
            <div class="map-container">
            </div>
        </div>`


        console.log("sdsd ",block.querySelector(".state-options"));
        block.querySelector(".state-dropdown").addEventListener("click" , function(ele) {
            console.log(ele.target)
            ele.currentTarget.querySelector(".state-options").classList.toggle("dp-none");
        })
}