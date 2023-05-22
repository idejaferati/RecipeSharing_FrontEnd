import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';

const initialValues = {
  id: '',
  name: '',
  description: '',
  ingredients: [''],
  instructions: [''],
  tags: [{ id: '', name: '' }],
  cuisineId: '',
  prepTime: 0,
  cookTime: 0,
  servings: 0,
  yield: 0,
  calories: 0,
  audioInstructions: '',
  videoInstructions: ''
};

const NewRecipeDialog = () => {
  const handleSubmit = async (values) => {
    try {
      await axios.put('https://localhost:7164/api/recipes/' + values.id, values);
      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <div>
          <label htmlFor="id">ID:</label>
          <Field type="text" id="id" name="id" />
          <ErrorMessage name="id" component="div" />
        </div>

        <div>
          <label htmlFor="name">Name:</label>
          <Field type="text" id="name" name="name" />
          <ErrorMessage name="name" component="div" />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <Field as="textarea" id="description" name="description" />
          <ErrorMessage name="description" component="div" />
        </div>

        <div>
          <label htmlFor="ingredients">Ingredients:</label>
          <Field as="textarea" id="ingredients" name="ingredients[0]" />
          <ErrorMessage name="ingredients[0]" component="div" />
        </div>

        <div>
          <label htmlFor="instructions">Instructions:</label>
          <Field as="textarea" id="instructions" name="instructions[0]" />
          <ErrorMessage name="instructions[0]" component="div" />
        </div>

        <div>
          <label htmlFor="tags.id">Tag ID:</label>
          <Field type="text" id="tags.id" name="tags[0].id" />
          <ErrorMessage name="tags[0].id" component="div" />
        </div>

        <div>
          <label htmlFor="tags.name">Tag Name:</label>
          <Field type="text" id="tags.name" name="tags[0].name" />
          <ErrorMessage name="tags[0].name" component="div" />
        </div>

        <div>
          <label htmlFor="cuisineId">Cuisine ID:</label>
          <Field type="text" id="cuisineId" name="cuisineId" />
          <ErrorMessage name="cuisineId" component="div" />
        </div>

        <div>
          <label htmlFor="prepTime">Prep Time:</label>
          <Field type="number" id="prepTime" name="prepTime" />
          <ErrorMessage name="prepTime" component="div" />
        </div>

        <div>
          <label htmlFor="cookTime">Cook Time:</label>
          <Field type="number" id="cookTime" name="cookTime" />
          <ErrorMessage name="cookTime" component="div" />
        </div>

        <div>
          <label htmlFor="servings">Servings:</label>
          <Field type="number" id="servings"/>
        </div>

        <div>
          <label htmlFor="yield">Yield:</label>
          <Field type="number" id="yield" name="yield" />
          <ErrorMessage name="yield" component="div" />
        </div>

        <div>
          <label htmlFor="calories">Calories:</label>
          <Field type="number" id="calories" name="calories" />
          <ErrorMessage name="calories" component="div" />
        </div>

        <div>
          <label htmlFor="audioIntructions">Audio instructions:</label>
          <Field type="text" id="audioIntructions" name="audioIntructions"/>
        </div>

        <div>
          <label htmlFor="videoIntructions">Video instructions:</label>
          <Field type="text" id="videoIntructions" name="videoIntructions"/>
        </div>
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default NewRecipeDialog;
