const img1 = require('../images/cereaisGoldenGraham.jpg');

function Product(){
 

        return(
            <div className="position-absolute showItems">
            <div className='container'>
            <section className='product-details'>
                <div className='imageP'>
                    <img src={img1} alt='' />
                </div>

                <div className="details">
                    <h2 className="product-brand">Cereais Golden Graham</h2>
                    <span className="product-price">2€</span>
                    <h3 className="product-short-des">Cadeia Logística:</h3>
                    <p > Produto Agrícula, 500kms pelo Transportador; Produtor Industrial, 125kms pelo Transportador; Grossista, 80kms pelo Transportador; Retalhista</p>
                    <h3 className="product-short-des">Recursos Consumidos:</h3>
                    <p>1000 L de Água, 2000 kW de Eletricidade, 162L de Gasóleo</p>
                    <h3 className="product-short-des">Poluição Gerada:</h3>
                    <p>9.4 kg CO2</p>

                    
                    <button className="btn cart-btnP">Adicionar Carrinho</button>
                </div>
            </section>
            </div>
            </div>
        )
}

export default Product;