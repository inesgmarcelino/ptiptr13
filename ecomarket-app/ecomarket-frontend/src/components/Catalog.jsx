const img1 =  require('../images/cereaisGoldenGraham.jpg');
const img2 = require('../images/cereaisChocolateNegro.jpg')
function Album(){
    return(
        <div class="product-container">
            <div class="product-card">
                <div class="product-image">
                    <img src={img1} class="product-thumb" alt="" />
                </div>
            
                <div class="product-info">
                    <h2 class="product-name">brand</h2>
                    <p class="product-short-des">cereais</p>
                    <span class="price">2€</span>
                </div>
            </div>

            <div class="product-card">
                <div class="product-image">
                    <img src={img2} class="product-thumb" alt="" />
                </div>
            
                <div class="product-info">
                    <h2 class="product-name">continente</h2>
                    <p class="product-short-des">cereais</p>
                    <span class="price">1,5€</span>
                </div>
            </div>


        

        </div>
    );

}

export default Album;