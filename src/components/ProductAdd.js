import ProductForm from "./ProductForm";
export default function ProductAdd({onSubmit}) {
  return (
    <div>
      <h3>Dodaj produkt</h3>
      <ProductForm
        onSubmit={onSubmit}
        initialValues={{
          title: "",
          price: "",
          description: "",
          image: "",
          category: "",
          submit: "",
        }}
      />
    </div>
  );
}
