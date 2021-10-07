import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';

const ProductSchema = Yup.object().shape({
    title: Yup.string().required("Title is required!"),
    price: Yup.number().required("Price is required!").positive("Price must be positive"),
    image: Yup.string()
})

export default function ProductForm({ onSubmit, initialValues }) {

    return (
    <div>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={ProductSchema}
        enableReinitialize={true}
      >
        <Form>
          <Field name="title" placeholder="title"></Field>
          <ErrorMessage name="title" component="div"/>
          <Field name="price" placeholder="price"></Field>
          <ErrorMessage name="price" component="div"/>
          <Field name="description" placeholder="description"></Field>
          <Field name="image" placeholder="image"></Field>
          <ErrorMessage name="image" component="div"/>
          <Field name="category" placeholder="category"></Field>
          <button type="submit">Zatwierdź</button>
        </Form>
      </Formik>
    </div>
  );
}
