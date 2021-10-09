import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router"
import ProductForm from "./ProductForm"

export default function ProductDetail({editProduct, deleteProduct}) { 
const { id } = useParams()
const [ toEditMode, setEditMode ] = useState(false)
const [ product, setProduct ] = useState()
const history = useHistory()

useEffect(() => {
    async function fetchProduct() {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
        setProduct(response.data)
    }
    fetchProduct();
}, [])


 return (
    <div style={{"border" : "1px solid red"}}>
          {toEditMode === true && (
            <div>
              <h3>Edycja</h3>
              <ProductForm
                initialValues={{
                  title: product ? product.title : null,
                  price: product ? product.price : null,
                  description: product ? product.description : null,
                  image: product ? product.image : null,
                  category: product ? product.category : null,
                  submit: product ? product.submit : null,
                }}
                onSubmit={editProduct}
              ></ProductForm>
            </div>
          )}
          <h2>{product ? product.id: null}</h2>
          <h1>{product ? product.title : null}</h1>
          <h2>{product ? product.price : null}$</h2>
          <h1>{product ? product.category : null}</h1>
          <button onClick={() => deleteProduct(product)}>Usuń</button>
          <button onClick={() => setEditMode(true)}>Edytuj</button>
        </div>
 ) 
}
