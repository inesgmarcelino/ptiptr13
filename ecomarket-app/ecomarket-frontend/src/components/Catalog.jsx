/* eslint-disable no-multi-str */
import { Filtros, Products } from ".";

function Catalog(){

    return(
        <div>
            <div className='row catalog'>
                <div>
                   <Filtros /> {/*  NÃO CARREGA? */}
                </div>
                <div>
                    <Products />
                </div>
            </div>
        </div>
    );

}

export default Catalog;
