import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";
import { Link, Route, useHistory } from "react-router-dom";
import { useConfirm } from "material-ui-confirm";
import ProductAdd from "./ProductAdd";
import ProductDetail from "./ProductDetail";

function ProductList() {
  const [productList, setProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const confirm = useConfirm();
  const history = useHistory()

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "https://fakestoreapi.com/products?limit=10"
      );
      setProductList(response.data);
    }
    fetchData();
  }, []);

  async function addProduct(newProduct) {
    const response = await axios.post(
      "https://fakestoreapi.com/products?limit=10",
      newProduct
    );
    console.log(response);
    setProductList([...productList, response.data]);
  }

  async function deleteProduct(todeleteProduct) {
    confirm({ description: "Are you sure?" })
      .then(async () => {
        const response = await axios.delete(
          `https://reqres.in/api/users/${todeleteProduct}`
        );
        console.log(response.data);
        setProductList(
          productList.filter((product) => product.id !== todeleteProduct.id)
        );
        history.push('/products')
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function editProduct(editedProduct) {
    const response = await axios.patch(
      `https://reqres.in/api/users/${editedProduct.id}`,
      editedProduct
    );
    const updatedProducts = productList.map((product) =>
      product.id === selectedProduct.id
        ? { ...response.data, id: selectedProduct.id }
        : product
    );
    setProductList(updatedProducts);
    history.push('/products');
  }

  return (
    <div>
      <Route path="/products/new">
        <ProductAdd onSubmit={addProduct} />
      </Route>
      <Route path="/products/:id/details">
        <ProductDetail editProduct={editProduct} deleteProduct={deleteProduct}/>
      </Route>

      <h1>Products</h1>
      {productList.map((product) => (
        <div
          style={{ borderBottom: "1px solid #300", marginBottom: "5px" }}
          key={product.id}
        >
          {selectedProduct === product && (
            <div>
              <h3>Edycja</h3>
              <ProductForm
                initialValues={{
                  title: selectedProduct.title,
                  price: selectedProduct.price,
                  description: selectedProduct.description,
                  image: selectedProduct.image,
                  category: selectedProduct.category,
                  submit: selectedProduct.submit,
                }}
                onSubmit={editProduct}
              ></ProductForm>
            </div>
          )}
          <h2>{product.id}</h2>
          <h1>{product.title}</h1>
          <h2>{product.price}$</h2>
          <h1>{product.category}</h1>
          <Link to={`/products/${product.id}/details`}>
            <button>Details</button>
          </Link>
          <button onClick={() => deleteProduct(product)}>Usuń</button>
          <button onClick={() => setSelectedProduct(product)}>Edytuj</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
